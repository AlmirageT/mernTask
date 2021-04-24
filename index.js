const express = require('express');
const conectarDB = require('./config/db');
//importar cors
const cors = require('cors');
// crear el servidor 
const app = express();

//conectar a la bd
conectarDB();

//habilitar cors
app.use(cors());
// habilitar express.json
app.use(express.json({ extended: true }));

//crear puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//definir la pagina principal
/*
app.get('/', (req, res) => {
    res.send("hola mundo");
}); */

app.listen(PORT, () => {
    console.log(`el servidor esta corriendo en el puerto ${PORT}`);
});