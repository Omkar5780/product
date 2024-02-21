import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, } from 'react-pro-sidebar';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';



function Home() {

    let navigat = useNavigate();

    const [dashboard, setDashboard] = useState([])
    const [sales, setSales] = useState([])
    const [overtotal, setOvertotal] = useState([])
    let subtotal = 0



    useEffect(() => {
        let data = localStorage.getItem("name")

        if (!data) {
            navigat("/")
        }
    })

    function DashboardData() {

        axios.get("https://65969e846bb4ec36ca0303a0.mockapi.io/Products")
            .then((res) => {
                // setDashboard(res.data.length)
                setDashboard(res.data.length);

            })



    }

    function SaleDashboard() {
        axios.get("https://65969e846bb4ec36ca0303a0.mockapi.io/Sales")
            .then((res) => {
                setSales(res.data.length)
            })
    }

    function overallTotal() {
        axios.get("https://65969e846bb4ec36ca0303a0.mockapi.io/Sales")
            .then((res) => {
                setOvertotal(res.data)
            })
    }



    useEffect(() => {
        DashboardData();
        SaleDashboard();
        overallTotal();


    }, [])


    return (
        <>
            <Navbar />
            <div className="container-fluid">

                <div className="row">

                    <div className="col-lg-3">

                        <Sidebar className='text-center   mt-3'>
                            <Menu>
                                <MenuItem >  <i class="fa-solid fa-house"></i> Home </MenuItem>
                                <br />
                                <Link to={"/Pageproduct"}> <MenuItem > Product </MenuItem> </Link>
                                <br /              >
                                <Link to={"/sales"}> <MenuItem > Sales </MenuItem></Link>
                                <br />
                                <Link to={"/salestable"}> <MenuItem > <i class="fa-solid fa-table"></i> SalesTable </MenuItem></Link>
                            </Menu>
                        </Sidebar>

                    </div>

                    

                    <div className="col-lg-8">
                        <br />
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active"><a>Home</a></li>
                            </ol>
                        </nav>

                        <div className="row">
                            <div className="col-sm-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Products ! Today</h5>
                                        <div  >
                                            <h1 className='d-flex justify-content-around' >

                                                <i class="fa-solid fa-cart-shopping "></i>
                                                <h3>{dashboard}</h3>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Sales ! Today</h5>
                                        <div  >
                                            <h1 className='d-flex justify-content-around' >

                                                <i class="fa-solid fa-cart-shopping "></i>
                                                <h3>{sales}</h3>
                                            </h1>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Total Price ! Today</h5>
                                        <h3>{subtotal}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-2">

                    </div>
                </div>
            </div>
        </>
    )
}
export default Home