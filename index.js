const express = require ("express");
const app = express();
const fs = require("fs");
const cors = require ("cors");

//nombre del server
app.listen(3000, console.log ("server running")); 


//para declarar un middleware y procesar facilmente los payloads
app.use(express.json());
app.use(cors());

//ruta para enviar backend al index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
    })


// Función para asegurarse de que el archivo de canciones existe y tiene un arreglo vacío si está vacío
const asegurarArchivoCanciones = () => {
    if (!fs.existsSync("./canciones.json")) {
        fs.writeFileSync("./canciones.json", JSON.stringify([]));
    }
    const canciones = JSON.parse(fs.readFileSync("./canciones.json"));
    return canciones;
};

//ruta de canciones
app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("./canciones.json"));
    res.json(canciones);
});




//Ruta para crear una cancion 

app.post("/canciones", (req, res) => {
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("./canciones.json"))
    canciones.push(cancion)
    fs.writeFileSync("./canciones.json", JSON.stringify(canciones, null, 3))
    res.send("cancion agregada con éxito!")
    })


//Ruta para editar una cancion 
app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("./canciones.json"))
    const index = canciones.findIndex(c => c.id == id)
    canciones [index] = cancion
    fs.writeFileSync("./canciones.json", JSON.stringify(canciones, null, 3))
    res.send("cancion editada con éxito")
    })        


//Ruta para eliminar una cancion 
app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync("./canciones.json"))
    const index = canciones.findIndex(c => c.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync("./canciones.json", JSON.stringify(canciones, null, 3))
    res.send("cancion eliminada con éxito")
    })

