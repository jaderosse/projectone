//creating opponent/player's scoreboard first


var opRows = 8;
var opColumns = 8;
var cellSize = 50;
var opHits = 0;

var opponentBoardContainer = document.getElementById("opponent-board");

for(var i = 0; i < opRows; i++){
	for(var j = 0; j < opColumns; j++){
		var cell = document.createElement("div");
		opponentBoardContainer.insertBefore(cell, document.getElementById("op-ship"));
		cell.id = "c" + i + j;


		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = j * cellSize;
		var leftPosition = i * cellSize;			
		
		// use CSS absolute positioning to place each grid square on the page
		cell.style.top = topPosition + 'px';
		cell.style.left = leftPosition + 'px';	
	}
}

//randomize boat placement by row/column

var playerRows = 8;
var playerColumns = 8;
var cellSize = 50;
var playerHits = 0;

var playerBoardContainer = document.getElementById("player-board");
var randomButton = document.getElementById("rando");
var opposerShips = [1, 2, 3];

for(var i = 0; i < playerRows; i++){
	for(var j = 0; j < playerColumns; j++){
		var cell = document.createElement("div");
		playerBoardContainer.insertBefore(cell, document.getElementById("ship"));
		cell.className = "cells";
		cell.id = "s" + i + j;
		
		var topPosition = j * cellSize;
		var leftPosition = i * cellSize;			
		
		cell.style.top = topPosition + 'px';
		cell.style.left = leftPosition + 'px';	
	}
}


var beginGame = function(){

var addClick = opponentBoardContainer.addEventListener("click", cellClicked);
// var aiClick = playerBoardContainer.addEventListener("click", cellClicked);

function cellClicked(e){
	if(e.target !== e.currentTarget){
		var row = e.target.id.substring(1, 2);
		var col = e.target.id.substring(2, 3);
		// console.log(row, col);
		if(e.target.classList.contains(" filled")){
			console.log("hit ya bitch");
			e.target.style.background = "red";
		} else {
			console.log("missed you");
			e.target.style.background = "green";
		}

	}
	e.stopPropagation();
};
}


var random = randomButton.addEventListener("click", randomize);
function randomize(){
	for(var i = 0; i < opposerShips.length; i++){
		var startingPoint = document.getElementById("c"+(Math.floor(Math.random()*7)+0) + (Math.floor(Math.random()*7)+0));
		startingPoint.className += " filled";
		var stringNum = startingPoint.id.slice(-2);
		console.log(startingPoint);
		// if/else statement to alternate or randomize
		var vert = document.getElementById("c"+(parseInt(stringNum)+01));
		vert.className += " filled";
		console.log("vertical");
		// var hor = document.getElementById("c"+(parseInt(stringNum)+10));
		// hor.className += "filled";
		// console.log("horizont");
	}
}



//SELECT SHIP POSITION

$(".cells").hover(function(){
	$(this).css("background-color", "yellow");
}, function(){
	$(this).css("background-color", "transparent");
});

var playerCells = document.querySelectorAll(".cells");
function selectForShip(){
	for(var i = 0; i < playerCells.length; i++){
		playerCells[i].addEventListener("click", createShip)
			function createShip(){
			console.log("clicked here");
			$(this).css("background-color", "blue");
			$(this).unbind("mouseenter mouseleave");
			this.className += " filled";
			var stringNum = this.id.slice(-2);
			console.log(stringNum);
			var vert = document.getElementById("s"+(parseInt(stringNum)+01));
			vert.className += " filled";
			vert.style.backgroundColor = "blue";
			$(vert).unbind("mouseenter mouseleave");
		};	
	}
}

selectForShip();


