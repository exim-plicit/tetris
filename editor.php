<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link type="text/css" rel="stylesheet" href="editor.css">
		<style type="text/css" id="css-filter"></style>
	</head>
	<body>
		<div class=card>
			<canvas id=canvas>
		</div>
		<form id=forms>
			<div>
				<label><input type=radio name=order value=0 checked>1巡目</label>
				<label><input type=radio name=order value=1>2巡目</label>
			</div>
			<div>
				<input type=radio name=mino value=10 checked><img width=32 height=32 src="mino10.png">
			</div>
			<div>
				<input type=radio name=mino value=20><img width=32 height=32 src="mino20.png">
				<input type=radio name=mino value=21><img width=32 height=32 src="mino21.png">
			</div>
			<div>
				<input type=radio name=mino value=30><img width=32 height=32 src="mino30.png">
				<input type=radio name=mino value=31><img width=32 height=32 src="mino31.png">
				<input type=radio name=mino value=32><img width=32 height=32 src="mino32.png">
				<input type=radio name=mino value=33><img width=32 height=32 src="mino33.png">
			</div>
			<div>
				<input type=radio name=mino value=40><img width=32 height=32 src="mino40.png">
				<input type=radio name=mino value=41><img width=32 height=32 src="mino41.png">
				<input type=radio name=mino value=42><img width=32 height=32 src="mino42.png">
				<input type=radio name=mino value=43><img width=32 height=32 src="mino43.png">
			</div>
			<div>
				<input type=radio name=mino value=50><img width=32 height=32 src="mino50.png">
				<input type=radio name=mino value=51><img width=32 height=32 src="mino51.png">
				<input type=radio name=mino value=52><img width=32 height=32 src="mino52.png">
				<input type=radio name=mino value=53><img width=32 height=32 src="mino53.png">
			</div>
			<div>
				<input type=radio name=mino value=60><img width=32 height=32 src="mino60.png">
				<input type=radio name=mino value=61><img width=32 height=32 src="mino61.png">
			</div>
			<div>
				<input type=radio name=mino value=70><img width=32 height=32 src="mino70.png">
				<input type=radio name=mino value=71><img width=32 height=32 src="mino71.png">
			</div>
		</form>
		<input id=dest_minos type="textfield">
		<button id=reverse type=button>反転</busson>
		<script type="module" src="editor.js"></script>
	</body>
</html>