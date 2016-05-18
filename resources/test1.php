
<?php
$ip=$_SERVER["SERVER_ADDR"];
$par=$_GET["par"];
$redis = new Redis();
if($ip=="192.168.1.88"){
	$redis->connect("192.168.253.253", 6379);
}else{
	$redis->connect($ip, 6379);
}
$arList = $redis->keys("*");


if($par=="clear"){
	if(file_exists("/var/run/bac_client.pid")){
		$myfile = fopen("/var/run/bac_client.pid", "r");
		$jc = fgets($myfile);
		$test = "kill ".$jc;
		exec($test,$array);
	}
	if(file_exists("/var/run/bip_client.pid")){
		$myfile1 = fopen("/var/run/bip_client.pid", "r");
		$jc1 = fgets($myfile1);
		$test1 = "kill ".$jc1;
		exec($test1,$array1);
	}
	echo $redis->delete($arList);
}

if($par=="ScheduleConfig"){
	$nodeName=$_GET["nodename"];

	$Object_Name=$_GET["Object_Name"];
	$redis->hSet($nodeName,"Object_Name",$Object_Name);
	$redis->publish(substr($nodeName,0,4).".8.*",$nodeName."\r\n"."Object_Name"."\r\n".$Object_Name);
	$Present_Value=$_GET["Present_Value"];
	$redis->hSet($nodeName,"Present_Value",$Present_Value);
	$redis->publish(substr($nodeName,0,4).".8.*",$nodeName."\r\n"."Present_Value"."\r\n".$Present_Value);
	$Description=$_GET["Description"];
	$redis->hSet($nodeName,"Description",$Description);
	$redis->publish(substr($nodeName,0,4).".8.*",$nodeName."\r\n"."Description"."\r\n".$Description);
	$Priority_For_Writing=$_GET["Priority_For_Writing"];
	$redis->hSet($nodeName,"Priority_For_Writing",$Priority_For_Writing);
	$redis->publish(substr($nodeName,0,4).".8.*",$nodeName."\r\n"."Priority_For_Writing"."\r\n".$Priority_For_Writing);

	if(isset($_GET["after"])){
		$after=$_GET["after"];
		$value = '{"dateRange":	{"after":{'.dateToJson($after).'}}}';
		$redis->hSet($nodeName,"Effective_Period",$value);
		$redis->publish(substr($nodeName,0,4).".8.*",$nodeName."\r\n"."Effective_Period"."\r\n".$value);
		//dateToJson("after");

	}
	if(isset($_GET["front"])){
		$front=$_GET["front"];
		$value = '{"dateRange":	{"front":{'.dateToJson($front).'}}}';
		$redis->hSet($nodeName,"Effective_Period",$value);
		$redis->publish(substr($nodeName,0,4).".8.*",$nodeName."\r\n"."Effective_Period"."\r\n".$value);
	}
	if(isset($_GET["fromstart"])){
		$fromstart=$_GET["fromstart"];
		$fromend=$_GET["fromend"];
		$value='{"dateRange":{"startDate":{'.dateToJson($fromstart).'},"endDate":{'.dateToJson($fromend).'}}}';
		$redis->hSet($nodeName,"Effective_Period",$value);
		$redis->publish(substr($nodeName,0,4).".8.*",$nodeName."\r\n"."Effective_Period"."\r\n".$value);
	}
}
if($par=="getnullschedule"){
	$nodeName=$_GET["nodename"];
	$count=array("601","602","603","604","605","606","607","608","609","610");
	foreach ($count as $key => $value) {
		$is = $redis->exists($nodeName.$value);
		if(!$is){
			echo $nodeName.$value;
			return ;
		}
	}
	echo "null";
}

//http://127.0.0.1/svgxml/resources/test1.php?par=getvalue&nodename=1100&type=Object_Name

if($par=="getvalue"){
	$nodeName = $_GET["nodename"];
	$type=$_GET["type"];
	//echo "{type:'".$type."',value:'"."12313"."'}";
	echo $redis->hGet($nodeName,$type);
}

if($par=="changevaluenopublish"){
	$nodeName = $_GET["nodename"];
	$type=$_GET["type"];
	//$value=$_GET["value"];
	if(isset($_GET["value"])){
		$value=$_GET["value"];
	}
	if(isset($_POST["value"])){
		$value=$_POST["value"];
	}
	//echo "{type:'".$type."',value:'"."12313"."'}";
	echo $redis->hSet($nodeName,$type,$value);
}
if($par=="changevalue"){
	$nodeName = $_GET["nodename"];
	$type=$_GET["type"];
	if(isset($_GET["value"])){
		$value=$_GET["value"];
	}
	if(isset($_POST["value"])){
		$value=$_POST["value"];
	}
	//echo "{type:'".$type."',value:'"."12313"."'}";
	echo $redis->hSet($nodeName,$type,$value);
	$redis->publish(substr($nodeName,0,4).".8.*",$nodeName."\r\n".$type."\r\n".$value);
}
if($par=="schedule"){

	$str="";
	echo "[";
	$nodeName = $_GET["nodename"];
	foreach ($arList as $key => $value) {
		if(strlen($value)==7){
			$devName = substr($value,0,4);
			if(strcmp($devName,$nodeName)==0){
				//$dev= $redis->sIsMember($value, "Position");
				$dev= $redis->hGet($value,'Position');
				if($dev){
					$Object_Name =$redis->hGet($value, 'Object_Name');
					$str.= '{allowDrop: false, allowDrag: false,leaf: true, text :"'. $value.'",value:"'.$value.'"},';
				}
			}
		}
	}
	echo substr($str,0,strlen($str)-1);
	echo "]";
}
if($par=="node"){
	$nodeName=$_GET["nodename"];
	$sortarr=Array("Object_Identifier","Object_Name","Description","Priority_Array","Status_Flags","Max_Pres_Value","Min_pres_Value","High_Limit","Limit_Enable","COV_Increment","Event_Enable");
	$arList = $redis->hKeys($nodeName);
	$arr1=array_intersect($sortarr,$arList);
	$arr2=array_diff($arList,$sortarr);
	$arr3=array_merge($arr1,$arr2);


	$parameters=Array("Object_Name","Description","Present_Value","Max_Pres_Value","Min_pres_Value","High_Limit","Low_Limit","COV_Increment","Device_Type","Offset");
	$event=Array("Event_State","Event_Enable");
	$alarm=Array("Alarm_Enable","Limit_Enable","Time_Delay","Acked_Transitions");
	if(isset($_GET["type"])){
		$type=$_GET["type"];
		if($type=="parameters"){
			$arr3=array_intersect($arr3,$parameters);
		}else if($type=="event"){
			$arr3=array_intersect($arr3,$event);
		}else if($type=="alarm"){
			$arr3=array_intersect($arr3,$alarm);
		}else if($type=="other"){
			$arr3=array_diff($arr3,$parameters);
			//echo print_r($arr3);
			//echo "<br>";
			$arr3=array_diff($arr3,$event);
			$arr3=array_diff($arr3,$alarm);
		}
	}
	$str = "";
	echo "[";
	foreach ($arr3 as $key) {
		$value = $redis->hGet($nodeName,$key);
		
		$str.="{type:'".$key."',value:'".$value."'},";
	}
	echo substr($str,0,strlen($str)-1);
	echo "]";

}
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
if($par=="getreferencesdev"){
	echo "[";
	$str ="";
	$nodeName=substr($_GET["nodename"],0,4);

	foreach ($arList as $value) {
		$value = "$value";
		$sfive = substr($value,4,1);
		if(strlen($value)==7&substr($value,0,4)==$nodeName){
			if($sfive==1||$sfive==2||$sfive==4||$sfive==5){
				$str.= $value.',';
			}
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
function dateToJson($riqi){
	$riqiarr=explode("-",$riqi);
	$ri = current($riqiarr);
	$yue = next($riqiarr)-1;
	$nian = next($riqiarr);
	$zhou=date("W",mktime(0, 0, 0, $yue, $ri, $nian));
	$jsstr='"year":	'.$nian.',
	"month":	'.$yue.',
	"day_of_month":	'.$ri.',
	"day_of_week":	'.$zhou;
	return $jsstr;
}

	//$fn=$_POST['fileName'];
//$rw=$_POST['rw'];
?>

