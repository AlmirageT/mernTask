const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombreUsuario:{
        type: String,
        require: true,
        trim: true
    },
    emailUsuario:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
        trim: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Usuario',UsuariosSchema);