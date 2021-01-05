import axios from 'axios';
export const MENU_LOADED = "MENU_LOADED";
export const MENU_REQUESTED = "MENU_REQUESTED";
export const MENU_ERROR = "MENU_ERROR";
export const ITEM_ADD_TO_CART = "ITEM_ADD_TO_CART";
export const ITEM_REMOVE_FROM_CART = "ITEM_REMOVE_FROM_CART";
export const ASYNC_ITEMS = "ASYNC_ITEMS";


export function menuLoaded(newMenu){
	return{
		type: MENU_LOADED,
		payload: newMenu
	};
};

export function menuRequested(){
	return{
		type: MENU_REQUESTED
	};
};

export function requestItemsThunk(){
	return dispatch =>{
		axios('http://localhost:3000/menu/')
			.then(res=>{
				dispatch({type: ASYNC_ITEMS, payload: res.data});
			})
			.catch(res=>{
				dispatch(error(res));
			})
	}
}

export function error(error){
	return{
		type: MENU_ERROR,
		payload: error
	};
};

export function addedToCart(id){
	return{
		type: ITEM_ADD_TO_CART,
		payload: id
	};
};

export function deleteFromCart(id){
	return{
		type: ITEM_REMOVE_FROM_CART,
		payload: id
	};
};