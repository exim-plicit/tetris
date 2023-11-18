<?php
	$raw = file_get_contents('php://input'); // POSTされた生のデータを受け取る
	$data = json_decode($raw); // json形式をphp変数に変換
	$data->id = dechex(crc32($data->name.$data->minos));

	$dsn = "mysql:dbname=main;";
	$user = "root";
	$password = "";
	try{
		$pdo = new PDO($dsn, $user, $password);
		$pdo->query("INSERT INTO `templates` (`id`, `name`, `minos`) VALUES ('{$data->id}', '{$data->name}', '{$data->minos}');");
		foreach ($data->tags as $tag) {
			$pdo->query("INSERT INTO `tag_maps` (`template_id`, `tag_name`) VALUES ('{$data->id}', '${tag}');");
		}
		$pdo = null;
		echo "{$data->id}として追加されました";
	}catch (PDOException $e){
		print("Error:".$e->getMessage());
		die();
	}
?>