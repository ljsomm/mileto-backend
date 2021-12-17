const jwt = require('jsonwebtoken');

module.exports = {
    authorization: (req, res, next) => {
        const { token } = req.headers;
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({err: 'Token inválido'});
            }
            const { id } = decoded;
            req.headers.id = id;
            next();
        });
    }
}