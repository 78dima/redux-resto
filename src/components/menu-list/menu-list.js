import React, { useEffect} from 'react';
import MenuListItem from '../menu-list-item/menu-list-item';
import {connect} from 'react-redux';
import {menuLoaded, menuRequested, error, addedToCart, requestItemsThunk} from '../../actions/index';
import WithRestoService from '../hoc/with-resto-service';
import Spinner from '../spinner/spinner';
import './menu-list.scss';

const MenuList = (props)=>{
	const {menuItems, RestoService, menuLoaded, loading, menuRequested, error, addedToCart, requestItemsThunk, asyncItems} = props;
	
	useEffect(()=>{
		requestItemsThunk();
		menuRequested();
		RestoService.getMenuItems()
		.then(({data})=> menuLoaded(data))
		.catch((res)=>console.log(error(res)));
	},[RestoService, menuLoaded, error, menuRequested]);
	console.log(asyncItems);
	return (
		loading ? <Spinner/> :
		<ul className="menu__list">
			{
				menuItems.map((menuItem)=>{
					return (
						<MenuListItem
							onAddToCart={()=>addedToCart(menuItem.id)}
							key={menuItem.id}
							menuItem={menuItem}
							visibleBtn={menuItem.visible}
						/>
					)
				})
			}
		</ul>
		
	)
}
// state
function mapStateToProps(state){
	return{
		menuItems: state.menu,
		loading: state.loading,
		errorMessage: state.errorMessage,
		cartItems: state.items,
		asyncItems: state.asyncItems
	}
}
// actions
const mapDispatchToProps = {
	menuLoaded,
	menuRequested,
	error,
	addedToCart,
	requestItemsThunk
}

// const mapDispatchToProps = (dispatch)=>({
// 	menuLoaded: (newMenu)=>{
// 		dispatch({
// 			type: "MENU_LOADED",
// 			payload: newMenu
// 		})
// 	},
// 	menuRequested: ()=>{
// 		dispatch({
// 			type: "MENU_REQUESTED"
// 		})
// 	},
// 	error: (error)=>{
// 		dispatch({
// 			type: "MENU_ERROR",
// 			payload: error
// 		})
// 	},
// 	addedToCart: (id)=>{
// 		dispatch({
// 			type: "ITEM_ADD_TO_CART",
// 			payload: id
// 		})
// 	},
// 	onDispatchItems: () => {
// 		dispatch(requestItems());
// 	}
// })

export default WithRestoService(connect(mapStateToProps, mapDispatchToProps)(MenuList));