import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import './app-header.scss';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
const AppHeader = ({total}) => {
    return (
        <header className="header">
			<NavLink
				className="header__link"
				to="/"
			>Menu</NavLink>
			<NavLink
				className="header__link"
				to="/cart"
			>
				<img className="header__cart" src={cartIcon} alt="cart"></img>
                Total: {total} $
			</NavLink>
        </header>
    )
};

const mapStateToProps = (state)=>{
	return {
		total: state.total
	}
}

export default connect(mapStateToProps)(AppHeader);