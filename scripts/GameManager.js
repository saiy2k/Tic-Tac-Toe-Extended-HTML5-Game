/*
Copyright 2011 Saiyasodharan (http://saiy2k.blogspot.com/)

This file is part of the open source game, Tic Tac Toe Extended (https://github.com/saiy2k/Tic-Tac-Toe-Extended-HTML5-Game)

Tic Tac Toe Extended is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Tic Tac Toe Extended is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Tic Tac Toe Extended.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
    This class is the master class that manages the screen flow and
	updates the other components of the game

	@namespace
	@author			<a href="saiy2k.blogspot.com">Saiyasodharan</a>
*/
TicTacToe.GameManager	=	function() {

	/**	Frames per Second (30)
		@type	double
		@private */
    var FPS				=	30.0;

    /**	2D drawing context to the HTML5 canvas. This object is used to make all the draw calls
		@type	canvas context
		@private */
    var context;
    
    /** GameBoard object
		@type	TicTacToe.GameBoard
		@private */
	var gBoard;
	
	/**	Current Game Screen. Possible Values: "Splash", "Game", "End"
		@type	string
		@private */
	var	currentScreen;
	
	/** if true, AI will take the role of Player 2 and make its move automatically
		@type	bool
		@private */
	var isAI;
	
	function setupJqueryHandlers() {
		$( "#vsHumanButton" ).click(function() {
			console.log($("#p1NameDiv1").focus());
			currentScreen		=	"Game";
			isAI				=	false;
			TicTacToe.GameState.reset();
			gBoard.reset();
		});
		
		$("#vsAIButton").click(function() {
			currentScreen		=	"Game";
			isAI				=	true;
			TicTacToe.GameState.reset();
			gBoard.reset();
		});

		$("#infoButton").click(function() {
			if($('#infoScreen').css('display') == 'none') {
				currentScreen	=	"Info";
				$('#infoScreen').show();
			} else {
				currentScreen	=	"Game";
				$('#infoScreen').hide();
			}
		});
		
		$("#shareFacebookWidget").click(function() {
			TicTacToe.FBWrapper.shareStatus();
		});
		
		$("#shareTwitterWidget").click(function() {
			TicTacToe.TwitterWrapper.shareStatus();
		});
		
		$("#p1NameDiv1").keypress(function() {
			var text		=	$("#p1NameDiv1").val();
			TicTacToe.GameState.p1Name =	text;
			$("#p1NameDiv2").text(text);
			if(currentScreen == "End")
				updateGameOverStatus();	
		});

		$("#p2NameDiv1").keypress(function() {
			var text		=	$("#p2NameDiv1").val();
			TicTacToe.GameState.p2Name =	text;
			if(currentScreen == "End")
				updateGameOverStatus();				
		});
	
		$("#p1NameDiv1").blur(function() {
			TicTacToe.GameState.p1Name = $("#p1NameDiv1").val();
		});
		
		$("#p2NameDiv1").blur(function() {
			TicTacToe.GameState.p2Name = $("#p2NameDiv1").val();
		});

		$("#p1NameDiv1").click(function(e) {
			e.stopPropagation();
		});

		$("#p2NameDiv1").click(function(e) {
			e.stopPropagation();
		});
	}
	
	function updateGameOverStatus() {
		var							st;
		var							rankArray;
		var							rank;
		st						=	TicTacToe.GameState;
		rankArray					=	["Amoeba", "Mosquito", "Dog", "Monkey", "Baby", "Student", "Professor", "Scientist", "Super Hero", "God"];
		picArray					=	["images/Amoeba.png", "images/Mosquito.png", "images/Dog.png", "images/Monkey.png", "images/Baby.png", "images/Student.png", "images/Professor.png", "images/Scientist.png", "images/SuperHero.png", "images/God.png"]; 
		if(isAI) {
			if(st.player1Score > st.player2Score) {
				rank				=	Math.round(5 + ((st.player1Score - st.player2Score)/2) - st.p1ElapsedTime / 30000);

				rank				=	rank<0 ? 0 : rank;
				rank				=	rank>9 ? 9 : rank;
				st.gameStatus			=	st.p1Name + " Wins";
				st.gameDescription		=	st.p1Name + " scored " + st.player1Score + " points and earned the title of " + rankArray[rank];			
			} else {
				st.gameStatus			=	st.p1Name + " Loses";
				st.gameDescription		=	st.p1Name + " scored " + st.player1Score + " points in Tic Tac Tow and lost the game";			
			}
		} else {
			if(st.player1Score > st.player2Score) {
				rank				=	Math.round(((st.player1Score - st.player2Score) / 2) + ((st.p2ElapsedTime - st.p1ElapsedTime) / 30000));
				rank				=	rank<0 ? 0 : rank;
				rank				=	rank>9 ? 9 : rank;
				st.gameStatus			=	st.p1Name + " Wins";
				st.gameDescription		=	st.p1Name + " scored " + st.player1Score + " points against " + st.p2Name + " and earned the title of " + rankArray[rank];
			} else if(st.player1Score < st.player2Score) {
				rank				=	Math.round(((st.player2Score - st.player1Score)) / 2 + ((st.p1ElapsedTime - st.p2ElapsedTime) / 30000));
				rank				=	rank<0 ? 0 : rank;
				rank				=	rank>9 ? 9 : rank;
				st.gameStatus			=	st.p2Name + " Wins";
				st.gameDescription		=	st.p2Name + " scored " + st.player2Score + " points against " + st.p1Name + " and earned the title of " + rankArray[rank];
			}
		}
		console.log(st.player1Score);
		console.log(st.player2Score);
		console.log(st.p1ElapsedTime/30000);
		console.log(st.p2ElapsedTime/30000);
		console.log(rank);
		$("#gOverStatus").text(st.gameStatus);
		$("#gOverDescription").text(st.gameDescription);
		$("#badgeImageHolder").attr({ src:  picArray[rank] });
		st.badgeURL = "http://www.gethugames.in/tictactoe/" + picArray[rank];
	}
	
	/** @scope TicTacToe.GameManager */
	return {
		/** Initializes the canvas context, game board, gamestate and sets the game loop */
		init			:	function() {
								currentScreen			=	"Game";
							
                                var canvas              =	document.getElementById("boardCanvas"); context					=	canvas.getContext('2d');
        
								TicTacToe.GameState.reset();
								gBoard					=	new TicTacToe.GameBoard(context, TicTacToe.GameState.rows, TicTacToe.GameState.cols);
								setInterval(TicTacToe.GameManager.loop, (1/FPS) * 1000);
																
								setupJqueryHandlers();
							},

		/** Game Loop. Getting called as per the given FPS */
		loop			:	function() {
								TicTacToe.GameManager.update();
								TicTacToe.GameManager.draw();
							},

		/** update the current screen */
		update			:	function() {								
								var mouse	=   TicTacToe.InputManager.getMouse();
                                var click   =   TicTacToe.InputManager.getClickIfAny();

								var	mx		=	mouse.x - gBoard.x();
								var my		=	mouse.y - gBoard.y();
															
								if(currentScreen		==	"Game") {
									//if(mx > 0 && my > 0 && mx < gBoard.width() && my < gBoard.height()) {
{
										gBoard.update(mouse, click);

										if ( click != null ) {
											TicTacToe.GameLogic.updateScore(TicTacToe.GameState);	
											if(TicTacToe.GameState.isValidMove)
												TicTacToe.GameLogic.endTurn(TicTacToe.GameState);
											TicTacToe.GameLogic.updateUI(TicTacToe.GameState);
											
											if(TicTacToe.GameState.isGameOver) {
												updateGameOverStatus();
												currentScreen = "End";
												$('#shareScoreWidget').show();
												return;
											}
											
											if(isAI) {
												if(TicTacToe.GameState.isValidMove) {
													TicTacToe.GameLogic.aiMove(TicTacToe.GameState);
													TicTacToe.GameLogic.updateScore(TicTacToe.GameState);
													gBoard.updateAIMove(TicTacToe.GameState);
													TicTacToe.GameLogic.endTurn(TicTacToe.GameState);
													TicTacToe.GameLogic.updateUI(TicTacToe.GameState);
												}
												
												if(TicTacToe.GameState.isGameOver) {
													updateGameOverStatus();		
													currentScreen = "End";
													$('#shareScoreWidget').show();
													return;
												}
											}
										}
									}
									
									TicTacToe.GameLogic.calcTime(TicTacToe.GameState);
									
								} else if(currentScreen	==	"Info") {
									if (click != null) {
										currentScreen	=	"Game";
										$('#infoScreen').hide();
									}
								} else if(currentScreen	==	"Splash") {
								}

							},

		/** draw the current screen */
		draw			:	function() {
								if(currentScreen		==	"Game") {
									gBoard.draw(context);
								}
								else if(currentScreen	==	"End")
								{
									gBoard.draw(context);
								}
								else if(currentScreen	==	"Splash")
								{
								
								}
							}
	};
}();
