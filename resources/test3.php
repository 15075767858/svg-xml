<?php
if(isset($_GET["par"])){
	$dir="devsinfo";
	$file=scandir($dir);
	$str ="";
	echo "[";
	foreach ($file as $value) {
			$str.= "'".$value."',";
	}
	echo substr($str,0,strlen($str)-1);
	echo "]";
}else{
	$dir="../../../../";
	$file=scandir($dir);
	$str ="";
	echo "[";
	foreach ($file as $value) {
		if($value=='local.xml'){
		}else if(strlen($value)==4 & is_numeric($value)){
			$str.= "'".$value."',";
		}
	}
	echo substr($str,0,strlen($str)-1);
	echo "]";
}
?>