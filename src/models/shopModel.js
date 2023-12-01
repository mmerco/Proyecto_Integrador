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


export const capitalize = (text) => {

    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}

