import React from 'react'
import { Menu, MenuItem } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <>
            <Sidebar className='text-center   mt-3'>
                <Menu>
                    <MenuItem >  <i class="fa-solid fa-house"></i> Home </MenuItem>
                    <br />
                    <Link to={"/Pageproduct"}> <MenuItem > Product </MenuItem> </Link>
                    <br />
                    <Link to={"/sales"}> <MenuItem > Sales </MenuItem></Link>
                    <br />
                    <Link to={"/salestable"}> <MenuItem > <i class="fa-solid fa-table"></i> SalesTable </MenuItem></Link>
                </Menu>
            </Sidebar>

        </>
    )
}

export default Sidebar