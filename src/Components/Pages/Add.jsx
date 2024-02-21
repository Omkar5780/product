
import axios from 'axios';

import React, { useEffect, useState } from 'react'

function Add() {

    const [product, setProduct] = useState([]);
    const [total, setTotal] = useState(0);
    const [rows, setRows] = useState([{ quantity: 1 }]);

    const loaddata = () => {
        axios.get('https://6593d53b1493b01160693b10.mockapi.io/products')
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleProductChange = (name, index) => {
        const dropdownName = product.find((element) => element.name === name);
        let copyRows = [...rows];
        copyRows[index].selectedProduct = dropdownName;
        setRows(copyRows);
    };

    const quantitychange = (value, index) => {
        let copyRows = [...rows];
        copyRows[index].quantity = value;
        setRows(copyRows);
    };

    const addRow = () => {
        let copyrow = [...rows]
        copyrow.push({ quantity: 1 })
        setRows(copyrow)
    }
    console.log(rows);
    useEffect(() => {
        loaddata()
    }, [])




    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Sales Form</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3">
                            <label className="form-label">Date</label>
                            <input type="date" className="form-control" />
                        </div>
                        <div className="col-lg-6">
                            <label className="form-label">Customer</label>
                            <br />
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-lg-3">
                            <label className="form-label">Sale As</label>
                            <br />
                            <input type="text" className='form-control' />
                        </div>
                        <div className="col-lg-12 mt-2">
                            <button className="btn btn-sm btn-primary" onClick={addRow}>Add Row</button>
                        </div>
                        <div className="col-lg-12 mt-2">
                            <div className="table-responsive">

                                <table className="table table-bordered" id="dataTable" width="100%" >
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Sale Rate</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            onChange={(e) => handleProductChange(e.target.value, index)}
                                                        >
                                                            <option value="">Select</option>
                                                            {product.map((data, idx) => (
                                                                <option key={idx} value={data.name}>
                                                                    {data.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input type="number" min="1"
                                                            className="form-control"
                                                            name='quantity'
                                                            value={row.quantity}
                                                            onChange={(e) => quantitychange(e.target.value, index)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            min="0"
                                                            name='price'
                                                            readOnly
                                                            className="form-control"
                                                            value={row.selectedProduct ? row.selectedProduct.price : ''}
                                                        />
                                                    </td>
                                                    <td>{row.selectedProduct ? row.selectedProduct.price * row.quantity : ''}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="col-lg-12">
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            style={{ width: '100px', float: 'right' }}
                            value={total}
                        />
                    </div>
                    <div className="col-lg-12 mt-2">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add