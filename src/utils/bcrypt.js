const bcrypt = require('bcrypt')

const hash = async(value) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash( value, salt)
}

const compare = async(value, hashValue)=>{
    console.log(value, hashValue);
    return await bcrypt.compare(value, hashValue)
}

module.exports = {
    hash,
    compare
}