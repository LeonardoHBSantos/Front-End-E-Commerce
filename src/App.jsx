import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import DetailsPage from './pages/DetailsPage';
import Checkout from './pages/Checkout';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/search/:search" component={ Search } />
        <Route path="/shoppingcart" component={ ShoppingCart } />
        <Route path="/product-details/:id" component={ DetailsPage } />
        <Route path="/checkout" component={ Checkout } />
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}

export default App;
