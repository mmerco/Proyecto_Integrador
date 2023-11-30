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