<?php
if(isset($_GET["fname"])){
$fname = $_GET["fname"]; 
}else{
	return;
}
$redis = new Redis();
$redis->connect("192.168.253.253", 6379);
$pv = current($redis->hmGet('Send_File', Array("Present_Value")));
if($pv=="1"){
$redis->publish("9999.8.*","9999998\r\nPresent_Value\r\n".$fname);
echo $pv;
}else{
echo $pv;
}
?>