<?php  
$fn=$_POST['fileName'];
$rw=$_POST['rw'];
chmod($fn,0777);
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
	echo file_put_contents($fn,$content);
	//$fp = fopen($fn, 'w') or die("Unable to open file!");
	//fwrite($fp, $content);
	//fclose($fp);
}
chmod($fn,0777);
?>