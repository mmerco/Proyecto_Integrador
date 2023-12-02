import getCategorysFromDB from '../services/categorysServices.js';
import {
    getAllItems
} from '../models/itemsModel.js';


/* Calcula la cantidad de filas necesarias para renderizar los items */
export const getRows = (data) => {
    let rows = Math.ceil(data.length / 3);

    return rows;
}


/* Da formato a los datos para renderizar el shop con filas de 3 items */
export const getShopItemsFormat = (data, rows) => {
    let newData = [];
    let start = 0;
    let end = 3;


    for (let i = 0; i < rows; i++) {
        let items = data.slice(start, end);

        start += 3;
        end += 3;


        newData.push(items)
    }

    return [newData, rows];
}




/* Devuelve los parametros de carga de la pagina shop dependiendo si hay querys del
    form. Si hay querys, filtra los datos correspondientes segun las opciones del form
*/
export const shopMainModel = async (query) => {
    let itemsData = await getAllItems();
    let rows = getRows(itemsData);

    if (query) {
        let filterData = itemsData;


        /* Si hay parametro de busqueda por texto filtra los items si encuentra
            coincidencia en nombre o coleccion
        */
        if (query.search) {
            let searchValue = query.search.toLocaleLowerCase();

            filterData = filterData.filter(item => {
                let name = item.product_name.toLocaleLowerCase();
                let collection = item.license_name.toLocaleLowerCase();


                if (name.includes(searchValue) || collection.includes(searchValue)) {
                    return true;
                }

                return false;
            });
        }


        /* Si hay parametro de busqueda por rango de precio filtra los items que
            se encuentren en ese rango
        */
        if (query.min || query.max) {
            let min = Number(query.min);
            let max = Number(query.max);

            filterData = filterData.filter(item => {
                let price = Number(item.price);

                if (price >= min && price <= max) {
                    return true;
                }

                return false;
            });
        }



        /* Si hay parametro de busqueda por orden filtra los items por la condicion
            pasada como parametro (precio mayor, precio menor, A-Z o Z-A)
        */
        if (query.order) {
            let order = query.order;

            if (order == 'mayor') {
                filterData = filterData.sort((a, b) => {
                    let aPrice = Number(a.price);
                    let bPrice = Number(b.price);

                    if (aPrice > bPrice) {
                        return -1;
                    }
                    if (aPrice < bPrice) {
                        return 1;
                    }

                    return 0;
                });
            }

            if (order == 'menor') {
                filterData = filterData.sort((a, b) => {
                    let aPrice = Number(a.price);
                    let bPrice = Number(b.price);

                    if (aPrice > bPrice) {
                        return 1;
                    }
                    if (aPrice < bPrice) {
                        return -1;
                    }

                    return 0;
                });
            }

            if (order == 'az') {
                filterData = filterData.sort((a, b) => {

                    if (a.product_name > b.product_name) {
                        return 1;
                    }
                    if (a.product_name < b.product_name) {
                        return -1;
                    }

                    return 0;
                });
            }

            if (order == 'za') {
                filterData = filterData.sort((a, b) => {

                    if (a.product_name > b.product_name) {
                        return -1;
                    }
                    if (a.product_name < b.product_name) {
                        return 1;
                    }

                    return 0;
                });
            }
        }

        return {
            title: 'Shop | Funkoshop',
            submenu_data: await getCategorysFromDB(),
            form_path: '',
            query: query,
            data: getShopItemsFormat(filterData, rows)
        }

    } else {
        return {
            title: 'Shop | Funkoshop',
            submenu_data: await getCategorysFromDB(),
            form_path: '',
            query: '',
            data: getShopItemsFormat(itemsData, rows)
        }
    }
}


export const capitalize = (text) => {

    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}

