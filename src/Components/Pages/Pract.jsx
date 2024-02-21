import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Pract() {

  const [data, setData] = useState()
  const [newdata, setNewdata] = useState([]);
  const [quantity, setquantity]= useState(1)
  const [total , settotal] = useState(0)



  function loadData() {
    axios.get("https://65969e846bb4ec36ca0303a0.mockapi.io/Products")
      .then((res) => {
        console.log(res.data);
        setNewdata(res.data)
      })
  }

  function Handlechane(id) {
    const dropdownname = newdata.find((element)=>element.id===id);
    setData(dropdownname.price * quantity)
  }
    console.log(data);

    const quantitychange =(value)=>{
      setquantity(value)
      calculateTotal(value , data)

    }

    const calculateTotal =(valu , da)=>{
      const totalPrice = valu * da
      settotal (totalPrice)
    }


  useEffect(() => {
    loadData();
  }, [])

 
  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
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
                    <input className='form-control' type="date" />
                  </div>
                  <div className="col-lg-6">
                    <h5 style={{ marginLeft: "150px" }}>-----Customer----</h5>

                    <input className='form-control' type="text " />
                  </div>
                  <div className="col-lg-3">
                    <h5 style={{ marginLeft: "30px" }}>----Mobile No----</h5>

                    <input className='form-control' type="Number" />
                  </div>
                </div>
                <br />
                {/* <button className='btn btn-outline-success' onClick={(()=>Handleadd())}>Add Row</button> */}
               
                <br />
                <br />

                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Product</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Sale Rate</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th scope="row">1</th>

                      <td><select onChange={((e)=>Handlechane(e.target.value))} className='form-control'>
                        <option>---Select---</option>
                        {
                          newdata.map((eachdata, i) => {
                            return (
                              <option key={i} value={eachdata.id}>  {eachdata.product} </option>
                            )
                          })
                        }
                      </select></td>
                      <td><input className='form-control' type="number" placeholder='Quantity' value={quantity} onChange={(e)=>quantitychange(e.target.value)} /></td>
                      <td><input className='form-control'  placeholder='Price' value={data ? data :''} readOnly /></td>
                      <td><input className='form-control' type="text" placeholder='Total' value={total} /></td>

                    </tr>
                    <tr>
                      <td ></td>
                      <td ></td>
                      <td ></td>
                      <td ></td>
                      <td ><input type="text"  className='form-control'/></td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <button className='btn btn-outline-success '>Submit</button>
              </div>
            </div>
            <br />
          </div>
          <div className="col-lg-1">
          </div>
        </div>
      </div>
  )
}

export default Pract