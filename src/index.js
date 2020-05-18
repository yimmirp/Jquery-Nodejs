const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require("path");

//settings
app.set("port", process.env.port || 3000);


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));




app.use(express.static(path.join(__dirname, 'views')));
console.log(path.join(__dirname, '../..'));

app.post('/compilar', (req, res) => {
    const { code, title } = req.body;
    console.log(code, title);
    res.json({
        code3D: `var t1,t2;
var Stack[];
var Heap[];
var P = 0;
var H = 0;
if(2 < 3) goto L1;
goto L2;
L1:
t1=5+0;
print("%i" , t1);
goto L3;
L2:
t2=10*1;
print("%i" , t2);
L3:`,
        Console: 'Archivo compilado Exitosamente',
        Errores: 'Error encontrado en la X linea',
        Reportes: 'Report show in UI'
    })
})

app.post('/mirilla', (req, res) => {
    const { code } = req.body;
    console.log('mirillaroute')
    console.log(code);
    res.json({
        code3D: `var t1,t2;
var Stack[];
var Heap[];
var P = 0;
var H = 0;
if(2 < 3) goto L1;
goto L2;
L1:`,
        Console: 'Archivo compilado Exitosamente',
        Errores: 'Error encontrado en la X linea',
        Reportes: 'Report show in UI'
    })

})



app.post('/bloques', (req, res) => {

    const { code } = req.body;
    console.log('mirillaroute')
    console.log(code);
    res.json({
        code3D: `var t1,t2;
var Stack[];
var Heap[];`,
        Console: 'Archivo compilado Exitosamente',
        Errores: 'Error encontrado en la X linea',
        Reportes: 'Report show in UI'
    })
})

//run
app.listen(app.get("port"), () => {
    console.log('Server running');
})