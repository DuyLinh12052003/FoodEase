import React from 'react';

const OrderList = () => {
    return (
      <div className="body" >
        <div id="reportsPage">
      <div id="home">
        <div className="container">
          <div className="row tm-content-row">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
              <div className="tm-bg-primary-dark tm-block tm-block-taller">
                <h2 className="tm-block-title">Storage Information</h2>
                <div id="pieChartContainer">
                  <canvas id="pieChart" width="200" height="200"></canvas>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
              <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-overflow">
                <h2 className="tm-block-title">Notification List</h2>
                <div className="tm-notification-items">
                </div>
              </div>
            </div>

            <div className="col-12 tm-block-col">
              <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                <h2 className="tm-block-title">Orders List</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ORDER NO.</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">OPERATORS</th>
                      <th scope="col">LOCATION</th>
                      <th scope="col">DISTANCE</th>
                      <th scope="col">START DATE</th>
                      <th scope="col">EST DELIVERY DUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"><b>#122349</b></th>
                      <td><div className="tm-status-circle moving"></div> Moving</td>
                      <td><b>Oliver Trag</b></td>
                      <td><b>London, UK</b></td>
                      <td><b>485 km</b></td>
                      <td>16:00, 12 NOV 2018</td>
                      <td>08:00, 18 NOV 2018</td>
                    </tr>
                    <tr>
                      <th scope="row"><b>#122349</b></th>
                      <td><div className="tm-status-circle moving"></div> Moving</td>
                      <td><b>Oliver Trag</b></td>
                      <td><b>London, UK</b></td>
                      <td><b>485 km</b></td>
                      <td>16:00, 12 NOV 2018</td>
                      <td>08:00, 18 NOV 2018</td>
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
    );
};

export default OrderList;