const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection',(socket) => { // RECEBE UM EVENTO DE CONECXÃO DO OUTRO CORPO
   
   socket.on("disconnect", () => {
    console.log('Player Desconectado ' + socket.id)
   })
   
    socket.on('boasvindas', (data) => { // RECEBE UM EVENTO DO OUTRO CORPO
        console.log(data);
   })

   socket.on('textinput', (data) => { // RECEBE UM EVENTO DO OUTRO CORPO
    console.log(data);
    socket.broadcast.emit("resultado", data + " - " + socket.id); // EMITINDO UM EVENTO EM BROADCAST DO SERVIDOR PARA O CLIENTE
})
    // console.log(socket);
   // console.log(socket.id)
})


app.set('view engine', 'ejs');


app.get('/', (req,res) => {
    res.render('index.ejs')
})

http.listen(2000, () => {
    console.log('Rodando!.')
})