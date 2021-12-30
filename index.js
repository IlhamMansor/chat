const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require("ws");
const ejs = require("ejs")

app.set('view engine', 'ejs');
const port = process.env.PORT || 8080;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

server.listen(port, function() {
    console.log(`listening on ${port}`);
})

app.get('/', (req,res) => {
    res.render('index');
})

app.listen(5000, () =>{
    console.log('listening on port 5000');
});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        // console.log('received: %s', data);
        wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      })
    });
});
