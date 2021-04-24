const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    nombreTarea: {
        type: String,
        require: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado:{
        type: Date,
        default: Date.now()
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto',
        require: true
    }
});

module.exports = mongoose.model('tarea',TareaSchema);