const getLocalDate = (date=new Date()) => { // get indian time
    date = new Date(date)
    date = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return date
}

const getFormatDate = (date=new Date()) => {
    date = getLocalDate(date)
    return new Date(new Date(date).toJSON().split('T')[0]); // get time like 2023-01-28T00:00:00.000Z
};

module.exports = {
    getFormatDate,
    getLocalDate
}