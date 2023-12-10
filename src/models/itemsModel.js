import {
    getAllItemsFromDB,
    getItemsByParamsFromDB,
    createItemIntoDB,
    editItemFromDB,
    deleteItemFromDB
} from '../services/itemsServices.js';
import { unlink } from 'node:fs';



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
        let licenseName = { license_name: itemData.license_name };
        let relatedItems = await getItemsByParamsFromDB(licenseName);

        relatedItems = relatedItems.filter(item => item.product_id != id);

        return relatedItems;
    } catch (error) {
        console.log('Se produjo un error al conseguir los productos: ', error);

        throw error;
    }
}


export const createItem = async (formData, files) => {
    try {
        let [imgFront] = files.image_front;
        let [imgBack] = files.image_back;

        imgFront = `/uploads/${imgFront.filename}`;
        imgBack = `/uploads/${imgBack.filename}`;

        formData.image_front = imgFront;
        formData.image_back = imgBack;

        let createData = await createItemIntoDB(formData);
        let newItemId = { product_id: createData.insertId };
        let newItemData = await getItemsByParamsFromDB(newItemId);


        return newItemData;
    } catch (error) {
        console.log('Se produjo un error al crear el producto: ', error);

        throw error;
    }
}


export const editItem = async (params, formData, files) => {
    try {
        let productId = { product_id: params.id };
        let [oldData] = await getItemsByParamsFromDB(productId);
        let oldImgFront = oldData.image_front;
        let oldImgBack = oldData.image_back;
        let [imgFront] = files.image_front;
        let [imgBack] = files.image_back;

        imgFront = `/uploads/${imgFront.filename}`;
        imgBack = `/uploads/${imgBack.filename}`;

        formData.image_front = imgFront;
        formData.image_back = imgBack;

        let edited = await editItemFromDB(productId, formData);

        if (edited) {
            unlink('public' + oldImgFront, (error) => {
                if (error) {
                    console.log(`Se produjo un error al borrar el archivo ${error.code}`);
                } else {
                    console.log('archivo front borrado ---> ' + oldImgFront);
                }
            });

            unlink('public' + oldImgBack, (error) => {
                if (error) {
                    console.log(`Se produjo un error al borrar el archivo ${error.code}`);
                } else {
                    console.log('archivo back borrado ---> ' + oldImgBack);
                }
            });

            let editedItemData = await getItemsByParamsFromDB(productId);

            return editedItemData;
        }

        return false;
    } catch (error) {
        console.log('Se produjo un error al editar el producto: ', error);

        throw error;
    }
}


export const deleteItem = async (params) => {
    try {
        let productId = { product_id: params.id };
        let [deletedItemData] = await getItemsByParamsFromDB(productId);
        let imgFront = deletedItemData.image_front;
        let imgBack = deletedItemData.image_back;

        let deleted = await deleteItemFromDB(productId);

        if (deleted) {
            unlink('public' + imgFront, (error) => {
                if (error) {
                    console.log(`Se produjo un error al borrar el archivo ${error.code}`);
                } else {
                    console.log('archivo front borrado ---> ' + imgFront);
                }
            });

            unlink('public' + imgBack, (error) => {
                if (error) {
                    console.log(`Se produjo un error al borrar el archivo ${error.code}`);
                } else {
                    console.log('archivo back borrado ---> ' + imgBack);
                }
            });

            return deletedItemData;
        }

        return false;
    } catch (error) {
        console.log('Se produjo un error al eliminar el producto: ', error);

        throw error;
    }
}