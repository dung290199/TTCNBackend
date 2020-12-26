const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, process.env.JWT_SECRECT, (err, decoded) => {
            if (err) {
                return res.status(401).send({ msg: "Invalid token!" });
            }
            req.user = decoded;
            next();
            return;
        })
    }
    return res.writeHead(401).write("Token is not supplied!");
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg: "Admin's token is not valid!"});
}

const getToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRECT,
        {
            expiresIn: "24h"
        }
    );
}

module.exports = {
    getToken, isAuth, isAdmin
}