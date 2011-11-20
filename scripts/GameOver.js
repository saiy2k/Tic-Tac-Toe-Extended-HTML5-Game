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
    Shows the Game Over Screen
    
	@class
	@param	{context} 	ctx		2D drawing context to the HTML5 canvas
*/
ZicZacZoe.GameOver		=	function(ctx) {
	/**	Background Picture
		@type	image
		@private */
	var bgImage;

    /**	x co-ordinate of the board
		@type	double
		@private */
    var boardX;

    /**	y co-ordinate of the board
		@type	double
		@private */
    var boardY;
    
    /**	width of the board
		@type	double
		@private */
    var boardWidth;
    
    /**	height of the board
		@type	double
		@private */
    var boardHeight;
    
    /**	2D Array of tiles
		@type	BoardTile[][]
		@private */
    var tiles           =   [];
	
	/** Player who won the game
		@type	string
		@private */
	var statusString;
	
	/** string describing the status of the game
		@type	string
		@private */
	var statusSubString;
	
	/** font size to draw the game over status
		@type	int
		@private */
	var statusFontSize;
	
	
	/** Loads all the images appropriate for the board. Based on the screen
		size, either a high-res or low-res image is selected
		@private */
	var loadResources	=	function()
	{
		var strSize;
		
		if ( $(window).width() > 800 )
			strSize					=	'2X';
		else
			strSize					=	'';
		
		bgImage						=	new Image();
		bgImage.src					=	'images/gameOver' + strSize + '.png';
	};
	
	/** Updates the x, y, width, height variables based on the current screen size
		@private */
	var refreshUI					=	function()
	{
		var	boardCanvas				=	document.getElementById('boardCanvas');
		
		if ( $(window).width() > 800 ) {
			boardWidth              =   480;
            boardHeight             =   480;
		}
		else {
			boardWidth              =   320;
            boardHeight             =   320;
		}
		
		boardCanvas.width			=	boardWidth;
		boardCanvas.height			=	boardHeight;
		
		statusFontSize				=	boardWidth / 10;
	};

	/** @returns	{double}	x co-ordinate of the board */
	this.x				=	function() {	return		boardX;			}
	
	/** @returns	{double}	y co-ordinate of the board */
	this.y				=	function() {	return		boardY;			}
	
	/** @returns	{double}	width of the board */
	this.width			=	function() {	return		boardWidth;		}
	
	/** @returns	{double}	height of the board */
	this.height			=	function() {	return		boardHeight;	}
	
	/** sets the status string to be displayed */
	this.setStatus		=	function(tStatus) {
		statusString	=	tStatus;
	}
	
	this.setSubStatus	=	function(tStatus) {
		statusSubString	=	tStatus;
	}
	
	/** refreshes the board layout based on the screen size	*/
	this.resize			=	function() {
		refreshUI();
		loadResources();
	};
	
	/** Updates the Screen
		@param	{point}		m		the current mouse co-ordinate
		@param	{bool}		clk		indicates if the mouse is clicked */
	this.update			=	function(m, clk) {
	};
    
	/**	Draw the screen
		@param	{context} 	ctx		2D drawing context to the HTML5 canvas */
    this.draw           =   function(ctx) {
		ctx.drawImage(bgImage, 0, 0);
		
		ctx.fillStyle   =   'rgba(223/255.0, 170/255.0, 110/255.0, 1.0);';
		ctx.textAlign	=	'center';
		ctx.font		=	statusFontSize + 'px Arial';
		ctx.fillText(statusString, boardWidth / 2, boardHeight / 3);
		
		ctx.font		=	(statusFontSize/4) + 'px Arial';
		ctx.fillText(statusSubString, boardWidth / 2, boardHeight / 3 + 30);
    };
	
	boardX          	=   $('#boardCanvas').offset().left;
	boardY          	=   $('#boardCanvas').offset().top;
	
	refreshUI();
	loadResources();
};