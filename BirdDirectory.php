<?php
$newDirName = $_POST['var'];
mkdir($newDirName, 0777, true);
chmod($newDirName, 0777);
?>