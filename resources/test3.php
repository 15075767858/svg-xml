<?php
$dir="devsinfo";
$file=scandir($dir);
$str ="";
echo "[";
foreach ($file as $value) {
 $str.= "'".$value."',";
}
echo substr($str,0,strlen($str)-1);
echo "]";
 ?>
