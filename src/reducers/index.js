import {
	MENU_LOADED,
	MENU_REQUESTED, 
	MENU_ERROR, 
	ITEM_ADD_TO_CART, 
	ITEM_REMOVE_FROM_CART, 
	ASYNC_ITEMS
} from '../actions/index';


const initialState = {
	menu: [],
	loading: true,
	errorMessage: null,
	items: [],
	total: 0,
	visibleBtn: true,
	asyncItems: []
}
export default function reducer(state = initialState, action){
	switch (action.type) {
		case ASYNC_ITEMS:
			return {
				...state,
				asyncItems: action.payload
			};
		case MENU_REQUESTED:
			return {
				...state,
				loading: true
			};
		case MENU_LOADED:
			return {
				...state,
				menu: action.payload,
				loading: false,
			};
		case MENU_ERROR:
			return {
				...state,
				loading: true,
				errorMessage: action.payload
			};
		case ITEM_ADD_TO_CART:
			const id = action.payload;
			const item = state.menu.find((item)=>item.id === id);

			let newItem = {
				title: item.title,
				price: item.price,
				url: item.url,
				id: item.id,
				count: 1,
				visible: false
			}

			state.items.filter(item=>{
				if(item.id === id){
					newItem.count += item.count;
					newItem.visible = true;
				}
				return null;
			})

			const currentMenuItem = state.menu.filter(item=>item.id===id)[0];
			const newMenuItem = Object.assign(currentMenuItem, {visible: false});
			const newItemArray = [...state.items.filter(item=>item.id!==id), newItem];

			return{
				...state,
				menu: Object.assign(state.menu, newMenuItem),
				items: newItemArray,
				total: +newItem.price + state.total
			}
			
		case ITEM_REMOVE_FROM_CART:
			// const idx = action.payload;
			// const itemIndex = state.items.findIndex((item)=>item.id===idx)
			// return {
			// 	...state,
			// 	items: [
			// 		...state.items.slice(0, itemIndex),
			// 		...state.items.slice(itemIndex + 1)
			// 	]
			// }
			const idx = action.payload;
			const newItems = state.items.filter((item)=>item.id!==idx);

			let total = 0;
			newItems.forEach(item=>{
				total += +(item.price*item.count);
			})

			return {
				...state,
				total,
				items: newItems
			}
		default:
			return state
	}
}