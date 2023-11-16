<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link type="text/css" rel="stylesheet" href="index.css">
		<style type="text/css" id="css-filter"></style>
		<script><?php
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
		?></script>
	</head>
	<body>
		<div class="menu">
			<label>ID<input class="filter" data-key="data-id" type="textfield"></label>
			<label>名前<input class="filter" data-key="data-name" type="textfield"></label>
			<label>タグ<input class="filter" data-key="data-tag" type="textfield"></label>
			<span class="tips">※半角スペースでAND検索</span>
		</div>
		<script type="module" src="index.js"></script>
	</body>
</html>