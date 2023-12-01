import pool from "../config/conn.js";




/* Relaciona los datos de las tablas Product y License y busca en el nombre,
    la licencia y el codigo la palabra pasada como parametro de busqueda
*/
export const adminSearchFromDB = async (searchValue) => {
    try {
        searchValue = `%${searchValue}%`;

        let [rows] = await pool.query(
            'SELECT * FROM product ' +
            'INNER JOIN license ' +
            'ON product.license_id = license.license_id ' +
            'WHERE product_name LIKE ? ' +
            'OR license_name LIKE ? ' +
            'OR sku LIKE ?', [searchValue, searchValue, searchValue]
        );

        return rows;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }
}




/* Trae de la tabla product la columna dues y agrupa los distintos valores que hay en la columna.
    Devuelve el listado de valores de cuotas de la tabla en orden
*/
export const getDuesFromDB = async () => {
    try {
        let [rows] = await pool.query(
            'SELECT dues FROM product ' +
            'GROUP BY dues ' +
            'ORDER BY dues'
        );

        return rows;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }

}
