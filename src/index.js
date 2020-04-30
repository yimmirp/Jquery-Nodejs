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



//run
app.listen(app.get("port"), () => {
    console.log('Server running');
})