<?php
$par=$_GET["par"];
$redis = new Redis();
  $redis->connect("192.168.253.253", 6379);
        $redis->publish("9999.8.*","9999998\r\nPresent_Value\r\n".$par);

 ?>
