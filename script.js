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
var randomShip = document.getElementById("op-ship");
var rando = document.getElementById("rando");

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





var addClick = opponentBoardContainer.addEventListener("click", cellClicked);
var aiClick = playerBoardContainer.addEventListener("click", cellClicked);

function cellClicked(e){
	if(e.target !== e.currentTarget){
		var row = e.target.id.substring(1, 2);
		var col = e.target.id.substring(2, 3);
		// console.log(row, col);
		if(row === "" && col === ""){
			console.log("hit ya bitch");

		} else {
			console.log("missed you");
			// this.style.backgroundColor = "red";
		}

	}
	e.stopPropagation();
};

var random = rando.addEventListener("click", randomize);
function randomize(){
	randomShip.style.transform = "translate" + "("+Math.floor(Math.random()*6)*50 + 'px' + "," + Math.floor(Math.random()*6)*50 + 'px' +")"

	// console.log("translate" + "("+Math.floor(Math.random()*6)*50 + 'px' + "," + Math.floor(Math.random()*6)*50 + 'px' +")");
}

//DRAGGABILITY - need to figure out how to detect if cell is occupied
//be able to turn vertical on click

$(function(){
  $('.draggable').draggable({
    containment: 'parent',
    cursor: 'move',
    revert: true
  });
});

$(function() {
  $('.cells').droppable({
    drop: handleDrop
  });
});

function handleDrop( event, ui ) {
  ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
  ui.draggable.draggable( 'option', 'revert', false );
}

//double click ship div to turn vertical
// var vertical = 
// $(".draggable").keypress(function(){
// 	console.log("verticalized!");
// })