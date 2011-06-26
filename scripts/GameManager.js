/*
Copyright 2011 Saiyasodharan (http://saiy2k.blogspot.com/)

This file is part of the open source game, Zic-Zac-Zoe (https://github.com/saiy2k/zic-zac-zoe/)

SpiroCanvas is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

SpiroCanvas is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Zic-Zac-Zoe.  If not, see <http://www.gnu.org/licenses/>.
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
	
	/** @scope ZicZacZoe.GameManager */
	return {
		/** Initializes the canvas context, game board, gamestate and sets the game loop */
		init			:	function()
							{
                                var canvas              =	document.getElementById("boardCanvas");
		                        context					=	canvas.getContext('2d');
        
								ZicZacZoe.GameState.reset();
								gBoard					=	new ZicZacZoe.GameBoard(context, ZicZacZoe.GameState.rows, ZicZacZoe.GameState.cols);
								
								setInterval(ZicZacZoe.GameManager.loop, (1/FPS) * 1000);
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

								gBoard.update(mouse, click);
								
								if ( click !== null )
								{
									ZicZacZoe.GameLogic.updateScore(ZicZacZoe.GameState);
									ZicZacZoe.GameLogic.endTurn(ZicZacZoe.GameState);
									ZicZacZoe.GameLogic.updateUI(ZicZacZoe.GameState);
									
									console.log(ZicZacZoe.GameState.currentPlayerID);
								}
							},

		/** draw the current screen */
		draw			:	function()
							{
                                gBoard.draw(context);
							}
	};
}();