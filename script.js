//creating opponent/player's scoreboard first
document.addEventListener("DOMContentLoaded", function(event) { 
var compHits = 0;
var playerHits = 0;

var opRows = 8;
var opColumns = 8;
var cellSize = 50;
var opHits = 0;

var opponentBoardContainer = document.getElementById("opponent-board");

for(var i = 0; i < opRows; i++){
	for(var j = 0; j < opColumns; j++){
		var cell = document.createElement("div");
		opponentBoardContainer.insertBefore(cell, document.getElementById("op-ship"));
		cell.id = "c" + (i+1) + (j+1);

		var topPosition = j * cellSize;
		var leftPosition = i * cellSize;			
		
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

for(var i = 0; i < playerRows; i++){
	for(var j = 0; j < playerColumns; j++){
		var cell = document.createElement("div");
		playerBoardContainer.insertBefore(cell, document.getElementById("ship"));
		cell.className = "cells";
		cell.id = "s" + (i+1) + (j+1);
		
		var topPosition = j * cellSize;
		var leftPosition = i * cellSize;			
		
		cell.style.top = topPosition + 'px';
		cell.style.left = leftPosition + 'px';	
	}
}

// turn = 0;

function compCellClicked(e){
	console.log(e);
	// turn += 1;
	// console.log("turn number", turn);
	// if(turn % 2 === 1){
	// }
	if(e.target !== e.currentTarget){
		var row = e.target.id.substring(1, 2);
		var col = e.target.id.substring(2, 3);
		// console.log(row, col);
		if(e.target.classList.contains("filled")){
			console.log("hit ya bitch");
			e.target.style.background = "red";
			playerHits += 1;
		} else {
			console.log("missed you step 1");
			e.target.style.background = "green";
		}

	}
	e.stopPropagation();
	console.log("now comp's turn step 2");
	compGuess();
};

function playerCellClicked(e){
	console.log(e);
	// turn += 1;
	// console.log("turn number ", turn);
	// if(turn % 2 === 0){
	console.log("player cell has been clicked step 4");	
	// }
	if(e.target !== e.currentTarget){
		var row = e.target.id.substring(1, 2);
		var col = e.target.id.substring(2, 3);
		// console.log(row, col);
		if(e.target.classList.contains("filled")){
			console.log("hit ya bitch");
			e.target.style.background = "red";
			compHits += 1;
		} else {
			console.log("missed you");
			e.target.style.background = "green";
		}

	}
	e.stopPropagation();
};

var opposerShips = [1, 2, 3];
var random = randomButton.addEventListener("click", randomize);

function randomize(){
	for(var i = 0; i < opposerShips.length; i++){
		var startingPoint = document.getElementById("c"+(Math.floor(Math.random()*7)+1) + (Math.floor(Math.random()*7)+1));
		startingPoint.className += " filled";
		var stringNum = startingPoint.id.slice(-2);
		console.log(startingPoint);
		//if (turn % 2 === 0){
		var vert = document.getElementById("c"+(parseInt(stringNum)+01));
		vert.className += " filled";
		//} else {
		// var hor = document.getElementById("c"+(parseInt(stringNum)+10));
		// hor.className += "filled";
		// console.log("horizont");
		// }
	}
}


//SELECT SHIP POSITION

$(".cells").hover(function(){
	$(this).css("background-color", "yellow");
}, function(){
	$(this).css("background-color", "transparent");
});

var playerShips = 0;

var playerCells = document.querySelectorAll(".cells");
function selectForShip(){
	for(var i = 0; i < playerCells.length; i++){
		playerCells[i].addEventListener("click", createShip)
	}
}
var createShip = function(){
	playerShips += 1;
	$(this).css("background-color", "blue");
	$(this).unbind("mouseenter mouseleave");
	this.className += " filled";
	var stringNum = this.id.slice(-2);
	var vert = document.getElementById("s"+(parseInt(stringNum)+1));
	vert.className += " filled";
	vert.style.backgroundColor = "blue";
	$(vert).unbind("mouseenter mouseleave");
	removeClicks();

	
}
var removeClicks = function(){
		if(playerShips === 3){
	console.log(playerShips);
	for(var i = 0; i < playerCells.length; i++){
		playerCells[i].removeEventListener("click", createShip)
	playerClick();
	}	
}
}
//FIND OUT WHY COLORS DON'T SHOW UP ON PLAYER BOARD

var playerClick = function(){ opponentBoardContainer.addEventListener("click", compCellClicked);
}


var compGuess = function() {
document.getElementById("s"+(Math.floor(Math.random()*7)+1) + (Math.floor(Math.random()*7)+1));
// playerCellClicked();
console.log("here's comp guess step 3");
playerCellClicked();
}



$(playerCells).unbind("mouseenter mouseleave");





selectForShip();
});
