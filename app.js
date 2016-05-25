var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var nicknames=[];



app.get('/', function(req,res){
	res.sendfile(__dirname + '/index.html');
});
io.sockets.on('connection', function(socket){
   socket.on('new user', function(data,callback){
   	if(nicknames.indexOf(data)!=-1){
   		callback(false);
   	}else{
   		socket.nicename=data;
   		nicknames.push(socket.nickname);
   		io.sockets.emit('usernames', nicknames);
   	}
   });


  socket.on('send message', function(data){
  	io.sockets.emit('new message', data);
  	//socket.broadcast.emit('new message',data);

  });

});

server.listen(3000);
console.log("running at 3000");