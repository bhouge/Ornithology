/**
 * BirdRecorder.js
 */

var source;
var recorder;
var recordings = [];
var recording = false;

var directoryPrefix = "sounds/uncompressed/";
var userPrefix;

function startUserMedia() {
	navigator.getUserMedia = (navigator.getUserMedia ||
	        navigator.webkitGetUserMedia ||
	        navigator.mozGetUserMedia ||
	        navigator.msGetUserMedia);

	if (navigator.getUserMedia) {
		navigator.getUserMedia(
		// constraints
		{ video: false, audio: true },
		// successCallback
		startUserStream,
		// errorCallback
		function(err) {
			console.log("The following error occured: " + err);
		});
	} else {
		console.log("getUserMedia not supported");
	};
}

function startUserStream(stream) {
	source = audioCtx.createMediaStreamSource(stream);
	recorder = new Recorder(source);
	userPrefix = window.prompt("Enter a user name!");
	makeNewBirdDirectory(userPrefix);
}

function getBufferCallback(buffers) {
	//var newSource = audioCtx.createBufferSource();
	var newBuffer = audioCtx.createBuffer(2, buffers[0].length, audioCtx.sampleRate);
	newBuffer.getChannelData(0).set(buffers[0]);
	newBuffer.getChannelData(1).set(buffers[1]);
	recordings.push(newBuffer);
	recorder && recorder.exportWAV(function(blob) {
		postAudio(blob);
    });
}

function postAudio(blob) {
	var xhr;
	
	try{
		// Opera 8.0+, Firefox, Safari
		xhr = new XMLHttpRequest();
	} catch(e) {
		// Internet Explorer Browsers
		try{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				// Not supported
				alert("There appears to be a problem with your browser.");
				return false;
			}
		}
	}

	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4){
			//alert(xhr.responseText);
			var birdIndex = xhr.responseText.match("Birds(.*)\.wav")[1];
			birdCues["cue" + birdIndex] = "on";
			//alert(birdCues["cue" + birdIndex]);
			updateCues();
			// This is your notification that the file has actually successfully uploaded
			// So this is where you should update your cues.json file to tell audience members to download
		}
	}
	
	var fd = new FormData();
	//alert(blob);
	fd.append("birdAudio", blob, "Birds" + currentPoemLine + ".wav");
	fd.append("folder", directoryPrefix + userPrefix);
	xhr.open("POST","BirdRecorder.php",true);
	xhr.send(fd);
	
	recorder.clear();
}


function makeNewBirdDirectory(audioPrefix){
	var xhr;
	
	// try a bunch of different versions of the object to support different browsers
	try{
		// Opera 8.0+, Firefox, Safari
		xhr = new XMLHttpRequest();
	} catch(e) {
		// Internet Explorer Browsers
		try{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				// Something went wrong
				alert("There appears to be a problem with your browser.");
				return false;
			}
		}
	}
	
	// turn the object into a JSON string
	//var json = JSON.stringify(birdCues);
	//var json = JSON.stringify(birdCues);
	// compress it from a "binary string" to 64bit ASCII
	// note how the php file does the inverse
	//var encoded = btoa(json);
	
	
	// note that here we're using "POST" instead of "GET", which is what the index.html file uses
	xhr.open("POST", "BirdDirectory.php", true);
	// set the content type
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	// prepend "var=" for the php script; see how it parses data it receives based on this prefix
	xhr.send('var=' + directoryPrefix + audioPrefix + "/");
}

function startRecordingAudio() {
	recorder.record();
}

function stopGetAndPostAudio() {
	recorder.stop();
	recorder.getBuffer(getBufferCallback);
}

function cancelAudioRecording() {
	recorder.stop();
	recorder.clear();
}

function playRandomAudioBuffer() {
	var newSource = audioCtx.createBufferSource();
	var newIndex = Math.floor(Math.random() * recordings.length);
	newSource.buffer = recordings[newIndex];
	newSource.connect(audioCtx.destination);
	newSource.start();
}