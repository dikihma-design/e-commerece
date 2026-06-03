import {Route , Routes} from 'react-router-dom';

import Home from './Home';
import ProductDetail from './ProductDetail';
import Checkout from './Checkout';
import Cart from './Cart';
import Profile from './Profile';

function RoutePath() {
    return (
        <Routes>
            <Route path="/" exact Component={Home}/>
            <Route path="/products/:id" exact Component={ProductDetail}/>
            <Route path="/checkout" exact Component={Checkout}/>
            <Route path="/cart" exact Component={Cart}/>
            <Route path="/profile" exact Component={Profile}/>
            
            
        </Routes>
    )
    
}
export default RoutePath