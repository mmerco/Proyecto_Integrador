import {
    adminSearch,
    getEditData
} from '../models/adminModel.js'
import {
    getAllItems,
    getItemsByParams
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
        let [itemData] = await getItemsByParams({ product_id: req.params.id });
        let [catData, licData, duesData] = await getEditData();

        res.render('edit', {
            item: itemData,
            title: `Edit ${itemData.product_name} | Funkoshop`,
            categorys: catData,
            licenses: licData,
            dues: duesData
        });

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const adminControllers = {
    create: (req, res) => res.send('Route for Create View'),
    createPost: (req, res) => res.send('Route for Create View POST'),
    editPut: (req, res) => res.send('Route for Edit View PUT'),
    delete: (req, res) => res.send('Route for Delete View')
}
