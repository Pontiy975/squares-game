const WIDTH	= window.innerWidth;
const HEIGHT = window.innerHeight;

let stepX = 5;
let stepY = 5;

let isCatch = false;
let score = 0;
let lives = 3;

let stage = new Konva.Stage({
	container: 'canvas',
	width: WIDTH,
	height: HEIGHT,
});

let layer = new Konva.Layer();


let border = new Konva.Rect({
	x: WIDTH / 2,
	y: HEIGHT / 2,
	width: 140,
	height: 140,
	stroke: 'salmon',
	strokeWidth: 4
});

border.offset({
	x: border.width() / 2,
	y: border.height() / 2
});


let square = new Konva.Rect({
	x: WIDTH / 2,
	y: HEIGHT / 2,
	width: 100,
	height: 100,
	fill: '#1E90FF'
});

square.offset({
	x: square.width() / 2,
	y: square.height() / 2
});


let scoreText = new Konva.Text({
	x: 20,
	y: 10,
	text: 'Score: ' + score,
	fontSize: 50,
	fontFamily: 'Calibri'
});


let livesText = new Konva.Text({
	x: WIDTH - 170,
	y: 10,
	text: 'Lives: ' + lives,
	fontSize: 50,
	fontFamily: 'Calibri'
});


stage.on('mousemove', function () {
	let mousePos = stage.getPointerPosition();

	border.x(mousePos.x);
	border.y(mousePos.y);

	let borderLeft = border.x() - border.width() / 2;
	let borderRight = border.x() + border.height() / 2;
	let borderTop = border.y() - border.height() / 2;
	let borderBottom = border.y() + border.height() / 2;

	let squareLeft = square.x() - square.width() / 2;
	let squareRight = square.x() + square.width() / 2;
	let squareTop = square.y() - square.height() / 2;
	let squareBottom = square.y() + square.height() / 2;

	let collision = borderLeft < squareLeft && borderRight > squareRight && borderTop < squareTop && borderBottom > squareBottom;
	if (collision) {
		border.stroke('blue');
		isCatch = true;
	} else {
		border.stroke('salmon');
		isCatch = false;
	}

	layer.draw();
});


stage.on('click', function () {
	if (isCatch) score += 1;
	else lives -= 1;
});


layer.add(border);
layer.add(square);
layer.add(scoreText);
layer.add(livesText);
stage.add(layer);


let anim = new Konva.Animation(function (frame) {
	let newX = square.x() + stepX;
	if (newX + square.width() / 2 > stage.width() || newX - square.width() / 2 < 0) stepX = -stepX;
	square.x(newX);

	let newY = square.y() + stepY;
	if (newY + square.height() / 2 > stage.height() || newY - square.height() / 2 < 0) stepY = -stepY;
	square.y(newY);

	scoreText.text('Score: ' + score);
	document.querySelector('.score').innerHTML  = 'Score: ' + score;
	livesText.text('Lives: ' + lives);

	if (lives < 1) {
		anim.stop();
		document.querySelector('#curtain').classList.remove('hide');
	}
}, layer);


document.querySelector('#curtain').onclick = function () {
	document.querySelector('#curtain').classList.add('hide');
	
	score = 0;
	lives = 3;

	border.x(WIDTH / 2);
	border.y(HEIGHT / 2);

	square.x(WIDTH / 2);
	square.y(HEIGHT / 2);

	anim.start();
};
