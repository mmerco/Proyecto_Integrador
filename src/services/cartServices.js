import pool from "../config/conn.js";




const getCartDataFromDB = async (cart) => {
    try {
        /* Crea una cadena de '?, ?, ?' con tantos ? como items hay en el carrito,
            para pasarlo a la consulta de la base de datos y que tome un ? por cada
            item pasado en el carrito.
        */
        let itemsQuantity = cart.map(() => '?').join(', ');

        /* Crea un nuevo array solo con los product_id de los items del carrito
            para pasar como parametro en la consulta a la base de datos
        */
        let itemsIds = cart.map(item => (item.product_id));

        let [rows] = await pool.query(
            'SELECT * FROM product ' +
            'INNER JOIN license ' +
            'ON product.license_id = license.license_id ' +
            `WHERE product_id IN (${itemsQuantity})`, itemsIds
        );

        cart.forEach((item, index) => {
            let quantity = Number(item.quantity);
            let price = Number(rows[index].price);
            let totalPrice = { total_price: parseFloat(quantity * price).toFixed(2) };

            /* Combina el item del carrito con los datos del producto en la base de datos
                y el precio total y queda todo junto guardado en el item del carrito
            */
            Object.assign(item, rows[index], totalPrice);

        });

        // Calcula el precio total del carrito
        let summary_total = cart.reduce(
            (acumulador, item) => acumulador += Number(item.total_price),
            0
        ).toFixed(2);

        summary_total = Number(summary_total).toLocaleString();

        // Calcula los items totales del carrito
        let summary_items = cart.reduce(
            (acumulador, item) => acumulador += item.quantity,
            0
        );

        let cart_summary = {
            items: summary_items,
            subtotal: summary_total,
            shipment: '0,00',
            total: summary_total
        };

        return [cart, cart_summary];

    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }
}


export default getCartDataFromDB;