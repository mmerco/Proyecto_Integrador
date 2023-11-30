import {
    getAllItemsFromDB,
    getItemsByParamsFromDB
} from '../services/itemsServices.js';



export const getAllItems = async () => {
    try {
        let items = await getAllItemsFromDB();

        return items;
    } catch (error) {
        console.log('Se produjo un error al conseguir los productos: ', error);

        throw error;
    }
}


export const getItemsByParams = async (params) => {
    try {
        let items = await getItemsByParamsFromDB(params);

        return items;
    } catch (error) {
        console.log('Se produjo un error al conseguir los productos: ', error);

        throw error;
    }
}


export const getRelatedItems = async (item) => {
    try {
        let id = item.product_id;
        let license = item.license_name;
        let relatedItems = await getItemsByParamsFromDB({ license_name: license });

        relatedItems = relatedItems.filter(item => item.product_id != id);

        return relatedItems;
    } catch (error) {
        console.log('Se produjo un error al conseguir los productos: ', error);

        throw error;
    }
}