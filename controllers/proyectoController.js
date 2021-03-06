const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async(req, res) => {

    //revisar si hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errores:errors.array()});
    }
    try {
        //crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        //guardar ek creador via json webtoken
        proyecto.creadorProyecto = req.usuario.id;
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

//obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async(req, res) => {
    try {
        const proyectos = await Proyecto.find({ creadorProyecto:req.usuario.id });
        res.json({ proyectos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//actualizar proyecto
exports.actualizarProyecto = async(req, res) => {
    //revisar si hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errores:errors.array()});
    }
    //extraer la informqacion del proyecto
    const { nombreProyecto } = req.body;
    const nuevoProyecto = {};

    if(nombreProyecto){
        nuevoProyecto.nombreProyecto = nombreProyecto;
    }

    try {
        //revisar el id 
        let proyecto = await Proyecto.findById(req.params.id);
        //si el proyecto existe o no

        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }
        //verificar el creador dle proeycto

        if(proyecto.creadorProyecto.toString() !== req.usuario.id){
            return res.status(401).json({ msg:'No autorizado' });
        }

        //actualizar
        proyecto = await Proyecto.findByIdAndUpdate({ _id:req.params.id }, 
            { $set:nuevoProyecto },{ new:true });
        res.json({ proyecto });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
//elimina un proyecto por su id
exports.eliminarProyecto = async(req, res) => {
    try {
        //revisar el id 
        let proyecto = await Proyecto.findById(req.params.id);
        //si el proyecto existe o no

        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }
        //verificar el creador dle proeycto

        if(proyecto.creadorProyecto.toString() !== req.usuario.id){
            return res.status(401).json({ msg:'No autorizado' });
        }

        //actualizar
        await Proyecto.findOneAndRemove( {_id: req.params.id});
        res.json({ msg: 'Proyecto eliminado' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}