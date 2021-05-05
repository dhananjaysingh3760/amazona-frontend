import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {getOrder} from '../actions/orderActions';

function OrderScreen(props) {
    const dispatch = useDispatch();
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state => state.orderDetails);
    const {loading, order ,error} = orderDetails;
    console.log(orderId);
    useEffect(()=>{
        dispatch(getOrder(orderId));
    },[dispatch,orderId]);
    return (
        <div>
        { 
            loading ? (<LoadingBox />) :error ? (<MessageBox variant="danger">{error}</MessageBox>):
            <div>
                <h1>Order {order._id}</h1>
                {console.log(order._id)}
                <div className = "row top">
                    <div className="col-2">
                        <ul>
                            <li>
                                <div className="card card-body">
                                    <h1>Shipping Details</h1>
                                    <div>
                                        <strong>Name: </strong>{order.shippingAddress.fullName} <br /><strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </div>
                                    {order.isDelivered ? <MessageBox variant="success">delivered at {order.deliveredAt}</MessageBox> : <MessageBox variant="danger">Not delivered</MessageBox>}
                                </div>
                            </li>
                            <li>
                                <div className="card card-body">
                                    <h2>Payment</h2>
                                    <div><strong>Method: </strong>{order.paymentMethod}</div>
                                    {order.isPaid ? <MessageBox variant="success">is paid {order.paidAt}</MessageBox> : <MessageBox variant="danger">Not paid</MessageBox>}
                                </div>
                            </li>
                            <li className="col-2 card card-body">
                                <strong>Order Items:</strong>
                                {order.orderItems.map((orderItem) => (
                                    <div className="row">
                                        <img className="small" src={orderItem.image} alt={orderItem.name}></img>
                                        <Link to={`/product/${orderItem.product}`}><h2 className="min-30">{orderItem.name}</h2></Link>
                                        <p >{orderItem.qty} X ${orderItem.price} = ${orderItem.qty * orderItem.price}</p>
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
                                        <div>${order.itemsPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Shipping</div>
                                        <div>${order.shippingPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Tax</div>
                                        <div>${order.taxPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div><strong>Order Total</strong></div>
                                        <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default OrderScreen;
