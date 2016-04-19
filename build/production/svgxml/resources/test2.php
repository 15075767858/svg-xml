<<?php 
$par=$_GET["par"];
$redis = new Redis();
  $redis->connect("127.0.0.1", 6379);
        $redis->publish("9999.8.*", $par);
 ?>
