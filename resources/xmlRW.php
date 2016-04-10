<?php  
$fn=$_POST['fileName'];
$rw=$_POST['rw'];

if($rw=='r'){
    $fp = fopen($fn, 'r');
    while(! feof($fp))
{ 
echo fgets($fp); 
} 
}else{
$content=$_POST["content"];
    echo "aaaaaaaaaa";
    $fp = fopen($fn, 'w') or die("Unable to open file!");
    fwrite($fp, $content);
fclose($fp);
}
?>