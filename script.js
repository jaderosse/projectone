document.addEventListener("DOMContentLoaded", function(event) { 
var compHits = 0;
var playerHits = 0;

var opRows = 8;
var opColumns = 8;
var cellSize = 50;
var opHits = 0;
var turn = 0;
var opponentBoardContainer = document.getElementById("opponent-board");

var playerRows = 8;
var playerColumns = 8;
var cellSize = 50;
var playerHits = 0;
var playerBoardContainer = document.getElementById("player-board");


//creating unique id's for opponent board
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
//unique id's for player board
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
//even turns are player(player starts)
function playerClickHandler(e){
	if (turn % 2 === 0){
		cellClicked(e.target.id);
	}
}
//blinks red when hit
var blink;
function setColor(){
	var x = document.getElementById("log")
	x.style.backgroundColor = x.style.backgroundColor == "red" ? "white" : "red";
}
function stopColor(){
	clearInterval(blink);
	var x = document.getElementById("log")
	x.style.backgroundColor = "white";
}

//checks occupancy of cells for score
function cellClicked(elementId){
	var target = document.getElementById(elementId);
	//player score	
	if(turn % 2 === 0){
		stopColor();
			if(target.classList.contains("filled")){
			target.style.background = "red";
			playerHits += 1;
			$("#log").text("You got a hit!");
			target.removeEventListener("click", playerClickHandler);
			} else {
			target.style.background = "grey";
			$("#log").text("You missed.");
			target.removeEventListener("click", playerClickHandler);
			}
	//computer score
	} else {
			if(target.classList.contains("cellsfilled")){
			$("#log").text("You've been hit! Fire back.");
			target.style.background = "red";
			compHits += 1;
			blink = setInterval(setColor, 1000);
			} else {
			$("#log").text("Crisis averted. Your turn.");
			target.style.background = "grey";
		}
	}
	//delayed computer turn after player 
	if(turn % 2 === 0){
		setTimeout(compGuess, 2000);
	}
	if(playerHits === 7){
		$("#log").text("You won!!!");
		endGame();
	}
	if(compHits === 7){
		$("#log").text("You lost to a computer.");
		endGame();
	}
	turn += 1;
};

var ships = [
{name: "kayak"},
{name: "kayak"},
{name: "Edmonds-Kingston-Ferry"}
];

var endGame = function(){
	$("div", "#opponent-board").each(function(){
		this.removeEventListener("click", playerClickHandler);
	});
	$("#log").append("<button id='restart'>New Game?</button>");
	document.getElementById("restart").addEventListener("click", reset);
}

var reset = function(){
	window.location.reload();
}
//picks random starting point for computer ships
function randomize(){
	for(var i = 0; i < ships.length; i++){
		var startingPoint = document.getElementById("c"+(Math.floor(Math.random()*6)+1) + (Math.floor(Math.random()*6)+1));
		startingPoint.className += "filled";
		var stringNum = startingPoint.id.slice(-2);
		//randomize whether ship is horizonta/vertical
		var randomOrientation = Math.floor(Math.random()*2)+1;
		if(randomOrientation % 2 === 0){
			var vert = document.getElementById("c"+(parseInt(stringNum)+01));
			vert.className += "filled";
				if(ships[i].name === "Edmonds-Kingston-Ferry"){
					//for third ship determined by name
					var moreVert = document.getElementById("c"+(parseInt(stringNum)+02));
					moreVert.className += "filled";
				}
		} else {
			var hor = document.getElementById("c"+(parseInt(stringNum)+10));
			hor.className += "filled";
					if(ships[i].name === "Edmonds-Kingston-Ferry"){
					var moreHor = document.getElementById("c"+(parseInt(stringNum)+20));
					moreHor.className += "filled";
				}
		}
		//prevents duplication of starting point
		if(startingPoint.className === "filledfilled"){
			console.log("new field");
			$("div", "#opponent-board").each(function(){
			this.className = "";
		})
		randomize();
	}
}
}

//hover function for ship selection
$(".cells").hover(function(){
	$(this).css("background-color", "yellow");
}, function(){
	$(this).css("background-color", "transparent");
});

var playerShips = 0;
var playerCells = document.querySelectorAll(".cells");

//add click event to all player cells to select
function selectForShip(){
	for(var i = 0; i < playerCells.length; i++){
		playerCells[i].addEventListener("click", createShip);
	}
}

//based on player selection
var createShip = function(){
	playerShips += 1;
	var bigShip = (playerShips === 3);
	$(this).css("background-color", "blue");
	$(this).unbind("mouseenter mouseleave");
	this.className += "filled";
	var stringNum = this.id.slice(-2);
	//Create buttons in helper div for orientation
	var buttonPrompt = function(){
		$("#log").text("How would you like to orient your boat?").append("<button id='H'>horizontal</button>")
		.append("<button id='V'>vertical</button>");
	}
	//creating click events for buttons
	buttonPrompt();
		document.getElementById("V").addEventListener("click", clickedVert);
		document.getElementById("H").addEventListener("click", clickedHor);

	function clickedVert(){	
		var vert = document.getElementById("s"+(parseInt(stringNum)+1));
		vert.className += "filled";
		vert.style.backgroundColor = "blue";
		$(vert).unbind("mouseenter mouseleave");
		//if it is on ship 3 i.e. biggest ship run this function
		if(bigShip){
			var moreVert = document.getElementById("s"+(parseInt(stringNum)+2));
			moreVert.className += "filled";
			moreVert.style.backgroundColor = "blue";
			$(moreVert).unbind("mouseenter mouseleave");
			$("#log").text("All your boats have been placed. Click Opponent's Board to attack!");
		} else {
			$("#log").text("Pick a position for next boat");
		}
	}
	function clickedHor(){
		var hor = document.getElementById("s"+(parseInt(stringNum)+10));
		hor.className += "filled";
		hor.style.backgroundColor = "blue";
		$(hor).unbind("mouseenter mouseleave");
		if(bigShip){
			var moreHor = document.getElementById("s"+(parseInt(stringNum)+20));
			moreHor.className += "filled";
			moreHor.style.backgroundColor = "blue";
			$(moreHor).unbind("mouseenter mouseleave");
			$("#log").text("All your boats have been placed. Click Opponent's Board to attack!");
		} else {
			$("#log").text("Pick a position for next boat");			
		}
	}
	removeClicks();
}

//remove click function for player board to start game
var removeClicks = function(){
	if(playerShips === 3){
		console.log(playerShips);
		for(var i = 0; i < playerCells.length; i++){
			playerCells[i].removeEventListener("click", createShip)
			playerClick();	
		}
		$(playerCells).unbind("mouseenter mouseleave");
		randomize();
	}	
}

//empty object to store which cells comp has clicked
var compGuessSlots = {};

//add click event to all cells on opponent board
var playerClick = function(){ 
	$("div", "#opponent-board").each(function(){
	this.addEventListener("click", playerClickHandler);
	});
}

//ensures computer doesn't guess the same cell twice
var compGuess = function() {
	var computerGuess = ("s"+(Math.floor(Math.random()*7)+1) + (Math.floor(Math.random()*7)+1));
	if(compGuessSlots[computerGuess] !== true){
		compGuessSlots[computerGuess] = true;
		cellClicked(computerGuess)
	} else {
		compGuess();
	}
}

selectForShip();
});
