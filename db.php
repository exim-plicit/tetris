<?php
	header("Content-type: application/x-javascript");
	$dsn = "mysql:dbname=main;";
	$user = "readonly";
	$password = "L-QEfbsQAkoHydIg";
	try{
		$pdo = new PDO($dsn, $user, $password);
		echo "const tags = {";
		foreach ($pdo->query("SELECT * FROM `tags`") as $row) {
			$name = "'{$row["name"]}'";
			$color = "'{$row["color"]}'";
			echo "{$name}: {color:{$color}},";
		}
		echo "};";
		echo "const templates = [";
		foreach ($pdo->query("SELECT * FROM `templates_view`") as $row) {
			$tags = '"'.implode('","', explode(",", $row['tags'])).'"';
			echo "{id:\"",$row['id'],"\",name:\"",$row['name'],"\",minos:[",$row['minos'],"],tags:[",$tags,"]},";
		}
		echo "];";
		$pdo = null;
	}catch (PDOException $e){
		print("Error:".$e->getMessage());
		die();
	}
?>