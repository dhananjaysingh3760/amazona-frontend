import React, { useEffect } from 'react'
import { addToCart } from '../actions/cartActions';
import { useDispatch } from 'react-redux';

function CartScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]): 1;

    useEffect(() => {
        console.log("dispatching add to cart action")
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    },[])
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>
                ADD TO CART : product id : {productId}  quantity : {qty}
            </p>
        </div>
    )
}

export default CartScreen
