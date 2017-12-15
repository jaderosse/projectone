document.addEventListener("DOMContentLoaded", function(event) { 
var compHits = 0;
var playerHits = 0;

var opRows = 8;
var opColumns = 8;
var cellSize = 50;
var opHits = 0;
var turn = 0;

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

function playerClickHandler(e){
	if (turn % 2 === 0){
		cellClicked(e.target.id);
		// console.log(e.target.id);
	}
}


function cellClicked(elementId){
	var target = document.getElementById(elementId);
	//player hit	
	if(turn % 2 === 0){
			if(target.classList.contains("filled")){
			target.style.background = "red";
			playerHits += 1;
			// console.log(playerHits);
			$("#log").text("you got a hit!");
			target.removeEventListener("click", playerClickHandler);
		} else {
			target.style.background = "green";
			$("#log").text("you missed.");
			target.removeEventListener("click", playerClickHandler);
		}
	} else {
			if(target.classList.contains("filled")){
			$("#log").text("you've been hit!");
			target.style.background = "red";
			compHits += 1;
		} else {
			$("#log").text("crisis averted.");
			target.style.background = "green";
		}
	}
	if(turn % 2 === 0){
		setTimeout(compGuess, 1500);
	}
	if(playerHits === 6){
		$("#log").text("You won!!!");
		endGame();
	}
	if(compHits === 6){
		$("#log").text("You lost to a computer.");
		endGame();
	}
	turn += 1;
	console.log(target);
};


var opposerShips = [1, 2, 3];

var endGame = function(){
	opponentBoardContainer.removeEventListener("click", playerClickHandler);
	$("#log").append("<button id='restart'>New Game?</button>");
	document.getElementById("restart").addEventListener("click", reset);
}

var reset = function(){
	console.log("resetting");
	window.location.reload();
}

function randomize(){
	for(var i = 0; i < opposerShips.length; i++){
		var startingPoint = document.getElementById("c"+(Math.floor(Math.random()*7)+1) + (Math.floor(Math.random()*7)+1));
		startingPoint.className += " filled";
		var stringNum = startingPoint.id.slice(-2);
		console.log(startingPoint);
		var randomOrientation = Math.floor(Math.random()*2)+1;
		if(randomOrientation % 2 === 0){
			var vert = document.getElementById("c"+(parseInt(stringNum)+01));
			vert.className += " filled";
		} else {
			var hor = document.getElementById("c"+(parseInt(stringNum)+10));
			hor.className += " filled";
		}
		console.log(randomOrientation);
	}
		
}



$(".cells").hover(function(){
	$(this).css("background-color", "yellow");
}, function(){
	$(this).css("background-color", "transparent");
});

var playerShips = 0;
var playerCells = document.querySelectorAll(".cells");

function selectForShip(){
	for(var i = 0; i < playerCells.length; i++){
		playerCells[i].addEventListener("click", createShip);
	}
}




var createShip = function(){
	playerShips += 1;
	$(this).css("background-color", "blue");
	$(this).unbind("mouseenter mouseleave");
	this.className += " filled";
	var stringNum = this.id.slice(-2);
	//appending buttons to div
	$("#log").text("how to orient your ship?").append("<button id='H'>horizontal</button>")
	.append("<button id='V'>vertical</button>");
	//click events for buttons
		document.getElementById("V").addEventListener("click", clickedVert);
		document.getElementById("H").addEventListener("click", clickedHor);

	function clickedVert(){
		console.log("ya want vertical");	
		var vert = document.getElementById("s"+(parseInt(stringNum)+1));
		vert.className += " filled";
		vert.style.backgroundColor = "blue";
		$(vert).unbind("mouseenter mouseleave");
	}
	function clickedHor(){
		var hor = document.getElementById("s"+(parseInt(stringNum)+10));
		hor.className += " filled";
		hor.style.backgroundColor = "blue";
		$(hor).unbind("mouseenter mouseleave");
	}
	removeClicks();
}

var removeClicks = function(){
	if(playerShips === 3){
		console.log(playerShips);
		for(var i = 0; i < playerCells.length; i++){
			playerCells[i].removeEventListener("click", createShip)
			playerClick();

		}
		randomize();
	}
}

//REMOVE EVENT HANDLER FOR OP BOARD
var playerClick = function(){ 
	$("div", "#opponent-board").each(function(){
	this.addEventListener("click", playerClickHandler);

});
	// opponentBoardContainer.addEventListener("click", playerClickHandler);
}

var compGuess = function() {
	cellClicked("s"+(Math.floor(Math.random()*7)+1) + (Math.floor(Math.random()*7)+1));
}



$(playerCells).unbind("mouseenter mouseleave");





selectForShip();
});
