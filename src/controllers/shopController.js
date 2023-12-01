import {
    capitalize,
    getShopItemsFormat,
    getRows,
} from '../models/shopModel.js';
import {
    getAllItems,
    getItemsByParams,
    getRelatedItems
} from '../models/itemsModel.js'
import getCategorysFromDB from '../services/categorysServices.js';



export const shopController = async (req, res) => {
    try {
        let itemsData = await getAllItems();
        let rows = getRows(itemsData);

        res.render('shop', {
            title: 'Shop | Funkoshop',
            submenu_data: await getCategorysFromDB(),
            data: getShopItemsFormat(itemsData, rows)
        });

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const categoryController = async (req, res) => {
    try {
        let category = req.params.category;
        let itemsData = await getItemsByParams({ category_name: category });
        let rows = getRows(itemsData);

        category = capitalize(category);

        res.render('shop', {
            title: `${category} | Funkoshop`,
            submenu_data: await getCategorysFromDB(),
            data: getShopItemsFormat(itemsData, rows)
        });

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const collectionController = async (req, res) => {
    try {
        let collection = req.params.collection;
        let itemsData = await getItemsByParams({ license_name: collection });
        let rows = getRows(itemsData);

        res.render('shop', {
            title: `${collection} | Funkoshop`,
            submenu_data: await getCategorysFromDB(),
            data: getShopItemsFormat(itemsData, rows)
        });

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const itemController = async (req, res) => {
    try {
        let id = req.params.id;
        let [itemData] = await getItemsByParams({ product_id: id });


        res.render('item', {
            title: `${itemData.product_name} | Funkoshop`,
            submenu_data: await getCategorysFromDB(),
            item: itemData,
            slider_title: 'productos relacionados',
            slider_items: await getRelatedItems(itemData)
        });

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const shopControllers = {
    addItem: (req, res) => res.send('Route for add item View POST'),
    cart: async (req, res) => res.render('cart', {
        title: 'Cart | Funkoshop',
        submenu_data: await getCategorysFromDB()
    }),
    cartPost: (req, res) => res.send('Route for Cart View POST')
}

