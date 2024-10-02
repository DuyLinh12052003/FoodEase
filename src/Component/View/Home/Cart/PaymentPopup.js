import React from 'react';
import './Payment.css';

const PaymentPopup = ({isOpenPayment,handlePaymentPopup,totalPrice,hanldePayment}) => {
    console.log(totalPrice);
    return (
        <>
        {
            isOpenPayment && (
                <div className="overlay">
                    <div className="popup">
                            <div className="container-fluid"  >
                                <div className="row justify-content-center">
                                    <div className="col-12 col-lg-11">
                                        <div className="card card0 rounded-0">
                                            <div className="row">
                                                <div className="col-md-2 d-md-block d-none p-0 box">
                                                </div>
                                                <div className="col-md-8 col-sm-12 p-0 box">
                                                <h1 style={{fontWeight : 'bolder'}}>CHECK OUT </h1>
                                                    <div className="card rounded-0 border-0 card2" id="paypage">
                                                        <div className="form-card">
                                                            <label className="pay">Your Name</label>
                                                            <input type="text" name="holdername" value="yourName" />
                                                            <div className="row">
                                                                <div className="col-8 col-md-6">
                                                                    <label className="pay">Email </label>
                                                                    <input type="text" name="cardno" value="test@gmail.com" />
                                                                </div>
                                                                <div className="col-4 col-md-6">
                                                                    <label className="pay">TotalPrice (VNĐ)</label>
                                                                    <input  className="placeicon" value={totalPrice.toLocaleString('vi-VN')}  readOnly/>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <label className="pay" >Address</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <input type="text" value="Your Address"/>
                                                                </div>
                                                            </div>
                                                            <label  className="pay">Payment Method</label>
                                                            <div className="radio-group">
                                                                <div className='radio' onClick={() => hanldePayment(totalPrice,"vnpay")}><img src="/assets/images/vnpay.png" width="200px" height="70px"/></div>
                                                                <div className='radio' onClick={() => hanldePayment(totalPrice,"paypal")}><img src="https://i.imgur.com/5QFsx7K.jpg" width="200px" height="70px"/></div>
                                                                <br/>
                                                                <div className='radio' onClick={() => hanldePayment(totalPrice,"stripe")}><img src="/assets/images/stripe.png" width="200px" height="70px"/></div>
                                                                <div className='radio' onClick={() => hanldePayment(totalPrice,"momo")}><img src="/assets/images/momo.png" width="200px" height="70px"/></div>
                                                                <br/>
                                                            </div> 
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <button className="btn btn-primary" onClick={handlePaymentPopup}>Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md- d-md-block d-none p-0 box">
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                </div>
                </div>
		</div>   
            )
        }
       
        </>
    );
};

export default PaymentPopup;