<?php
//print_r($_FILES);
// get the temporary name that PHP gave to the uploaded file
//$tmp_filename=$_FILES["that_random_filename.wav"]["tmp_name"];
//$tellme=array_keys($_FILES["birdAudio"])[6];
$tellme=$_FILES["birdAudio"]["name"];
// 4 is size
$tmp_filename=$_FILES["birdAudio"]["tmp_name"];
// rename the temporary file (because PHP deletes the file as soon as it's done with it)
//rename($tmp_filename, "/tmp/uploaded_audio.wav");
rename($tmp_filename, $_FILES["birdAudio"]["name"]);
echo $_FILES["birdAudio"]["name"];
//chmod("/tmp/uploaded_audio.wav", 0755);
chmod("Birds1.wav", 0755);
$messageOfDespair = "Don't even know if this would continue if I have an error";
$logFile = fopen('despairLog.txt','w') or die("can't open file");
fwrite($logFile, "Some news for you: " . $tellme);
fclose($logFile);
?>