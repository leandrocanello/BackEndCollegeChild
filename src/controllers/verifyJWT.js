const jwtMethod = require('../config/jwt');

function verify(req, res, next) {
    let token = req.cookies.auth;
    
    if (!token) {
        return res.status(401).send('SEM AUTENTICACAO!!!!!!');
    }
    
    jwtMethod.verify(token)
        .then(decoded => {
            req.user = decoded; // Armazenar as informações decodificadas do token no objeto req
            next();
        })
        .catch(err => {
            return res.status(401).json({ message: 'TOKEN INVALIDO', error: err });
        });
}

module.exports.verify = verify;
