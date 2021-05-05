import { CART_ADD_ADDRESS, CART_ADD_ITEM, CART_ADD_PAYMENT_METHOD, CART_EMPTY, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] , shippingAddress:{} },action) => {
    switch(action.type ){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product ===existItem.product ? item :x)
                }
            }else{
                return {
                    ...state,cartItems: [...state.cartItems, item]
                }
            }   
        case CART_REMOVE_ITEM: 
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload.product)
            }  
        case CART_ADD_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_ADD_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_EMPTY:
            return {
                ...state,cartItems: []
            }
        default:
            return state;
    } 
}

