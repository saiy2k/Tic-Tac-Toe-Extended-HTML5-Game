/*
Copyright 2011 Saiyasodharan (http://saiy2k.blogspot.com/)

This file is part of the open source game, Zic Zac Zoe (https://github.com/saiy2k/zic-zac-zoe/)

Zic Zac Zoe is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Zic Zac Zoe is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Zic Zac Zoe.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
    This class is the master class that manages the screen flow and
	updates the other components of the game

	@namespace
	@author			<a href="saiy2k.blogspot.com">Saiyasodharan</a>
*/
ZicZacZoe.GameManager	=	function() {

	/**	Frames per Second (30)
		@type	double
		@private */
    var FPS				=	30.0;

    /**	2D drawing context to the HTML5 canvas. This object is used to make all the draw calls
		@type	canvas context
		@private */
    var context;
    
    /** GameBoard object
		@type	ZicZacZoe.GameBoard
		@private */
	var gBoard;
	
	/**	GameOver Screen
		@type	ZicZacZoe.GameOver
		@private */
	var gOver;
	
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
			currentScreen		=	"Game";
			isAI				=	false;
			ZicZacZoe.GameState.reset();
			gBoard.reset();
		});
		
		$("#vsAIButton").click(function() {
			currentScreen		=	"Game";
			isAI				=	true;
			ZicZacZoe.GameState.reset();
			gBoard.reset();
		});
		
		$("#shareFacebookWidget").click(function() {
			var						shareString;
			var						st;
			
			st					=	ZicZacZoe.GameState;
			shareString			=	getShareString();
			
			console.log(shareString);
		});
		
		$("#shareTwitterWidget").click(function() {
			console.log("share in twitter");
		});
	}
	
	function getShareString() {
		var							shareString;
		var							st;
		
		st						=	ZicZacZoe.GameState;
		
		if(isAI) {
			shareString			=	"Player scored " + st.player1Score + " points in Zic Zac Zoe and won the game";			
		} else {
			if(st.currentPlayerID == 0)
				shareString		=	"Player scored " + st.player1Score + " points in Zic Zac Zoe and won the game";
			else 
				shareString		=	"Player scored " + st.player2Score + " points in Zic Zac Zoe and won the game";
		}
		
		return						shareString;
	}
	
	/** @scope ZicZacZoe.GameManager */
	return {
		/** Initializes the canvas context, game board, gamestate and sets the game loop */
		init			:	function()
							{
								currentScreen			=	"Game";
							
                                var canvas              =	document.getElementById("boardCanvas");
		                        context					=	canvas.getContext('2d');
        
								ZicZacZoe.GameState.reset();
								gBoard					=	new ZicZacZoe.GameBoard(context, ZicZacZoe.GameState.rows, ZicZacZoe.GameState.cols);
								gOver					=	new ZicZacZoe.GameOver(context);
								
								setInterval(ZicZacZoe.GameManager.loop, (1/FPS) * 1000);
																
								setupJqueryHandlers();
							},

		/** Game Loop. Getting called as per the given FPS */
		loop			:	function()
							{
								ZicZacZoe.GameManager.update();
								ZicZacZoe.GameManager.draw();
							},

		/** update the current screen */
		update			:	function()
							{								
								var mouse	=   ZicZacZoe.InputManager.getMouse();
                                var click   =   ZicZacZoe.InputManager.getClickIfAny();

								var	mx		=	mouse.x - gBoard.x();
								var my		=	mouse.y - gBoard.y();
															
								if(currentScreen		==	"Game")
								{
									if(mx > 0 && my > 0 && mx < gBoard.width() && my < gBoard.height())
									{
										gBoard.update(mouse, click);
										
										if ( click != null )
										{
											ZicZacZoe.GameLogic.updateScore(ZicZacZoe.GameState);												
											ZicZacZoe.GameLogic.endTurn(ZicZacZoe.GameState);
											ZicZacZoe.GameLogic.updateUI(ZicZacZoe.GameState);
											
											if(isAI) {
												ZicZacZoe.GameLogic.aiMove(ZicZacZoe.GameState);
												gBoard.updateAIMove(ZicZacZoe.GameState);
												ZicZacZoe.GameLogic.updateScore(ZicZacZoe.GameState);												
												ZicZacZoe.GameLogic.endTurn(ZicZacZoe.GameState);
												ZicZacZoe.GameLogic.updateUI(ZicZacZoe.GameState);
											}
											
											if(ZicZacZoe.GameState.isGameOver)
											{
												if( ZicZacZoe.GameState.player1Score > ZicZacZoe.GameState.player2Score )
													gOver.setStatus("Player 1 Wins");
												else if( ZicZacZoe.GameState.player1Score < ZicZacZoe.GameState.player2Score )
													gOver.setStatus("Player 2 Wins");
												else
													gOver.setStatus("Match Draw");
												currentScreen = "End";
												
												$('#shareScoreWidget').show();
											}
										}
									}
									
									ZicZacZoe.GameLogic.calcTime(ZicZacZoe.GameState);
									
								}
								else if(currentScreen	==	"End")
								{
									if ( click != null )
									{
										gOver.update(mouse, click);
									}
								}
								else if(currentScreen	==	"Splash")
								{
								
								}
							},

		/** draw the current screen */
		draw			:	function()
							{
								if(currentScreen		==	"Game")
								{
									gBoard.draw(context);
								}
								else if(currentScreen	==	"End")
								{
									gBoard.draw(context);
									gOver.draw(context);
								}
								else if(currentScreen	==	"Splash")
								{
								
								}
							}
	};
}();