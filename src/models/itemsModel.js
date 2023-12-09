import {
    getAllItemsFromDB,
    getItemsByParamsFromDB,
    createItemIntoDB,
    editItemFromDB
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


export const getRelatedItems = async (itemData) => {
    try {
        let id = itemData.product_id;
        let license = itemData.license_name;
        let relatedItems = await getItemsByParamsFromDB({ license_name: license });

        relatedItems = relatedItems.filter(item => item.product_id != id);

        return relatedItems;
    } catch (error) {
        console.log('Se produjo un error al conseguir los productos: ', error);

        throw error;
    }
}


export const createItem = async (formData) => {
    try {
        let createData = await createItemIntoDB(formData);
        let newItemId = createData.insertId;
        let newItemData = await getItemsByParamsFromDB({ product_id: newItemId });

        console.log(newItemData);
        return newItemData;

    } catch (error) {
        console.log('Se produjo un error al conseguir los productos: ', error);

        throw error;
    }
}


export const editItem = async (params, formData, files) => {
    try {
        let productId = { product_id: params.id };
        let [imgFront] = files.image_front;
        let [imgBack] = files.image_back;

        imgFront = `/uploads/${imgFront.filename}`;
        imgBack = `/uploads/${imgBack.filename}`;

        let images = { image_front: imgFront, image_back: imgBack };

        Object.assign(formData, images);

        await editItemFromDB(formData, productId);

        let editedItemData = await getItemsByParamsFromDB(productId);


        return editedItemData;
    } catch (error) {
        console.log('Se produjo un error al conseguir los productos: ', error);

        throw error;
    }
}