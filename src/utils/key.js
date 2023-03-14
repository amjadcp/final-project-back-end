const jwt = require("jsonwebtoken");

const signAccessKey = (payload, secretKey) => {
    const token = jwt.sign({
        ...payload
    }, secretKey, { expiresIn: '10d' });
    return token
}

const verifyAccessKey = (token, secretKey) => {
    try {
        const payload = jwt.verify(token, secretKey);
        return payload;
    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    signAccessKey,
    verifyAccessKey
}
