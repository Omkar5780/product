import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

function Home() {
    const navigat = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar open/close

    const [dashboard, setDashboard] = useState(0);
    const [sales, setSales] = useState(0);
    const [overtotal, setOvertotal] = useState([]);
    const [gtotal, setGtotal] = useState(0);

    useEffect(() => {
        const data = localStorage.getItem('name');
        if (!data) {
            navigat('/');
        }
    }, [navigat]);

    useEffect(() => {
        let alltotal = 0;
        overtotal.forEach((element) => {
            alltotal += element.alltotal;
        });
        setGtotal(alltotal);
    }, [overtotal]);

    useEffect(() => {
        DashboardData();
        SaleDashboard();
        overallTotal();
    }, []);

    function DashboardData() {
        axios.get('https://65969e846bb4ec36ca0303a0.mockapi.io/Products')
            .then((res) => {
                setDashboard(res.data.length);
            });
    }

    function SaleDashboard() {
        axios.get('https://65969e846bb4ec36ca0303a0.mockapi.io/Sales')
            .then((res) => {
                setSales(res.data.length);
            });
    }

    function overallTotal() {
        axios.get('https://65969e846bb4ec36ca0303a0.mockapi.io/Sales')
            .then((res) => {
                setOvertotal(res.data);
            });
    }

    // Toggle sidebar function
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-lg-3 ${isSidebarOpen ? '' : 'd-none d-lg-block'}`}> {/* Conditionally apply class based on sidebar state */}
                        <Sidebar className="text-center mt-3">
                            <Menu>
                                <MenuItem> <i className="fa-solid fa-house"></i> Home </MenuItem>
                                <br />
                                <Link to="/Pageproduct"> <MenuItem> Product </MenuItem> </Link>
                                <br />
                                <Link to="/sales"> <MenuItem> Sales </MenuItem></Link>
                                <br />
                                <Link to="/salestable"> <MenuItem> <i className="fa-solid fa-table"></i> SalesTable </MenuItem></Link>
                            </Menu>
                        </Sidebar>
                    </div>
                    <div className="col-lg-9">
                        <button className="btn btn-primary d-lg-none" onClick={toggleSidebar}>
                            {/* Toggle button for mobile view with icon */}
                            <i className={`fa-solid ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i> 
                        </button>
                        <br />
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active"><a>Home</a></li>
                            </ol>
                        </nav>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Products Today</h5>
                                        <div>
                                            <h1 className="d-flex justify-content-around">
                                                <i className="fa-solid fa-cart-shopping"></i>
                                                <h3>{dashboard}</h3>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Sales Today</h5>
                                        <div>
                                            <h1 className="d-flex justify-content-around">
                                                <i className="fa-solid fa-cart-shopping"></i>
                                                <h3>{sales}</h3>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Total Price Today</h5>
                                        <h3>{gtotal} -/</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
