const express = require("express");
const app = express();
const port = 3000;
const routes = require("./src/routes/index");

//Midleware = funcion que se ejecuta antes que suceda algo.
app.use(express.json());

app.use(express.urlencoded({ extendd: true }));
app.use("/", routes());
app.listen(port, () => console.log(`example app listening on port ${port}!`));
