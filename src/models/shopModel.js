import getCategorysFromDB from '../services/categorysServices.js';
import {
    getAllItems,
    getItemsByParams,
    getRelatedItems
} from '../models/itemsModel.js';


/* Calcula la cantidad de filas necesarias para renderizar los items en filas de a 3 items */
export const getRows = (data) => {
    let rows = Math.ceil(data.length / 3);

    return rows;
}


export const capitalize = (text) => {

    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}


/* Da formato a los datos para renderizar el shop con filas de 3 items cada una */
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



/* Si hay parametro de busqueda por texto filtra los items si encuentra
    coincidencia en nombre o coleccion
*/
export const filterBySearch = (data, searchValue) => {
    searchValue = searchValue.toLocaleLowerCase();

    data = data.filter(item => {
        let name = item.product_name.toLocaleLowerCase();
        let collection = item.license_name.toLocaleLowerCase();


        if (name.includes(searchValue) || collection.includes(searchValue)) {
            return true;
        }

        return false;
    });

    return data;
}



/* Si hay parametro de busqueda por rango de precio filtra los items que
    se encuentren en ese rango
*/
export const filterByPrice = (data, min, max) => {
    min = Number(min);
    max = Number(max);

    data = data.filter(item => {
        let price = Number(item.price);

        if (price >= min && price <= max) {
            return true;
        }

        return false;
    });

    return data;
}




/** Si hay parametro de busqueda por orden de precio, filtra los items por la condicion
    pasada como parametro (precio mayor o precio menor).
    @param asc TRUE = menor a mayor / FALSE = mayor a menor
*/
export const sortByPrice = (data, asc = true) => {
    if (asc != true && asc != false) {
        asc = true;
    }

    if (asc) {
        data = data.sort((a, b) => {
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

    } else {
        data = data.sort((a, b) => {
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

    return data;
}




/** Si hay parametro de busqueda por orden alfabético, filtra los items por la condicion
    pasada como parametro (A-Z o Z-A).
    @param asc TRUE = A-Z / FALSE = Z-A
*/
export const sortAlpha = (data, asc = true) => {
    if (asc != true && asc != false) {
        asc = true;
    }

    if (asc) {
        data = data.sort((a, b) => {
            if (a.product_name > b.product_name) {
                return 1;
            }
            if (a.product_name < b.product_name) {
                return -1;
            }

            return 0;
        });

    } else {
        data = data.sort((a, b) => {
            if (a.product_name > b.product_name) {
                return -1;
            }
            if (a.product_name < b.product_name) {
                return 1;
            }

            return 0;
        });
    }

    return data;
}




/* Devuelve los parametros de carga de la pagina shop, dependiendo si hay o no querys del
    form. Si hay querys, filtra los datos correspondientes segun las opciones del form
*/
export const shopMainModel = async (query, session) => {
    try {
        let itemsData = await getAllItems();

        if (query.search != undefined) {
            let filterData = itemsData;

            if (query.search != "") {
                filterData = filterBySearch(filterData, query.search);
            }

            if (query.min != undefined && query.max != undefined && query.min != 0 && query.max != 0) {
                filterData = filterByPrice(filterData, query.min, query.max);
            }

            if (query.order != undefined && query.order != "") {
                let order = query.order;

                if (order == 'mayor') {
                    filterData = sortByPrice(filterData, false);
                }

                if (order == 'menor') {
                    filterData = sortByPrice(filterData);
                }

                if (order == 'az') {
                    filterData = sortAlpha(filterData);
                }

                if (order == 'za') {
                    filterData = sortAlpha(filterData, false);
                }
            }

            let rows = getRows(filterData);

            return {
                title: 'Shop | Funkoshop',
                submenu_data: await getCategorysFromDB(),
                form_path: '',
                cart_number: session.cart ? session.cart.length : 0,
                query: query,
                data: getShopItemsFormat(filterData, rows)
            }

        } else {
            let rows = getRows(itemsData);

            return {
                title: 'Shop | Funkoshop',
                submenu_data: await getCategorysFromDB(),
                form_path: '',
                cart_number: session.cart ? session.cart.length : 0,
                query: {},
                data: getShopItemsFormat(itemsData, rows)
            }
        }

    } catch (error) {
        console.log('Se produjo un error al conseguir los datos: ', error);

        throw error;
    }
}




/* Devuelve los parametros de carga de la pagina shop/category, dependiendo si hay o no querys del
    form. Si hay querys, filtra los datos correspondientes segun las opciones del form
*/
export const shopCategoryModel = async (category, query, session) => {
    try {
        let itemsData = await getItemsByParams({ category_name: category });

        category = capitalize(category);

        if (query.search != undefined) {
            let filterData = itemsData;

            if (query.search != "") {
                filterData = filterBySearch(filterData, query.search);
            }

            if (query.min != undefined && query.max != undefined && query.min != 0 && query.max != 0) {
                filterData = filterByPrice(filterData, query.min, query.max);
            }

            if (query.order != undefined && query.order != "") {
                let order = query.order;

                if (order == 'mayor') {
                    filterData = sortByPrice(filterData, false);
                }

                if (order == 'menor') {
                    filterData = sortByPrice(filterData);
                }

                if (order == 'az') {
                    filterData = sortAlpha(filterData);
                }

                if (order == 'za') {
                    filterData = sortAlpha(filterData, false);
                }
            }

            let rows = getRows(filterData);

            return {
                title: `${category} | Funkoshop`,
                submenu_data: await getCategorysFromDB(),
                form_path: `/category/${category}`,
                cart_number: session.cart ? session.cart.length : 0,
                query: query,
                data: getShopItemsFormat(filterData, rows)
            }
        } else {
            let rows = getRows(itemsData);

            return {
                title: `${category} | Funkoshop`,
                submenu_data: await getCategorysFromDB(),
                form_path: `/category/${category}`,
                cart_number: session.cart ? session.cart.length : 0,
                query: {},
                data: getShopItemsFormat(itemsData, rows)
            }
        }

    } catch (error) {
        console.log('Se produjo un error al conseguir los datos: ', error);

        throw error;
    }
}



/* Devuelve los parametros de carga de la pagina shop/collection, dependiendo si hay o no querys del
    form. Si hay querys, filtra los datos correspondientes segun las opciones del form
*/
export const shopCollectionModel = async (collection, query, session) => {
    try {
        let itemsData = await getItemsByParams({ license_name: collection });

        if (query.search != undefined) {
            let filterData = itemsData;

            if (query.search != "") {
                filterData = filterBySearch(filterData, query.search);
            }

            if (query.min != undefined && query.max != undefined && query.min != 0 && query.max != 0) {
                filterData = filterByPrice(filterData, query.min, query.max);
            }

            if (query.order != undefined && query.order != "") {
                let order = query.order;

                if (order == 'mayor') {
                    filterData = sortByPrice(filterData, false);
                }

                if (order == 'menor') {
                    filterData = sortByPrice(filterData);
                }

                if (order == 'az') {
                    filterData = sortAlpha(filterData);
                }

                if (order == 'za') {
                    filterData = sortAlpha(filterData, false);
                }
            }

            let rows = getRows(filterData);

            return {
                title: `${collection} | Funkoshop`,
                submenu_data: await getCategorysFromDB(),
                form_path: `/collection/${collection}`,
                cart_number: session.cart ? session.cart.length : 0,
                query: query,
                data: getShopItemsFormat(filterData, rows)
            }
        } else {
            let rows = getRows(itemsData);

            return {
                title: `${collection} | Funkoshop`,
                submenu_data: await getCategorysFromDB(),
                form_path: `/collection/${collection}`,
                cart_number: session.cart ? session.cart.length : 0,
                query: {},
                data: getShopItemsFormat(itemsData, rows)
            }
        }

    } catch (error) {
        console.log('Se produjo un error al conseguir los datos: ', error);

        throw error;
    }
}



/* Devuelve los parametros de carga de la pagina shop/item
*/
export const itemModel = async (id, session) => {
    try {
        let [itemData] = await getItemsByParams({ product_id: id });

        return {
            title: `${itemData.product_name} | Funkoshop`,
            submenu_data: await getCategorysFromDB(),
            item: itemData,
            item_quantity: 1,
            cart_number: session.cart ? session.cart.length : 0,
            slider_title: 'productos relacionados',
            slider_items: await getRelatedItems(itemData)
        }

    } catch (error) {
        console.log('Se produjo un error al conseguir los datos: ', error);

        throw error;
    }
}



/* Devuelve los parametros de carga de la pagina shop/item despues de agregar
    un item al carrito
*/
export const addItemModel = async (id, body, session) => {
    try {
        let [itemData] = await getItemsByParams({ product_id: id });
        let stock = itemData.stock;
        let addedQuantity = Number(body.quantity);

        if (stock - addedQuantity > 0) {
            session.cart = session.cart || [];

            let index = session.cart.findIndex(item => item.product_id == id);

            if (index != -1) {
                session.cart[index].quantity += addedQuantity;

            } else {
                session.cart.push({ product_id: itemData.product_id, quantity: addedQuantity });

            }

        } else {

        }

        return {
            title: `${itemData.product_name} | Funkoshop`,
            submenu_data: await getCategorysFromDB(),
            item: itemData,
            item_quantity: addedQuantity,
            cart_number: session.cart.length,
            slider_title: 'productos relacionados',
            slider_items: await getRelatedItems(itemData)
        }

    } catch (error) {
        console.log('Se produjo un error al conseguir los datos: ', error);

        throw error;
    }
}

