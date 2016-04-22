<?php
if(isset($_GET["par"])){
//$fname = $_GET["fname"];
	//$dir="../../../";
	$dir="devsinfo";
	$file=scandir($dir);
	$str ="";
	echo "[";
	foreach ($file as $value) {
		//if(strlen($value)==4||$value=='local'){
			$str.= "'".$value."',";
		//}
	}
	echo substr($str,0,strlen($str)-1);
	echo "]";
//if(strlen($value)==4||$value=='local'){
}else{

	$dir="../../../";
	$file=scandir($dir);
	$str ="";
	echo "[";
	foreach ($file as $value) {
		if($value=='local.xml'){
			$str.= "'".'local'."',";
		}else if(strlen($value)==4 & is_numeric($value)){
			$str.= "'".$value."',";
		}
	}
	echo substr($str,0,strlen($str)-1);
	echo "]";
}

?>

