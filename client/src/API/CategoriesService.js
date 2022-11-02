import axios from "axios";

export default class CategoriesService{

    static async getAll(){
        const response =  axios.get('http://localhost:3000/categories', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response;
    }
}
