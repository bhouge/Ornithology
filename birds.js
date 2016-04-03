var app = require('express')();
var fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var directoryPrefix = '/sounds/compressed/';
var folderNameArray = ['Ben', 
            		 'Clais', 
            		 'Rebecca', 
            		 'Jon',
            		 'Francisco',
            		 'Lori'];

var latestControlPhrase = 0;
//checkpoints are as follows:
// 1-5, 6-7, 8-13, 14-19, 20-21, 22-24, 25, 26-27, (28, 29)
var checkpointPhrases = [0, 5, 7, 13, 19, 21, 24, 25, 27, 28, 29, 9999];

app.get('/', function(req, res){
	  res.sendFile(__dirname + '/birdindex2.html');
});

app.get('/score', function(req, res){
	res.sendFile(__dirname + '/chirpscore.html');
});

app.get('/controller', function(req, res){
	res.sendFile(__dirname + '/chirpcommand.html');
});

app.get('/control', function(req, res){
	res.sendFile(__dirname + '/birdcommand4.html');
});

app.get(/^(.*)$/, function(req, res){
	//console.log(req.params[0]);
	res.sendFile(__dirname + req.params[0]);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
		console.log('user disconnected');
  });
  socket.on('control message', function(msg){
	  console.log('control message: ' + msg);
	  //why did I think I shouldn't do this if the message hadn't changed?
	  //I don't think that wastes anything, and it helps for rehearsal and resetting...
	  latestControlPhrase = msg;
	  for (phrase in checkpointPhrases) {
		  //console.log("am I doing this right?" + checkpointPhrases[phrase]);
		  if (checkpointPhrases[phrase] == latestControlPhrase) {
			  if (checkpointPhrases.length > phrase) {
				  io.emit('new checkpoint', checkpointPhrases[parseInt(phrase, 10) + 1]);
			  }
			  console.log("moving on to the next checkpoint: " + checkpointPhrases[parseInt(phrase, 10) + 1]);
			  break;
		  }
	  }
	  //if (msg != latestControlPhrase) {    }
	  io.emit('control message', msg);
  });
  socket.on('checkpoint', function(msg){
	  //the rule is that no one can proceed past a checkpoint until I do...
	  //io.emit('control message', msg);
	  console.log('checkpoint: ' + msg);
  });
  socket.on('message', function(msg){
	    io.emit('message', msg);
	    console.log('message: ' + msg);
  });
  socket.on('make dir', function(msg){
	  //io.emit('chat message', msg);
	  fs.mkdir(msg, function(err) {
		  if(err) {
			  console.log("FOOL! " + err);
		  } else {
			  console.log('new directory: ' + msg);
		  }
	  });
  });
  socket.on('post audio', function(msg){
	  console.log(Date.now());
	  //io.emit('chat message', msg);
	  // + "/Birds" + currentPoemLine + ".wav"
	  var birdFileName = msg[1] + "/Birds" + msg[2] + ".wav";
	  fs.writeFile(birdFileName, msg[0], 'base64', function(err) {
		  if(err) {
			  console.log("FOOL! " + err);
		  } else {
			  console.log(Date.now());
			  console.log('posting file ' + birdFileName);
			  //loadSound(msg[2], socket);
			  //io.emit('chat message', msg[2]);
		  }
	  });
	  //console.log('posting file...');
  });
  socket.emit('audio', { audio: true, buffer: F176Hz, index: 0 });
  
  // we start at 1, because line 0 in our text array is the title of the poem (no audio required)
  
  for (var i = 1; i <= 27; i++) {
		var randomFolder = folderNameArray[Math.floor(Math.random() * folderNameArray.length)];
		var fileToPush = __dirname + directoryPrefix + randomFolder + '/Birds' + i + '.mp3';
		pushSoundToClient(fileToPush, i, socket);
  }
});

function pushSoundToClient(filename, bufferIndex, socket) {
	console.log('Pushing ' + filename + ' to buffer index ' + bufferIndex + ' on socket ' + socket);
	fs.readFile(filename, function(err, buf){
		if (err) {
			console.log("FOOL! " + err);
		} else {
			//console.log('audio index:' + bufferIndex);
		    socket.emit('audio', { audio: true, buffer: buf, index: bufferIndex });
		}
	});
}

var F176Hz;
var fileToRead = __dirname + '/sounds/yooo.mp3';
fs.readFile(fileToRead, function(err, buf){
	// loading pitch reference/test file
	if (err) {
		console.log("FOOL! " + err);
	} else {
		F176Hz = buf;
		console.log('pitch reference loaded');
	}
});

// is it possible that we could start listening and someone could connect before F176Hz is loaded?
http.listen(8100, function(){
  console.log('listening on *:8100');
});

