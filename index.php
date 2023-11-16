<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link type="text/css" rel="stylesheet" href="index.css">
		<style type="text/css" id="css-filter"></style>
		<script type="text/javascript" src="db.php"></script>
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