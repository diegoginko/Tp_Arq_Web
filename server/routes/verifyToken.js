const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    //Si no hay token deniego el acceso
    if (!token) return res.status(401).send('Acceso denegado');

    try {
        //Verifico que el token sea valido
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Token invalido');
    }
}