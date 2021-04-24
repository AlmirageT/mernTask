//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//crear proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombreProyecto','El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);
//obtener todos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);
//actualizar proyecto
router.put('/:id',
    auth,
    [
        check('nombreProyecto','El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);
//eliminar proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);
module.exports = router;
