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
    This class is the core of the game. It handles the game loop and all
	other components of game.
	
	@namespace
*/
ZicZacZoe.GameManager	=	function() {

	/** @private */
    var FPS				=	30.0;

    /** @private */
    var context;
    
    /** @private */
	var gBoard          =	new ZicZacZoe.GameBoard();
	
	/** @scope ZicZacZoe.GameManager */	
	return {
		/** init function */
		init			:	function()
							{
                                var canvas              =	document.getElementById("boardCanvas");
		                        context					=	canvas.getContext('2d');
                                
                                context.fillStyle       =   '#fff';
        
								ZicZacZoe.GameState.reset();
								gBoard.init(context, ZicZacZoe.GameState.rows, ZicZacZoe.GameState.cols);
								
								setInterval(ZicZacZoe.GameManager.loop, (1/FPS) * 1000);
							},
		
		/** game loop */
		loop			:	function()
							{
								ZicZacZoe.GameManager.update();
								ZicZacZoe.GameManager.draw();
							},
		/** update */
		update			:	function()
							{								
								var mouse	=   ZicZacZoe.InputManager.getMouse();
                                var click   =   ZicZacZoe.InputManager.getClickIfAny();
                                
								ZicZacZoe.GameState.update(gBoard, mouse, click);
								//gBoard.update();
							},
		/** draw */
		draw			:	function()
							{
                                context.fillStyle   =   '#fff';
                                context.beginPath();
                                context.rect(0, 0, 480, 480);
                                context.closePath();
                                context.fill();
                                
                                gBoard.draw(context);
							}
	};
}();