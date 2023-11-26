import { getItems, categoryItems, getItem, getTitle, relatedItems, capitalize } from '../models/shopModel.js'


const shopControllers = {
    all: (req, res) => res.render('shop', {
        data: getItems(),
        title: 'Shop | Funkoshop'
    }),
    category: (req, res) => res.render('shop', {
        data: categoryItems(req.params.category),
        title: `${capitalize(req.params.category)} | Funkoshop`
    }),
    item: (req, res) => res.render(`item`, {
        item: getItem(req.params.id),
        title: `${getTitle(req.params.id)} | Funkoshop`,
        slider_title: 'productos relacionados',
        items: relatedItems(req.params.id)
    }),
    addItem: (req, res) => res.send('Route for add item View POST'),
    cart: (req, res) => res.send('Route for Cart View'),
    cartPost: (req, res) => res.send('Route for Cart View POST')
}


export default shopControllers;