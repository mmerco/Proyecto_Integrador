import {
    getItem,
    capitalize,
    getAllItems,
    getShopItemsFormat,
    getRows,
    getItemsByParams
} from '../models/shopModel.js'



export const shopController = async (req, res) => {
    try {
        let itemsData = await getAllItems();
        let rows = getRows(itemsData);

        res.render('shop', {
            title: 'Shop | Funkoshop',
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
            data: getShopItemsFormat(itemsData, rows)
        });

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const shopControllers = {
    category: (req, res) => res.render('shop', {
        data: 'ss',
        title: `${capitalize(req.params.category)} | Funkoshop`
    }),
    item: (req, res) => res.render(`item`, {
        item: getItem(req.params.id),
        title: `title | Funkoshop`,
        slider_title: 'productos relacionados',
        items: 'ss'
    }),
    addItem: (req, res) => res.send('Route for add item View POST'),
    cart: (req, res) => res.render('cart', {
        title: 'Cart | Funkoshop'
    }),
    cartPost: (req, res) => res.send('Route for Cart View POST')
}

