const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req, res) => {

    //revisar se i hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errores:errors.array()});
    }
    //extraer email y password
    const { emailUsuario, password } = req.body;

    try {
        let usuario = await Usuario.findOne({emailUsuario});

        if(usuario){
            res.status(400).json({ msg: 'El usuario ya existe' });
        }
        //crear usuario
        usuario = new Usuario(req.body);


        // hashear el pass
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        //guardar usuario
        await usuario.save();
        //crear y firmar el JWT
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