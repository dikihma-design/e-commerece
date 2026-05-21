import {Route , Routes} from 'react-router-dom';

import Home from './Home';
import ProductDetail from './ProductDetail';

function RoutePath() {
    return (
        <Routes>
            <Route path="/" exact Component={Home}/>
            <Route path="/products/:id" exact Component={ProductDetail}/>
            
            
        </Routes>
    )
    
}
export default RoutePath