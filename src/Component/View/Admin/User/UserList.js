import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const UserList = ({}) => {
    return (
        <>
        <div className="body"> 
        <div id="reportsPage">
            <div id="home">
                <div className="container">
                <div className="row tm-content-row">
                    <div className="col-12 tm-block-col">
                    <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                        <h2 className="tm-block-title">Account List</h2>
                        <NavLink className="btn btn-primary " to="/admin/user/create" style={{display : 'flex' , width: '150px'}}>New User</NavLink>
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">User NO.</th>
                            <th scope="col">UserName</th>
                            <th scope="col">FullName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Bith Day </th>
                            <th scope="col">Address </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row"><b>#122349</b></th>
                            <td><b>trangtran</b></td>
                            <td><b>Tran Thu Trang</b></td>
                            <td><b>trang12@gmail.com</b></td>
                            <td>023832812</td>
                            <td>16:00, 12 NOV 2018</td>
                            <td>33 Cong hoa , Tan Binh Distric , Ho Chi Minh City</td>
                            </tr>
                            <tr>
                            <th scope="row"><b>#122349</b></th>
                            <td><b>trangtran</b></td>
                            <td><b>Tran Thu Trang</b></td>
                            <td><b>trang12@gmail.com</b></td>
                            <td>023832812</td>
                            <td>16:00, 12 NOV 2018</td>
                            <td>33 Cong hoa , Tan Binh Distric , Ho Chi Minh City</td>
                            </tr>
                            <tr>
                            <th scope="row"><b>#122349</b></th>
                            <td><b>trangtran</b></td>
                            <td><b>Tran Thu Trang</b></td>
                            <td><b>trang12@gmail.com</b></td>
                            <td>023832812</td>
                            <td>16:00, 12 NOV 2018</td>
                            <td>33 Cong hoa , Tan Binh Distric , Ho Chi Minh City</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
        </>
    );
};

export default UserList;