import React,{ useEffect} from 'react';
import Product from '../components/Product';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions';

function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading,error,products} = productList;
    useEffect(() =>{
        dispatch(listProducts());
    },[dispatch])
    return (
        <div> 
        { loading? (<LoadingBox />) :error ? (<MessageBox variant="danger">{error}</MessageBox>):<Product key ={products._id} products = {products}></Product>}
        </div>
    )
}

export default HomeScreen;
