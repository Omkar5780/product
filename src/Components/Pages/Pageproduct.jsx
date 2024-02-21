import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Pageproduct() {

    const [data, setData] = useState({
        product: "",
        price: "",
        gst: "",
        // gst_percentage: "",

    })

    const [newdata, setNewdata] = useState([]);
    const [id, setId] = useState(undefined);


    function Handlechange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }





    function sucessNotify() {
        toast.success('Successfully', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    };

    function errorNotify() {
        toast.error('Deleted', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    function updateNotify() {
        toast.warn('Updated', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }


    function Handlesubmit(e) {
        e.preventDefault();
        // sucessNotify();
        loadData()

        console.log(data);

        if (data.product === "" && data.price === "" && data.gst === "") {
            alert("All Fields are  Mandatory")
        } else {
            if (id === undefined) {
                axios.post("https://65969e846bb4ec36ca0303a0.mockapi.io/Products", data)
                    .then((res) => {
                        console.log(res.data);
                        loadData();
                        sucessNotify()
                    })
                setData({
                    product: "",
                    price: "",
                    gst: "",
                    // gst_percentage: "",
                })
            } else {
                axios.put("https://65969e846bb4ec36ca0303a0.mockapi.io/Products/" + id, data)
                    .then((res) => {
                        console.log(res.data);
                        loadData();
                        setId(undefined)
                    })

                updateNotify();
                setData({
                    product: "",
                    price: "",
                    gst: "",
                    // gst_percentage: "",
                })
            }


        }

    }

    function loadData() {

        axios.get("https://65969e846bb4ec36ca0303a0.mockapi.io/Products")
            .then((res) => {
                console.log(res.data);
                setNewdata(res.data)
            })
    }

    useEffect(() => {
        loadData()
    }, [])

    function HandleDelete(e, id) {
        e.preventDefault();
        // alert(id)
        errorNotify();

        axios.delete("https://65969e846bb4ec36ca0303a0.mockapi.io/Products/" + id)
            .then((res) => {
                console.log(res.data);
                loadData();
            })
    }

    function Handleupdate(e, id) {
        e.preventDefault();
        setId(id)
        // alert(id)
        axios.get("https://65969e846bb4ec36ca0303a0.mockapi.io/Products/" + id)
            .then((res) => {
                console.log(res);
                setData({
                    product: res.data.product,
                    price: res.data.price,
                    gst: res.data.gst,
                    // gst_percentage: res.data.gst_percentage
                })
                loadData();
            })
    }
    return (

        <>

            <ToastContainer />

            <Navbar />



            <div className="container-fluid">

                <div className="row">

                    <div className="col-lg-3">

                        <Sidebar className='text-center   mt-3'>
                            <Menu>
                                <Link to={"/Home"}>  <MenuItem > Home </MenuItem></Link>
                                <br />
                                <MenuItem > Product </MenuItem>
                                <br />
                                <Link to={"/Sales"}><MenuItem > Sales </MenuItem></Link>
                                <br />
                                <Link to={"/salestable"}> <MenuItem > SalesTable </MenuItem></Link>
                            </Menu>
                        </Sidebar>

                    </div>
                    <div className="col-lg-8">
                        <br />
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active"><a>Home</a></li>
                                <li className="breadcrumb-item active"><a>Product</a></li>
                            </ol>
                        </nav>

                        <div className='d-flex justify-content-between'>
                            <h1>Products</h1>


                            {/* <!-- Button trigger modal --> */}


                            <button type="button" className="btn btn-primary m-2 me-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add
                            </button>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title text-center " id="exampleModalLabel">Add The Data</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">

                                            <input name='product' id='input1' value={data.product} onChange={Handlechange} className='form-control' type="text" placeholder='Product' />
                                            <br />
                                            <br />
                                            <input name='price' id='input2' value={data.price} onChange={Handlechange} className='form-control' type="text" placeholder='Price' />
                                            <br />
                                            <br />
                                            {/* <input name='gst_percentage' value={data.gst_percentage} onChange={Handlechange} className='form-control' type="text" placeholder='Gst %' /> */}
                                            <select id='input3' name='gst' value={data.gst} onChange={Handlechange} class="form-select" aria-label="Default select example">
                                                <option selected>Gst</option>
                                                <option value={12} >12%</option>
                                                <option value={18} >18%</option>
                                                {/* <option value="3">Three</option> */}
                                            </select>



                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => Handlesubmit(e)}>Submit</button>


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>





                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Gst %</th>
                                    <th scope="col">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {

                                    newdata.map((eachdata, i) => {
                                        return (
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{eachdata.product}</td>
                                                <td>{eachdata.price}</td>
                                                <td>{eachdata.gst}</td>
                                                <td>
                                                    <button onClick={((e) => Handleupdate(e, eachdata.id))} className='btn btn-primary me-2 ' data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                                    <button onClick={((e) => HandleDelete(e, eachdata.id))} className='btn btn-danger'>Delete</button>



                                                </td>
                                            </tr>

                                        )
                                    })
                                }


                            </tbody>
                        </table>



                    </div>
                    <div className="col-lg-2">

                    </div>






                </div>
            </div>








        </>
    )
}

export default Pageproduct