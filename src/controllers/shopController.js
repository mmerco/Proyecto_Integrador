import {
    getItem,
    capitalize,
    getAllItems,
    getItemsFormat,
    getRows
} from '../models/shopModel.js'



export const shopController = async (req, res) => {
    try {
        let itemsData = await getAllItems();
        let rows = getRows(itemsData);
        let itemsFormat = await getItemsFormat(rows);

        res.render('shop', {
            title: 'Shop | Funkoshop',
            data: [itemsFormat, rows]
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

