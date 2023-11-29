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


export const getRows = (data) => {
    let rows = Math.ceil(data.length / 3);

    return rows;
}


export const getItemsFormat = async (rows) => {
    try {
        let data = await getAllItemsFromDB();
        let newData = [];
        let start = 0;
        let end = 3;


        for (let i = 0; i < rows; i++) {
            let items = data.slice(start, end);

            start += 3;
            end += 3;


            newData.push(items)
        }

        return newData;
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
