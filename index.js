const express = require('express');
const http = require('http');
const WebSocket = require("ws");

const port = process.env.PORT || 8080;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

server.listen(port, function() {
    console.log(`listening on ${port}`);
})

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
