<?php
$dir="devsinfo";
$file=scandir($dir);
$str ="";
echo "[";
foreach ($file as $value) {
	if(strlen($value)==4||$value=='local'){
		$str.= "'".$value."',";
	}
}
echo substr($str,0,strlen($str)-1);
echo "]";
?>
