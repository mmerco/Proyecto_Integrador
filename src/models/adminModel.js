import {
    adminSearchFromDB,
    getDuesFromDB
} from '../services/adminServices.js'
import { getAllItems } from './itemsModel.js';
import getCategorysFromDB from '../services/categorysServices.js';
import getCollectionsFromDB from '../services/collectionsServices.js';




export const adminModel = async (query, session) => {
    try {
        if (!query.msg_ok && !query.msg_err) {

            return {
                data: await getAllItems(),
                session_name: session.name,
                msg_err: false,
                msg_ok: false,
                title: 'Admin | Funkoshop'
            }
        } else {
            let msgOk = query.msg_ok ? query.msg_ok : false;
            let msgErr = query.msg_err ? query.msg_err : false;


            return {
                data: await getAllItems(),
                session_name: session.name,
                msg_err: msgErr,
                msg_ok: msgOk,
                title: 'Admin | Funkoshop'
            }
        }
    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}



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


export const getCreateModel = async (session) => {
    let categorysData = await getCategorysFromDB();
    let licensesData = await getCollectionsFromDB();

    return {
        title: `Create | Funkoshop`,
        session_name: session.name,
        categorys: categorysData,
        licenses: licensesData
    }
}

