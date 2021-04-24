const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async(req, res) => {
    //revisar se i hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errores:errors.array()});
    }

    //extraer el email y password
    const { emailUsuario, password } = req.body;

    try {
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({emailUsuario});
        if(!usuario){
            return res.status(400).json({ msg:'El usuario no existe' });
        }
        //revisar el password
        const passCorrecto = await bcryptjs.compare(password,usuario.password);
        if(!passCorrecto){
            return res.status(400).json({ msg:'La pass es incorrecta' });
        }
        //si todo es correcto
        //crear y firmar el jwrt
        const payload = {
            usuario:{
                id: usuario.id
            }
        };
        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;
            //mensaje de confirmacion
            res.json({ token: token });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.usuarioAutenticado = async(req, res) => {

    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500),json({msg: 'Hubo un error'});
    }
}