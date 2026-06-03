import {Route , Routes} from 'react-router-dom';

import Home from './Home';
import ProductDetail from './ProductDetail';
import Checkout from './Checkout';
import Cart from './Cart';

function RoutePath() {
    return (
        <Routes>
            <Route path="/" exact Component={Home}/>
            <Route path="/products/:id" exact Component={ProductDetail}/>
            <Route path="/checkout" exact Component={Checkout}/>
            <Route path="/cart" exact Component={Cart}/>
            
            
        </Routes>
    )
    
}
export default RoutePath