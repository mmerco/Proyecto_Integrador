import pool from '../config/conn.js'




/* Relaciona los datos de las tablas Product y License y devuelve todos
    los items en orden aleatorio
*/
export const getAllItemsFromDB = async () => {
    try {
        let [rows] = await pool.query(
            'SELECT * FROM product ' +
            'INNER JOIN license ' +
            'ON product.license_id = license.license_id ' +
            'ORDER BY RAND()'
        );

        return rows;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }
}



/* Relaciona los datos de las tablas Product, License y Category y devuelve 
    los items que cumplan el parametro pasado
*/
export const getItemsByParamsFromDB = async (params) => {
    try {
        let [rows] = await pool.query(
            'SELECT * FROM product ' +
            'INNER JOIN license ' +
            'ON product.license_id = license.license_id ' +
            'INNER JOIN category ' +
            'ON product.category_id = category.category_id ' +
            'WHERE ?', params
        );

        return rows;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }

}



/* Inserta un item en la tabla product con los datos tomados del formulario de
    create
*/
export const createItemIntoDB = async (formData) => {
    try {
        let [resultData] = await pool.query(
            'INSERT INTO product ' +
            'SET ?', formData
        );

        return resultData;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }
}



/* Edita el item con id pasado como parametro en la tabla product.
    Se cargan los nuevos datos pasados como parametro desde el form edit
*/
export const editItemFromDB = async (params, formData) => {
    try {
        await pool.query(
            'UPDATE product ' +
            'SET ? ' +
            'WHERE ? ', [formData, params]
        );

        return true;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }
}



/* Elimina el item con id pasado como parametro de tabla product.
*/
export const deleteItemFromDB = async (params) => {
    try {
        await pool.query(
            'DELETE FROM product ' +
            'WHERE ? ', params
        );

        return true;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }
}