
// import { Navbar } from 'flowbite-react';
import axios from 'axios';
import Navbar from './Navbar'
import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Salestable() {


    const [getdata, setGetdata] = useState([])
    let total = 0
    let navigate = useNavigate()

    // console.log(total);
    // const [subTotal, setSubTotal] = useState("");    

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

    function Tabledata() {

        axios.get("https://65969e846bb4ec36ca0303a0.mockapi.io/Sales")
            .then((res) => {
                setGetdata(res.data)
            })
            
    }
    function HandleDelete(e, id) {
        e.preventDefault()
        axios.delete("https://65969e846bb4ec36ca0303a0.mockapi.io/Sales/" + id)
            .then((res) => {
                console.log(res.data);
                Tabledata()
                errorNotify();
            })
    }

    function HandlePrint(id) {
        alert(id)

        navigate("/Print")

    }

    useEffect(() => {
        Tabledata();
    }, [])
    return (
        <>
            <ToastContainer />

            <Navbar />


            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <Sidebar className='text-center   mt-3'>
                            <Menu>
                                <Link to={"/Home"}><MenuItem > Home </MenuItem></Link>
                                <br />
                                <Link to={"/Pageproduct"}> <MenuItem > Product </MenuItem> </Link>
                                <br />
                                <Link to={"/sales"}> <MenuItem > Sales </MenuItem></Link>
                                <br />
                                <Link to={"/salestable"}> <MenuItem > SalesTable </MenuItem></Link>
                            </Menu>
                        </Sidebar>
                    </div>
                    <div className="col-lg-8 mt-5">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active"><a>Home</a></li>
                                <li className="breadcrumb-item active"><a>Product</a></li>
                                <li className="breadcrumb-item active"><a>Sales</a></li>
                                <li className="breadcrumb-item active"><a>Sales Table</a></li>
                            </ol>
                        </nav>
                        <h1>SalesTable...</h1>


                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Mobile No</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Total GST</th>
                                    <th scope="col">Overall Subtotal</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getdata.map((eachdata, i) => {

                                        if (eachdata) {
                                            total += eachdata.alltotal
                                            // console.log(total);
                                            // setSubTotal(total)
                                        }
                                        return (
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{eachdata.personaldata.date}</td>
                                                <td>{eachdata.personaldata.customer}</td>
                                                <td>{eachdata.personaldata.mobileno}</td>
                                                <td>{eachdata.saleratetotal}</td>
                                                <td>{eachdata.totalgst}</td>

                                                <td>{eachdata.alltotal}</td>
                                                <td>
                                                    <button className='btn btn-danger  mt-1 ' onClick={((e) => HandleDelete(e, eachdata.id))}> Remove</button>
                                                    <button className='btn btn-danger  mt-1 ms-2 ' onClick={(() => HandlePrint( eachdata.id)) }> Print</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                        <b> Total Overall Subtotal::-</b>
                        <span>{total}</span>


                    </div>
                    <div className="col-lg-2">

                    </div>
                </div>
            </div>





        </>

    )
}

export default Salestable