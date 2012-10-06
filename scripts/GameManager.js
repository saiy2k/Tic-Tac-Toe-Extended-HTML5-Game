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
	
	function setupJqueryHandlers() {
		$( "#newAIGameButton" ).click(function() {
			$("#p1NameDiv1").focus();
			TicTacToe.GameState.reset();
            TicTacToe.GameState.isAI				=	true;
			TicTacToe.GameState.currentScreen		=	"Game";
			gBoard.reset();
            $("#menuScreen").hide();
            $(".freeBoardDiv").hide();
            $('#scoreBoardDiv').show();
            $('#playOptionsDiv').show(); 
            $('#tipsScreen').show(); 
            $('#tipsScreen').delay(3000).fadeOut(); 
            $('#p2NameDiv1').hide(); 
		});
		
		$("#newHumanGameButton").click(function() {
			TicTacToe.GameState.reset();
			TicTacToe.GameState.currentScreen		=	"Game";
			TicTacToe.GameState.isAI				=	false;;
			gBoard.reset();
            $("#menuScreen").hide();
            $(".freeBoardDiv").hide();
            $('#scoreBoardDiv').show();
            $('#playOptionsDiv').show(); 
            $('#tipsScreen').show(); 
            $('#tipsScreen').delay(3000).fadeOut(); 
            $('#p2NameDiv1').show(); 
		});
		
		$("#p1NameDiv1").keyup(function() {
			var text		=	$("#p1NameDiv1").val();
			TicTacToe.GameState.p1Name =	text;
			$("#p1NameDiv2").text(text);
			if(TicTacToe.GameState.currentScreen == "End")
				updateGameOverStatus();	
		});

		$("#p2NameDiv1").keyup(function() {
			var text		=	$("#p2NameDiv1").val();
			TicTacToe.GameState.p2Name =	text;
			if(TicTacToe.GameState.currentScreen == "End")
				updateGameOverStatus();				
		});
	}
	
	function updateGameOverStatus() {
		var							st;
		var							rankArray;
        var                         picArray;
        var                         remarkArray;
		var							rank;
		st						=	TicTacToe.GameState;
		rankArray					=	["Amoeba", "Mosquito", "Dog", "Monkey", "Baby", "Student", "Professor", "Scientist", "Super Hero", "God"];
		picArray					=	["images/Amoeba.png", "images/Mosquito.png", "images/Dog.png", "images/Monkey.png", "images/Baby.png", "images/Student.png", "images/Professor.png", "images/Scientist.png", "images/SuperHero.png", "images/God.png"]; 
        remarkArray                 =   ["Amoeba huh? Wish you atleast had multi celled brains.",
                                         "Silly Insect. But atleast you hav brains",
                                         "You played with doggy instincts, not bad",
                                         "Come on. You are on the right track. Practice more",
                                         "Allast you show the IQ of human species",
                                         "You got the potential to be the best. just Practice",
                                         "Wow! Now can teach your fellow mates on how to play",
                                         "Brainy, Brainy, keep it up",
                                         "No one can beat you now. You are off the charts",
                                         "The Super computer AI bows before you my lord"];

		if(TicTacToe.GameState.isAI) {
			if(st.player1Score > st.player2Score) {
				rank				=	Math.round(5 + ((st.player1Score - st.player2Score)/2) - st.p1ElapsedTime / 30000);

				rank				=	rank<0 ? 0 : rank;
				rank				=	rank>9 ? 9 : rank;
				st.gameStatus			=	st.p1Name + " Wins";
				st.gameDescription		=	st.p1Name + " scored " + st.player1Score + " points and earned the title of " + rankArray[rank];			
			} else if (st.player1Score < st.player2Score) {
				st.gameStatus			=	st.p1Name + " Loses";
				st.gameDescription		=	st.p1Name + " scored " + st.player1Score + " points in Tic Tac Toe and lost the game";			
                rank                =   0;
			} else {
                rank                =   0;
                st.gameStatus       =   "Game Draw";
                st.gameDescription  =   "Game draw between " + st.p1Name + " and AI with a score of " + st.player1Score;
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
			} else {
                rank                =   0;
                st.gameStatus       =   "Game Draw";
                st.gameDescription  =   "Game draw between " + st.p1Name + " and " + st.p2Name + " with a score of " + st.player1Score;
            }
		}
        TicTacToe.GameState.rank = rank;
		$("#gOverStatus").text(st.gameStatus);
		$("#gOverDescription").text(st.gameDescription);
		$("#gOverRemark").text(remarkArray[rank]);
        console.log(rank);
		$("#badgeImageHolder").attr({ src:  picArray[rank] });
		st.badgeURL = "http://www.gethugames.in/tictactoe/" + picArray[rank];

        TicTacToe.FBWrapper.postAction();
	}

    function runIt() {
        if (TicTacToe.FBWrapper.accessToken != null) {
            $('#shareFacebookWidget').hide();
            return;
        }

        $('#shareFacebookWidget').fadeIn(500)
            .delay(2000)
            .fadeOut(400, runIt);
    }

	/** @scope TicTacToe.GameManager */
	return {
		/** Initializes the canvas context, game board, gamestate and sets the game loop */
		init			:	function() {
                                var canvas              =	document.getElementById("boardCanvas"); 
                                context					=	canvas.getContext('2d');
                                canvas.addEventListener('selectStart', function(e) {
                                        e.preventDefault();
                                        return false;
                                        },false);

                                document.body.addEventListener('touchmove',function(event){
                                          event.preventDefault();
                                          },false);
        
								TicTacToe.GameState.reset();
                                TicTacToe.AudioManager.init();
                                TicTacToe.InputManager.init();
								gBoard					=	new TicTacToe.GameBoard(context, TicTacToe.GameState.rows, TicTacToe.GameState.cols);
								setTimeout(TicTacToe.GameManager.loop, (1/FPS) * 1000);
																
								setupJqueryHandlers();
							},

		/** Game Loop. Getting called as per the given FPS */
		loop			:	function() {
                                //console.log('update');
								TicTacToe.GameManager.update();
                                //console.log('draw');
								TicTacToe.GameManager.draw();
                                //console.log('loop again');
								setTimeout(TicTacToe.GameManager.loop, (1/FPS) * 1000);
                                //console.log('loop end');
							},

		/** update the current screen */
		update			:	function() {								
								var mouse	=   TicTacToe.InputManager.getMouse();
                                var click   =   TicTacToe.InputManager.getClickIfAny();

								var	mx		=	mouse.x - gBoard.x();
								var my		=	mouse.y - gBoard.y();
								if(TicTacToe.GameState.currentScreen		==	"Game") {
									gBoard.update(mouse, click);
									if(mx > 0 && my > 0 && mx < gBoard.width() && my < gBoard.height()) {
										if ( click != null ) {
                                           //console.log('click s not null'); 
											TicTacToe.GameLogic.updateScore(TicTacToe.GameState);	
											if(TicTacToe.GameState.isValidMove) {
                                                TicTacToe.AudioManager.click();
												TicTacToe.GameLogic.endTurn(TicTacToe.GameState);
                                            }
											TicTacToe.GameLogic.updateUI(TicTacToe.GameState);
											
											if(TicTacToe.GameState.isGameOver) {
												updateGameOverStatus();
												TicTacToe.GameState.currentScreen = "End";
												$('#shareScoreWidget').show();
                                                if (TicTacToe.FBWrapper.accessToken == null) {
                                                    runIt();
                                                } else {
                                                    $('#shareFacebookWidget').hide();
                                                }
												return;
											}
											
											if(TicTacToe.GameState.isAI) {
												if(TicTacToe.GameState.isValidMove) {
													TicTacToe.GameLogic.aiMove(TicTacToe.GameState);
													TicTacToe.GameLogic.updateScore(TicTacToe.GameState);
													gBoard.updateAIMove(TicTacToe.GameState);
													TicTacToe.GameLogic.endTurn(TicTacToe.GameState);
													TicTacToe.GameLogic.updateUI(TicTacToe.GameState);
												}
												
												if(TicTacToe.GameState.isGameOver) {
													updateGameOverStatus();		
													TicTacToe.GameState.currentScreen = "End";
													$('#shareScoreWidget').show();
                                                    if (TicTacToe.FBWrapper.accessToken == null) {
                                                        runIt();
                                                    } else {
                                                        $('#shareFacebookWidget').hide();
                                                    }
													return;
												}
											}
										}
									}
									
									TicTacToe.GameLogic.calcTime(TicTacToe.GameState);
									
								} else if(TicTacToe.GameState.currentScreen	==	"Info") {
								} else if(TicTacToe.GameState.currentScreen	==	"Splash") {
								}

							},

		/** draw the current screen */
		draw			:	function() {
								if(TicTacToe.GameState.currentScreen		==	"Game") {
									gBoard.draw(context);
								}
								else if(TicTacToe.GameState.currentScreen	==	"End")
								{
									gBoard.draw(context);
								}
								else if(TicTacToe.GameState.currentScreen	==	"Splash")
								{
								
								}
							}
	};
}();
