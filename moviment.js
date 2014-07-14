var left;
var moving;
var desloc = 9;
var flag = 0;
var image = "";

function autoMove(way) {

	if(!checkImage()) { 
		alert("Select an image");
	}

	stop();
	var stopButton = document.getElementById("stopButton");
	stopButton.style.visibility = "visible";
	var slider = document.getElementById("speedSlider");
	slider.style.visibility = "visible";
	var speedString = document.getElementById("speedString");
	speedString.style.visibility = "visible";

	var speed = 1000 - 100 * slider.value;

	slider.addEventListener('change', function() {
		autoMove();
	});

	moving = setInterval(function(){
		
		speed = 1000 - 100 * document.getElementById("speedSlider").value;

		grid = document.getElementById("brise");
		
		if(way == 'left' && desloc > 0) { invert(); }
		if(way == 'right' && desloc < 0) { invert(); }
		
		if (grid.style.left == "") {
			left = 100;
		}

		if (left < 0 - 300) way = 'right';
		if (left > document.getElementById("main").clientWidth - 300) way = 'left';
		
		grid.style.left = left + desloc + "px";
		left += desloc;

	}, speed);
}

function stop(button) {
	var stopButton = document.getElementById("stopButton");
	var slider = document.getElementById("speedSlider");
	var speedString = document.getElementById("speedString");

	stopButton.style.visibility = "hidden";
	slider.style.visibility = "hidden";
	speedString.style.visibility = "hidden";

	clearInterval(moving);

	if(button == 'button') {
		reset();
	}

}

function invert() {
	desloc *= -1;
}

function manualMove() {
	if(!checkImage()) { 
		alert("Select an image");
	}

	grid = document.getElementById("brise");
	flag = window.event.clientX - 100;

	grid.addEventListener('drag', function() {
		var xPos = window.event.clientX;
		if (xPos > 0) {
			grid.style.left = xPos - flag + "px";
		}
	});

	grid.addEventListener('dragleave', function() {
		reset();
	});
}

function getSelected() {
	var selector = document.getElementById("selector");
	var ball = document.getElementsByName("imgBall");
	var bells = document.getElementsByName("imgBells");

	ball[0].style.visibility = "hidden";
	bells[0].style.visibility = "hidden";

	switch (selector.value) {
		case "ball" 	: ball[0].style.visibility = "visible";
							image = "ball";
							break;
		case "bells" 	: bells[0].style.visibility = "visible";
							image = "bells";
							break;
		default 		: image = ""; break;
	}
}
function checkImage() {
	if (image == "") {
		return false;
	} else {
		return true;
	}
}
function reset() {
	grid = document.getElementById("brise");
	grid.style.left = "100px";
	left = 100;
}