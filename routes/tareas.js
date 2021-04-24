//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//api/tareas
router.post('/',
    auth,
    [
        check('nombreTarea','El nombre es obligatorio').not().isEmpty(),
        check('proyecto','El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//obtener ¿tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTreas
);

// actualizar tareas
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);

//eliminar una tarea 
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router;