import {
    adminSearchFromDB,
    getDuesFromDB
} from '../services/adminServices.js'
import getCategorysFromDB from '../services/categorysServices.js';
import getCollectionsFromDB from '../services/collectionsServices.js';




export const adminSearch = async (searchValue) => {
    let searchResult = await adminSearchFromDB(searchValue);

    return searchResult;
}


export const getEditData = async () => {
    let categorys = await getCategorysFromDB();
    let licenses = await getCollectionsFromDB();
    let dues = await getDuesFromDB();


    return [categorys, licenses, dues];
}