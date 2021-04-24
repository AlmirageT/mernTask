//rutas para cusuarios

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

//crear un usuario
// api/usuarios
router.post('/',
    [
        check('nombreUsuario','El nombre es obligatior').not().isEmpty(),
        check('emailUsuario','Agrega un email valido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})

    ], 
    usuarioController.crearUsuario
);

module.exports = router;