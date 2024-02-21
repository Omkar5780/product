import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Sidebar, Menu, MenuItem, } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import axios, { all } from 'axios';



function Sales() {

  let navigat = useNavigate();


  const [newdata, setNewdata] = useState([]);

  const [total, setTotal] = useState(0)

  const [rows, setRows] = useState([{ quantity: 1 }]);

  const [date, setDate] = useState("")

  const [personaldata, setPersonaldata] = useState({
    date: "",
    customer: "",
    mobileno: "",

    // Products:[{}]

  })
  var alltotal = 0
  var salerateTotal = 0
  var TotalGST = 0




  const Handleadd = () => {
    let copyrow = [...rows]
    copyrow.push({ quantity: 1 })
    setRows(copyrow)

  }
  // console.log(rows);


  function Handlechane(id, i) {
    const dropdownname = newdata.find((element) => element.id === id);
    let copyRows = [...rows];
    copyRows[i].selectedProduct = dropdownname;
    setRows(copyRows);

    // calculateTotal(dropdownname.price, quantity)
    // setData(dropdownname.price * quantity)
  }
  // console.log(data);

  const quantitychange = ((value, i) => {
    let copyRows = [...rows];
    copyRows[i].quantity = value;
    setRows(copyRows);
    // setQuantity(value)
    // calculateTotal(value, data)
  })

  // const calculateTotal = (value, i) => {

  //   const totalPrice = value * data
  //   setTotal(totalPrice)
  // }

  // useEffect(()=>{
  //   let alltotal = 0 ;
  //   for (let i = 0; i < rows.length; i++) {
  //     const row = rows[i];
  //     if (row.selectedProduct) {
  //       alltotal += row.selectedProduct.price*row.quantity
  //     }
  //     setTotal (alltotal)
  //   }
  // },[rows])

  function HandleData(e) {
    e.preventDefault()
    setPersonaldata({ ...personaldata, [e.target.id]: e.target.value })







    // console.log();

    // console.log(e.target.value);

    //  console.log(personaldata);

  }

  function HandlePersonalData(e) {



    const postdata = {
      row: rows,
      personaldata: personaldata,
      saleratetotal: salerateTotal,
      alltotal: alltotal,
      totalgst: TotalGST,
      


    }
    if (personaldata.date === "" && personaldata.customer === "" && personaldata.mobileno === "") {
      alert("All Fields are  Mandatory")
    } else {
      axios.post("https://65969e846bb4ec36ca0303a0.mockapi.io/Sales", postdata)
        .then((res) => {
          console.log(res);
          setPersonaldata(res.data)

          navigat("/salestable")

        })
    }



    // console.log(postdata);
    // console.log(personaldata);
    // console.log(rows);
  }








  function loadData() {

    axios.get("https://65969e846bb4ec36ca0303a0.mockapi.io/Products")
      .then((res) => {
        // console.log(res.data);
        setNewdata(res.data)

      })


  }

  useEffect(() => {
    loadData();
  }, [])





  return (

    <>
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
          <div className="col-lg-8">
            <br />

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active"><a>Home</a></li>
                <li className="breadcrumb-item active"><a>Product</a></li>
                <li className="breadcrumb-item active"><a>Sales</a></li>
              </ol>
            </nav>
            <h1>Sales...</h1>

            <div className="card" >


              <div className="card-body">

                <div className="row">
                  <div className="col-lg-3">
                    <h5 style={{ marginLeft: "50px" }}>-----Date----</h5>
                    <input onChange={(e) => HandleData(e)} id='date' value={personaldata.date} className='form-control' type="date" />
                    {/* <input onChange={(e) => HandleData(e.target.value)} id='date' className='form-control' type="date" /> */}
                  </div>
                  <div className="col-lg-6">
                    <h5 style={{ marginLeft: "150px" }}>-----Customer----</h5>

                    <input onChange={(e) => HandleData(e)} id='customer' value={personaldata.customer} className='form-control' type="text " />
                  </div>
                  <div className="col-lg-3">
                    <h5 style={{ marginLeft: "30px" }}>----Mobile No----</h5>

                    <input onChange={(e) => HandleData(e)} id='mobileno' value={personaldata.mobileno} className='form-control' type="Number" />
                  </div>
                </div>
                <br />
                <button className='btn btn-outline-success' onClick={(() => Handleadd())}>Add Row</button>

                <br />
                <br />

                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Product</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Sale Rate</th>
                      <th scope="col">Gst</th>
                      <th scope="col"> GST Total</th>

                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((eachdata, i) => {
                      if (eachdata.selectedProduct) {
                        alltotal += eachdata.selectedProduct.price * eachdata.selectedProduct.gst / 100 * eachdata.quantity + eachdata.selectedProduct.price * eachdata.quantity;
                        salerateTotal += eachdata.selectedProduct.price * eachdata.quantity
                        TotalGST += eachdata.selectedProduct.price * eachdata.selectedProduct.gst / 100 * eachdata.quantity
                      }
                      return (
                        <tr key={i} >
                          <th scope="row">{i + 1}</th>

                          <td><select onChange={((e) => Handlechane(e.target.value, i))} className='form-select'>
                            <option>---Products---</option>
                            {
                              newdata.map((eachdata, i) => {

                                return (
                                  <option key={i} value={eachdata.id}>  {eachdata.product} </option>
                                )
                              })

                            }
                          </select></td>
                          <td><input className='form-control' type="number" placeholder='Quantity ' name='quantity' value={eachdata.quantity} onChange={((e) => quantitychange(e.target.value, i))} /></td>
                          <td><input className='form-control' id='rate' type="text" placeholder='Price' name='price' value={eachdata.selectedProduct ? eachdata.selectedProduct.price : ''} readOnly /></td>
                          <td><input type="text" className='form-control' value={eachdata.selectedProduct ? eachdata.selectedProduct.gst : ''} /></td>
                          <td><input className='form-control' type="text" placeholder='Total' value={eachdata.selectedProduct ? eachdata.selectedProduct.price * eachdata.selectedProduct.gst / 100 * eachdata.quantity + eachdata.selectedProduct.price * eachdata.quantity : ''} /></td>

                        </tr>
                      )
                    })}
                  </tbody>
                </table>


              
                <div className=''>
                  
                  <span > <b>Total Sale Rate Price::--</b>
                    {salerateTotal}


                  </span>
                  <br />

                  <span  > <b>Overall GST Price::--</b>
                    {TotalGST}
                  </span>
                  <br />



                  <span  > <b>Total Price With GST::--</b>
                    {alltotal}
                  </span>
                  <br />


                </div>
                <br />

                <div className='d-flex justify-content-between'>
                  <button className='btn btn-outline-success ' onClick={((e) => HandlePersonalData(e))}>Submit</button>




                </div>



              </div>

            </div>
            <br />
          </div>
          <div className="col-lg-1">
          </div>
        </div>
      </div>


    </>
  )
}

export default Sales