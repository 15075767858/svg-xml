<?php  
$fn=$_POST['fileName'];
$rw=$_POST['rw'];

$fn="../1000";
$rw="r";

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
	$fp = fopen($fn, 'w') or die("Unable to open file!");
	fwrite($fp, $content);
	fclose($fp);
}
?>