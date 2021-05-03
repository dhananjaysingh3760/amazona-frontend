import React, { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {useDispatch, useSelector} from 'react-redux';
import {savePaymentMethod} from '../actions/cartActions';

function PaymentScreen(props) {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!shippingAddress.address){
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const dispatch = useDispatch()
    const submitHandler  = (e) =>{
        e.preventDefault()
        //TODO payment action
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>  
            <form className="form" onSubmit={submitHandler} >
                <div>
                    <h1>Payment Methods</h1>
                    <div className="row">
                        <input type="radio" id="paypal" value="paypal" name="paymentMethod" required checked onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                    <div className="row">
                        <input type="radio" id="stripe" value="stripe" name="paymentMethod" required onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="stripe" >stripe</label>
                    </div>
                    <div>
                        <label />
                        <button className="primary" type="submit">continue</button>
                    </div> 
                </div>
            </form>
        </div>
    )
}

export default PaymentScreen
