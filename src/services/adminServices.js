import pool from "../config/conn.js";



const adminSearchFromDB = async (searchValue) => {
    try {
        searchValue = `%${searchValue}%`;

        let [rows] = await pool.query(
            'SELECT * FROM product ' +
            'INNER JOIN license ' +
            'ON product.license_id = license.license_id ' +
            'WHERE product_name LIKE ? ' +
            'OR license_name LIKE ? ' +
            'OR sku LIKE ? ', [searchValue, searchValue, searchValue]
        );

        return rows;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }
}



export default adminSearchFromDB;