<?php  
$fn=$_POST['fileName'];
$rw=$_POST['rw'];

//if($rw=='d'){
//echo unlink($fn)
//return ;
//}
if($rw=='r'){
    $isFile=file_exists($fn);
if($isFile==false){
echo "null";
return ;
}
	
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