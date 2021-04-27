import React, { useEffect } from 'react'
import { addToCart } from '../actions/cartActions';
import { useDispatch ,useSelector} from 'react-redux';
import MessageBox from '../components/MessageBox';
import { Link} from 'react-router-dom';

function CartScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]): 1;
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    useEffect(() => {
        console.log("dispatching add to cart action")
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    },[dispatch,productId,qty])
    return (   
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>{
                    cartItems.length ===  0 ?
                    (<MessageBox>
                        Cart is empty<Link to="/">Go shopping</Link>
                    </MessageBox>)
                    :
                    <ul>
                    {cartItems.map((cartItem) => (
                        <li className="row ">
                            <img className="small" src={cartItem.image} alt={cartItem.name}></img>
                                <Link to={`/product/${cartItem.product}`}><h2 className="min-30">{cartItem.name}</h2></Link>
                            <div >
                                <select  onChange={ (e) => dispatch(addToCart(cartItem.product,Number(e.target.value)))} value={cartItem.qty}>
                                    {Array.from({length: cartItem.qty}, (_, i) => i + 1).map((num) => (<option key={num} value={num}>{num}</option>))}
                                </select>
                            </div>
                            <p >${cartItem.price}</p>
                            <button className="block">Delete</button>
                        </li>
                    ))}
                </ul>
                }
                
            </div>
            <div className="card card-body col-1">
                <ul>
                    <li><p>Subtotal ({cartItems.reduce((accumulator,current)=> (accumulator + current.qty),0)} items) : ${cartItems.reduce((accumulator,current) => (accumulator + current.qty * current.price),0)}</p></li>
                    <li><button class={cartItems.length === 0? 'block' : 'primary block'}>Proceed to Checkout</button></li>
                </ul>
            </div>
        </div>
    )
}

export default CartScreen
