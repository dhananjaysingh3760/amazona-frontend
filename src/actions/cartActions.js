import axios from "../axios";
import { CART_ADD_ADDRESS,CART_ADD_ITEM ,CART_REMOVE_ITEM} from "../constants/cartConstants";

export const addToCart = (productId,qty) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeItem = (productId) => (dispatch,getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            product: productId,
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const saveShippingAddress = ( data ) => (dispatch) =>{
    dispatch({type: CART_ADD_ADDRESS,payload: data});
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}