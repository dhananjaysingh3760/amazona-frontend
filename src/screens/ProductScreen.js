import React,{useEffect,useState} from 'react'
import Rating from '../components/Rating'
import {useSelector , useDispatch} from 'react-redux'; 
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { prodDetails } from '../actions/productActions';


function ProductScreen(props) {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(prodDetails(productId));
    },[dispatch,productId])
    const addToCardHandler = () => {
        console.log("clicking");
        props.history.push(`/cart/${productId}?qty=${qty}`)
    } 
    return (
        <div> 
        { loading? (<LoadingBox />) :error ? (<MessageBox variant="danger">{error}</MessageBox>):<div className="row top">
        <div className="col-2"><img src={product.image} alt={product.name}/></div>
        <div className="col-1">
            <ul>
                <li>
                    {product.name}
                </li>
                <Rating rating={product.rating} numReviews={product.numReviews} ></Rating>
                <li>
                    Price: ${product.price}
                </li>
                <li>
                    Description:
                    <p>{product.description}</p>
                </li>
            </ul>
        </div>
        <div className="col-1">
            <div className="card card-body">
               <ul>
                    <li>
                        <div className="row">
                            <div>Price</div>
                            <div className="price">${product.price}</div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div>Status </div>
                            <div>
                                {product.countInStock>0 ? <span className="success">In stock</span>:<span className="danger">Out of stock</span>}
                            </div>
                        </div>
                    </li>
                    {
                        product.countInStock > 0 ?                   
                            <li>
                                <div className="row">
                                    <div>Qty</div>
                                    <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {Array.from({length: product.countInStock}, (_, i) => i + 1).map((num) => (<option key={num} value={num}>{num}</option>))}
                                    </select>
                                </div>
                                <button onClick={addToCardHandler}className="primary block">Add to cart</button>
                            </li>
                        :
                        <li>
                            <button className=" block">Add to cart</button>
                        </li>
                    }   
               </ul>
            </div>
        </div>
    </div>}
    </div>    
    )
}

export default ProductScreen
