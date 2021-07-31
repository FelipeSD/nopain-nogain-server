require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Seta as configurações do CORS. No caso, especifica que apenas conexões de tal
// endereço serão aceitas. Ver:
// https://expressjs.com/en/resources/middleware/cors.html
var corsOptions = {
    origin: "*"
};

// Ativa a configuração CORS
app.use(cors(corsOptions));

// Parseia requisições do tipo JSON - application/json
app.use(bodyParser.json());

// Parseia também requisições do tipo HTML - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Uma rota, aceitando conexões na raiz e retornando um json simples
app.get("/", (req, res) => {
    res.json({message: "Workout API!"});
});

require("./app/routes/client.routes")(app);
require("./app/routes/trainingSheet.routes")(app);

// "Executa" o servidor, escutando em uma porta específica.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está executando na porta ${PORT}.`);
});

const db = require("./app/models");
db
    .mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
    })
    .then(() => {
        console.log("Conectado ao banco de dados");
    })
    .catch(err => {
        console.log("Não foi possível conectar ao banco de dados", err);
        process.exit();
    });