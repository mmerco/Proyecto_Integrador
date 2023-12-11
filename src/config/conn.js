import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config();


const pool = createPool({
    host: 'localhost' || process.env.DB_HOST,
    user: 'root' || process.env.DB_USER,
    password: 'rootpass' || process.env.DB_PASSWORD,
    database: 'Funkoshop' || process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});


pool.getConnection()
    .then(connection => {
        console.log('Conexión exitosa a la base de datos');
        connection.release();
    })
    .catch(err => {
        console.log('Se produjo un error de conexión con la base de datos: ', err);
    });


export default pool