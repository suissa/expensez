// BIBLIOTECAS
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

// CONTROLLERS
const entradaController = require('./controllers/entrada-controller');

// CONFIGURAÇÃO
const app = express();
const PORT = process.env.PORT || 8080;
config.configure();

mongoose.connect(process.env.MONGODB_CONNECTION);

app.use(bodyParser.json());

// CONFIGURAÇÃO DAS ROTAS
app.get('/api/entrada', function(req, res){

    entradaController.find(req.query, (err, entradas) => {

        if(err){
            console.error(err);
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(200)
                .json(entradas);
        }

        
    });
    
});

app.post('/api/entrada', (req, res) => {

    entradaController.create(req.body, function(err, entrada){

        if(err){
            console.error(err);
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(200)
                .json(entrada);
        }

        
    });
    
});


// INICIALIZAÇÃO DO SERVIDOR
app.listen(PORT, function(){

   console.log('Escutando porta: '+ PORT);

});
