import { getAllItemsFromDB } from '../services/itemsServices.js';



export const getAllItems = async () => {
    try {
        let items = await getAllItemsFromDB();

        return items;
    } catch (error) {
        console.log('Se produjo un error al conseguir los productos: ', error);

        throw error;
    }
}


export const capitalize = (text) => {

    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}


export const getItem = (params) => {
    let product = params;

    return product;
}
