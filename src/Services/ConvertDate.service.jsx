const ConvertDate = (date) => {
    const splitedDate = date.split('-');
    return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`
}

export default ConvertDate;