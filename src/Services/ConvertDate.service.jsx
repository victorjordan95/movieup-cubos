/**
 * Return the date in the 'dd/MM/yyyy' format.
 * @param {String} date Date with US format.
 */
const ConvertDate = (date) => {
    if (!date) {
        return '-'
    }
    const splitedDate = date.split('-');
    return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`
}

export default ConvertDate;