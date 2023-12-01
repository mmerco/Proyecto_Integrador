import getCollections from '../models/mainModel.js';
import { getAllItems } from '../models/itemsModel.js';
import getCategorysFromDB from '../services/categorysServices.js';



export const homeController = async (req, res) => {
    try {
        let collectionsData = await getCollections();
        let itemsData = await getAllItems();

        res.render('home', {
            title: 'Home | Funkoshop',
            submenu_data: await getCategorysFromDB(),
            banner_title: 'nuevos ingresos',
            banner_text: 'Descubri el próximo Funko Pop de tu colección',
            banner_link_text: 'SHOP',
            collections: collectionsData,
            slider_title: 'últimos lanzamientos',
            slider_items: itemsData

        });
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
            submenu_data: await getCategorysFromDB(),
            banner_title: 'nuevos ingresos',
            banner_text: 'Descubri el próximo Funko Pop de tu colección',
            banner_link_text: 'SHOP',
            slider_title: 'últimos lanzamientos',
            slider_items: itemsData

        });
    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const mainControllers = {
    contact: async (req, res) => res.render('contact', {
        title: 'Contact | Funkoshop',
        submenu_data: await getCategorysFromDB()
    }),
    about: async (req, res) => res.render('about', {
        title: 'About Us | Funkoshop',
        submenu_data: await getCategorysFromDB(),
        banner_title: 'nuevos ingresos',
        banner_text: 'Descubri el próximo Funko Pop de tu colección',
        banner_link_text: 'SHOP',
        slider_title: 'últimos lanzamientos'
    }),
    faqs: async (req, res) => res.render('faqs', {
        title: 'Faqs | Funkoshop',
        submenu_data: await getCategorysFromDB()
    })
}

