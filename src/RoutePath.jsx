import {Route , Routes} from 'react-router-dom';

import Home from './Home';
import DetailProduct from './DetailProduct';

function RoutePath() {
    return (
        <Routes>
            <Route path="/" exact Component={Home}/>
            <Route path="/products/:id" exact Component={DetailProduct}/>
            
        </Routes>
    )
    
}
export default RoutePath