var express = require('express')
var app = express();
var router = express.Router();


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

module.exports = router;
