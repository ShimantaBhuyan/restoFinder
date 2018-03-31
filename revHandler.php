<?php
	if(!empty($_POST['review'])){
		$rev = $_POST['review'];
		$rat = $_POST['rating'];
		$resID = $_POST['resID'];
		$myFile = "restoReviews/".$resID.".json";
		$file = fopen($myFile,"a");
		$text = file_get_contents($myFile);
		fclose($file);		
		$file = fopen($myFile,"w");
		if(strlen($text)!=0){
			$s =substr($text, 0, -2);
			$string = $s.",\n{\"reviewText\": \"".$rev."\",\"rating\": \"".$rat."\"}]}";
		}
		else{
			$string = "{\"reviews\":[\n{\"reviewText\": \"".$rev."\",\"rating\": \"".$rat."\"}]}";
		}		
		fwrite($file, $string);
		fclose($file);
	}
	$_POST = array();	
	header("location:index.html?msg=reviewed");
?>