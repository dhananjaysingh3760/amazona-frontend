import React from 'react';
import {BrowserRouter , Route , Link} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen'
import {useSelector} from 'react-redux';

function App() {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;

  return (
    <BrowserRouter>
      <body className="grid-container">
      <header className="row">
          <div >
              <Link className="brand" to="/">amazona</Link>
          </div>
          <div>
              <Link to="/cart.html">cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              <Link to="/Sign in">Sign in</Link>
          </div>
      </header>
      <main>
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
