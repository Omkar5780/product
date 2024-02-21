import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {


    let navigate = useNavigate();


    function handlelogout(e){

      e.preventDefault();

        localStorage.clear()
        navigate("/")
        window.location.reload(true)

    }
  return (
   
    <>
    

    <nav className="navbar navbar-expand-lg  bg-dark ">
                <div className="container-fluid">
                    {/* <h1 className='ms-5 text-white'>Sales Product</h1> */}
                    <h3 style={{"margin-left":"680px"}} className='text-white '> Hello {localStorage.getItem("name")}</h3>
                    <button className='btn  btn-danger me-5 'onClick={(e)=> handlelogout(e)} >Logout</button>


                </div>
            </nav>
    
    
    </>
  )
}

export default Navbar