import {createStore ,compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer} from './reducers/cartReducers';
import { orderCreateReducer, orderGetReducer } from './reducers/orderReducer';
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import { userRegisterReducer, userSigninReducer } from './reducers/userReducer';

const initialState = {
    cart:{
        cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[],
        shippingAddress: localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')) : {},
    },
    userSignin:{
        userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null,
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,  
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderGetReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;
 