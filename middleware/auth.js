const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //leer token del header
    const token = req.header('x-auth-token');
    console.log(token);
    //revisar si no hay token 
    if(!token){
        res.status(401).json({ msg: 'No hay token, permiso no valido' })
    }

    //validar token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        if(!cifrado){
            res.status(401).json({ msg: 'No hay token, permiso no valido' })
        }
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg:'No valido'});
    }
}