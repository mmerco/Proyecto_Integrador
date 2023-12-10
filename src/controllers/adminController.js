import {
    adminSearch,
    getEditData,
    getCreateModel
} from '../models/adminModel.js'
import {
    getAllItems,
    getItemsByParams,
    createItem,
    editItem,
    deleteItem
} from "../models/itemsModel.js";



export const adminController = async (req, res) => {
    try {
        res.render('admin', {
            data: await getAllItems(),
            title: 'Admin | Funkoshop'
        });
    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const searchController = async (req, res) => {
    try {
        res.render('admin', {
            data: await adminSearch(req.query.search_value),
            title: 'Admin | Funkoshop'
        });
    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const editController = async (req, res) => {
    try {
        let productId = { product_id: req.params.id };
        let [itemData] = await getItemsByParams(productId);
        let [catData, licData, duesData] = await getEditData();

        res.render('edit', {
            item: itemData,
            //title: `Edit ${itemData.product_name} | Funkoshop`,
            title: `Edit | Funkoshop`,
            categorys: catData,
            licenses: licData,
            dues: duesData
        });
    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const editControllerPUT = async (req, res) => {
    try {
        let editedItem = await editItem(req.params, req.body, req.files);

        if (editedItem) {
            res.redirect('/admin' +
                `?msj=Se edito el item ${editedItem.prduct_name} con ID ${editedItem.product_id} correctamente`
            );
        } else {
            res.redirect('/admin' +
                `?msj=Se produjo un error. Item no editado`
            );
        }
    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const createController = async (req, res) => {
    try {
        res.render('create', await getCreateModel());

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const createControllerPOST = async (req, res) => {
    try {
        let [createdItem] = await createItem(req.body, req.files);

        if (createdItem) {
            res.redirect('/admin' +
                `?msj=Se creo el item ${createdItem.product_name} con ID ${createdItem.product_id} correctamente`
            );
        } else {
            res.redirect('/admin' +
                `?msj=Se produjo un error. Item no creado`
            );
        }
    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const deleteController = async (req, res) => {
    try {
        let deletedItem = await deleteItem(req.params);

        if (deletedItem) {
            res.redirect('/admin' +
                `?msj=Se elimino el item ${deletedItem.prduct_name} con ID ${deletedItem.product_id} correctamente`
            );
        } else {
            res.redirect('/admin' +
                `?msj=Se produjo un error. Item no eliminado`
            );
        }
    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}

