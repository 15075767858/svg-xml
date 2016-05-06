<?php
$par = $_GET["par"];
$ip=$_SERVER["SERVER_ADDR"];
$redis = new Redis();
if($ip=="192.168.1.88"){
$redis->connect("192.168.253.253", 6379);
}else{
$redis->connect($ip, 6379);
}
$pv = current($redis->hmGet('Send_File', Array("Present_Value")));
if($par=="filePublish"){
$key=$_GET["key"];
$value=$_GET["value"];
if($pv=="1"){
$redis->publish($key,$value);
echo $pv;
}else{
	echo $pv;
}
}
if($par=="devPublish"){
$key=$_GET["key"];
$value=$_GET["value"];
echo $redis->publish($key,$value);
}



?>