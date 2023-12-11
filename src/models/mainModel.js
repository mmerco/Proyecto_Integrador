import getCollectionsFromDB from "../services/collectionsServices.js";
import getCategorysFromDB from "../services/categorysServices.js";
import { getAllItems } from "./itemsModel.js";



export const getCollections = async () => {
    try {
        let collections = await getCollectionsFromDB();
        let randomColections = [];

        // Se buscan 3 colecciones aleatorias para la pagina home
        for (let i = 0; i < 3; i++) {
            let index = Math.floor(Math.random() * collections.length);
            let found = randomColections.find(item => item == collections[index]);

            if (!found) {
                randomColections.push(collections[index]);
            } else {
                i--;
            }
        }

        return randomColections;
    } catch (error) {
        console.log('Se produjo un error al conseguir las colecciones: ', error);

        throw error;
    }
}



export const homeModel = async (query, session) => {
    try {
        let collectionsData = await getCollections();
        let itemsData = await getAllItems();


        return {
            title: 'Home | Funkoshop',
            admin_header: session.admin || session.mod ? true : false,
            submenu_data: await getCategorysFromDB(),
            session_name: session.name ? session.name : false,
            banner_title: 'nuevos ingresos',
            banner_text: 'Descubri el próximo Funko Pop de tu colección',
            banner_link_text: 'SHOP',
            msg: query.msg ? query.msg : false,
            collections: collectionsData,
            cart_number: session.cart ? session.cart.length : 0,
            slider_title: 'últimos lanzamientos',
            slider_items: itemsData
        }
    } catch (error) {
        console.log('Se produjo un error al conseguir los productos: ', error);

        throw error;
    }
}


