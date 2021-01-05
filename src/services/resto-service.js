import axios from 'axios';
export default class RestoService{
	_apiBase = 'http://localhost:3000';
	async getResource(url){
		return await axios(`${this._apiBase}${url}`);
	}

	async getMenuItems(){
		return await this.getResource('/menu/');
	}

}