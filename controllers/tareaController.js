const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

// crea una nueva tarea
exports.crearTarea = async(req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errores:errors.array()});
    }

    // extraer proyecto y comprobar si existe


    try {
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //revisar el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creadorProyecto.toString() !== req.usuario.id){
            return res.status(401).json({ msg:'No autorizado' });
        }

        //creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//obtiene las tareas por proyecto
exports.obtenerTreas = async(req, res) => {
    try {
        const { proyecto } = req.query;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //revisar el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creadorProyecto.toString() !== req.usuario.id){
            return res.status(401).json({ msg:'No autorizado' });
        }

        //obtener tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({ _id: -1 });
        res.json({tareas});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//actualizar tareas
exports.actualizarTarea = async(req, res) => {
    try {
        const { proyecto, nombreTarea, estado } = req.body;
        //revisar si la tarea existe o no
        let tareaExiste = await Tarea.findById(req.params.id);
        if(!tareaExiste){
            return res.status(404).json({ msg:'Tarea no encontrada' });
        }
        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //revisar el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creadorProyecto.toString() !== req.usuario.id){
            return res.status(401).json({ msg:'No autorizado' });
        }

        

        //crear un objeto con nuevo informacion 
        const nuevaTarea = {};
        nuevaTarea.nombreTarea = nombreTarea;
        nuevaTarea.estado = estado;
        tareaExiste = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {new: true});

        res.json({tareaExiste});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//eliminar tarea
exports.eliminarTarea = async(req, res) => {
    try {
        const { proyecto } = req.query;
        //revisar si la tarea existe o no
        let tareaExiste = await Tarea.findById(req.params.id);
        if(!tareaExiste){
            return res.status(404).json({ msg:'Tarea no encontrada' });
        }
        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //revisar el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creadorProyecto.toString() !== req.usuario.id){
            return res.status(401).json({ msg:'No autorizado' });
        }
        //eliminar 
        await Tarea.findOneAndRemove({ _id: req.params.id });
        return res.json({ msg:'Tarea Eliminada' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}