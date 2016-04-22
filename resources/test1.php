<?php
$par=$_GET["par"];
$redis = new Redis();
$redis->connect("192.168.253.253", 6379);
$arList = $redis->keys("*");
if($par=="nodes"){
	echo "[";
	$str ="";
	foreach ($arList as $value) {
		$value = "$value";
		$Object_Name =$redis->hGet($value, 'Object_Name');
		if(strlen($value)==7){
			$str.= '{leaf: true, text :"'. $Object_Name.'",value:"'.$value.'"},';
		}
	};
	echo substr($str,0,strlen($str)-1);
	echo "]";
}
if($par=="dev"){
	echo "[";
	$str ="";
	foreach ($arList as $value) {
		$value = "$value";
		if(strlen($value)==7){
			$str.= $value.',';
		}
	};
	echo substr($str,0,strlen($str)-1);
	echo "]";
}
	//$fn=$_POST['fileName'];
//$rw=$_POST['rw'];
?>