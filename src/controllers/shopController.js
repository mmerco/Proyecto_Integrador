import {
    shopMainModel,
    shopCategoryModel,
    shopCollectionModel,
    itemModel,
    addItemModel,
    cartModel
} from '../models/shopModel.js';
import getCategorysFromDB from '../services/categorysServices.js';





export const shopController = async (req, res) => {
    try {
        res.render('shop', await shopMainModel(req.query, req.session));

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const categoryController = async (req, res) => {
    try {
        res.render('shop', await shopCategoryModel(req.params.category, req.query, req.session));

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const collectionController = async (req, res) => {
    try {
        res.render('shop', await shopCollectionModel(req.params.collection, req.query, req.session));

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const itemController = async (req, res) => {
    try {
        res.render('item', await itemModel(req.params.id, req.session));

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const addItemController = async (req, res) => {
    try {
        await addItemModel(req.params.id, req.body, req.session);

        res.redirect(`/shop/item/${req.params.id}`);

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const cartController = async (req, res) => {
    try {
        res.render('cart', await cartModel(req.session));

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const shopControllers = {
    cartPost: (req, res) => res.send('Route for Cart View POST')
}

