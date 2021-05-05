import React, { useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function PlaceorderScreen(props) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems,paymentMethod,shippingAddress} = cart;
    if(!paymentMethod){
        props.history.push('/payment');
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading,success,error,order} = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cartItems.reduce((a,c) => a + c.qty * c.price,0));
    cart.shippingPrice = (cart.itemsPrice > 100) ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 *cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const placeOrderHandler = (e) =>{
        e.preventDefault();
        //TODO placeorder screen
        dispatch(createOrder({...cart,orderItems:cartItems}));
    }
    useEffect(()=>{
        if(success){
            props.history.push(`/order/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET});
        }
    },[dispatch,props.history,success,order._id])
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className = "row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h1>Shipping Details</h1>
                                <div>
                                    <strong>Name: </strong>{shippingAddress.fullName} <br /><strong>Address: </strong>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <strong>Method: </strong>{paymentMethod}
                            </div>
                        </li>
                        <li className="col-2 card card-body">
                            <strong>Order Items:</strong>
                            {cartItems.map((cartItem) => (

                                    <div className="row">
                                        <img className="small" src={cartItem.image} alt={cartItem.name}></img>
                                        <Link to={`/product/${cartItem.product}`}><h2 className="min-30">{cartItem.name}</h2></Link>
                                        <p >{cartItem.qty} X ${cartItem.price} = ${cartItem.qty * cartItem.price}</p>
                                    </div>
                            ))}
                        </li>
                    </ul>
                </div>
                <div className ="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>
                                    Order Summary
                                </h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} disabled={cartItems.length === 0} className="primary block">Place Order</button>
                            </li>
                            <li> 
                                {
                                    loading && <LoadingBox></LoadingBox>
                                }
                                {
                                    error && <MessageBox variant="danger">{error}</MessageBox>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceorderScreen
