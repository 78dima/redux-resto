import React /*{useContext}*/ from 'react';
import MainPage from '../pages/main-page';
import CartPage from '../pages/cart-page';
import AppHeader from '../app-header/app-header';
import Background from './food-bg.jpg';
import {Switch, Route} from 'react-router-dom';
// import RestoServiceContext from '../resto-service-context/resto-service-context';

const App = ()=>{
	// const contextType = useContext(RestoServiceContext); context without HOC

    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader/>
			<Switch>
				<Route
					path="/"
					component={MainPage}
					exact
				/>
				<Route
					path="/cart"
					component={CartPage}
				/>
			</Switch>
        </div>
    )
}

export default App;
