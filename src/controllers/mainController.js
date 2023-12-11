import { homeModel } from '../models/mainModel.js';
import { getAllItems } from '../models/itemsModel.js';
import getCategorysFromDB from '../services/categorysServices.js';



export const homeController = async (req, res) => {
    try {
        res.render('home', await homeModel(req.query, req.session));

    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const aboutController = async (req, res) => {
    try {
        let itemsData = await getAllItems();

        res.render('about', {
            title: 'About Us | Funkoshop',
            admin_header: req.session.admin || req.session.mod ? true : false,
            submenu_data: await getCategorysFromDB(),
            session_name: req.session.name ? req.session.name : false,
            banner_title: 'nuevos ingresos',
            banner_text: 'Descubri el próximo Funko Pop de tu colección',
            banner_link_text: 'SHOP',
            cart_number: req.session.cart ? req.session.cart.length : 0,
            slider_title: 'últimos lanzamientos',
            slider_items: itemsData

        });
    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const mainControllers = {
    contact: async (req, res) => {
        res.render('contact', {
            title: 'Contact | Funkoshop',
            admin_header: req.session.admin || req.session.mod ? true : false,
            cart_number: req.session.cart ? req.session.cart.length : 0,
            submenu_data: await getCategorysFromDB(),
            session_name: req.session.name ? req.session.name : false,
        })
    },
    faqs: async (req, res) => {
        res.render('faqs', {
            title: 'Faqs | Funkoshop',
            admin_header: req.session.admin || req.session.mod ? true : false,
            cart_number: req.session.cart ? req.session.cart.length : 0,
            submenu_data: await getCategorysFromDB(),
            session_name: req.session.name ? req.session.name : false,
        })
    }
}

