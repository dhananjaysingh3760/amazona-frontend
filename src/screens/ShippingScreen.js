import React,{useState} from 'react'
import CheckoutSteps from '../components/CheckoutSteps';
import {useDispatch, useSelector} from 'react-redux';
import {saveShippingAddress} from '../actions/cartActions';

function ShippingScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    if(!userInfo){
        props.history.push('/signin');
    }
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    const dispatch = useDispatch();
    const [fullName,setFullName] = useState(shippingAddress.fullName );
    const [address,setAddress] = useState(shippingAddress.address);
    const [city,setCity] = useState(shippingAddress.city);
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode);
    const [country,setCountry] = useState(shippingAddress.country);
    const submitHandler = (e) =>{
        e.preventDefault();
        //TODO dispatch shipping action
        dispatch(saveShippingAddress({fullName ,city,address,postalCode,country}));
        props.history.push('/payment');
    }
    
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form " onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName"> Full Name</label>
                    <input type="text" id ="fullName" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="address"> Address</label>
                    <input type="text" id ="adress" placeholder="Enter adress" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city"> </label>
                    <input type="text" id ="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id ="postalCode" placeholder="Enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="country"> country</label>
                    <input type="text" id ="country" placeholder="Enter your country" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}


export default ShippingScreen;