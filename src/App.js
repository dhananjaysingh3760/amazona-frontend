import React from 'react';
import {BrowserRouter , Route , Link} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen'
import {useSelector,useDispatch} from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import {signout} from './actions/signinActions.js'

function App() {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch()
  const signoutHandler = () =>{
    dispatch(signout());
  }
  return (
    <BrowserRouter>
      <body className="grid-container">
      <header className="row">
          <div >
              <Link className="brand" to="/">amazona</Link>
          </div>
          <div>
              <Link to="/cart">cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>{
                userInfo ? <div className="dropdown"><Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link> <ul className="dropdown-content"> <Link to="#signout" onClick={signoutHandler}>Sign out</Link> </ul></div>:
                <Link to="/signIn">Sign in</Link>
              }
          </div>
      </header>
      <main>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/" component={HomeScreen} exact />
      </main>
      <footer className="row center">
          all rights reserved
      </footer>
    </body>
    </BrowserRouter>
  );
}

export default App;
