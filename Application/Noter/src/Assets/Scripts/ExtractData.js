/**
 * Extracts data from an object based on a given path.
 * @param {object} data - The object to extract data from.
 * @param {string} path - The path to the desired data, using dot notation.
 * @returns {*} - The extracted data.
 */
function ExtractData(data, path) {
    const properties = path.split(".");

    let res = data;
    for (let i = 0; i < properties.length; i++) {
        if (properties[i]) res = res && res[properties[i]];
    }

    //console.log(res);

    return res;
}

export default ExtractData;
