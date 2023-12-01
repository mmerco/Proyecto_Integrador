import {
    adminSearchFromDB,
    getDuesFromDB
} from '../services/adminServices.js'
import getCategorysFromDB from '../services/categorysServices.js';
import getCollectionsFromDB from '../services/collectionsServices.js';




export const adminSearch = async (searchValue) => {
    try {
        let searchResult = await adminSearchFromDB(searchValue);

        return searchResult;
    } catch (error) {
        console.log('Se produjo un error al conseguir los productos: ', error);

        throw error;
    }
}


export const getEditData = async () => {
    try {
        let categorys = await getCategorysFromDB();
        let licenses = await getCollectionsFromDB();
        let dues = await getDuesFromDB();


        return [categorys, licenses, dues];
    } catch (error) {
        console.log('Se produjo un error al conseguir los productos: ', error);

        throw error;
    }
}