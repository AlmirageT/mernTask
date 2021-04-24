const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombreProyecto:{
        type: String,
        require: true,
        trim: true
    },
    creadorProyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Proyecto',ProyectoSchema);