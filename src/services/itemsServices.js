import { pool } from 'mysql2/promise'



export const getAllItemsFromDB = async () => {
    try {
        let [rows] = await pool.query('SELECT * FROM product');

        return rows;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }

}


export const getItemsFromDB = async (params) => {
    try {
        let [rows] = await pool.query('SELECT * FROM product WHERE ?', params);

        return rows;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }

}