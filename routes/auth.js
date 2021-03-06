//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//crear un usuario
// api/auth
router.post('/',
    [
        check('emailUsuario','Agrega un email valido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})

    ], 
    authController.autenticarUsuario
);

// 
router.get('/', 
    auth,
    authController.usuarioAutenticado
)
module.exports = router;
