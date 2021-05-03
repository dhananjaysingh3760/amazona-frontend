import axios from "../axios"
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/signinConstants"

export const signin = (email,password) => async (dispatch) =>{
    dispatch({type:USER_SIGNIN_REQUEST, payload:{email,password}});
    try{
        const {data} = await axios.post("/api/users/signin",{email,password});
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
        localStorage.setItem('userInfo',JSON.stringify(data));
    }catch(error){
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.message? error.response.data.message: error.message,
        })
    }
} 

export const signout = () => (dispatch) => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress')
    dispatch({type:USER_SIGNOUT});
}