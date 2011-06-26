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
    Handles all the game board logic, incuding managing
	and updating all the tiles
    
	@class
	@param	{context} 	ctx		2D drawing context to the HTML5 canvas
	@param	{int}		rows	number of rows
	@param	{int}		cols	number of cols
*/
ZicZacZoe.GameBoard		=	function(ctx, rows, cols) {
	/**	Background Picture
		@type	image
		@private */
	var boardImage;
    
    /**	Player 1's Image
		@type	image
		@private */
    var xImage;
    
    /**	Player 2's Image
		@type	image
		@private */
    var oImage;
    
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
    
    /**	number of rows, as specified in GameState
		@type	int
		@private */
    var rowCount;
    
    /**	number of columns, as specified in GameState
		@type	int
		@private */
    var colCount;
    
    /**	width of a single tile ( = boardWidth / colCount )
		@type	double
		@private */
    var tileWidth;
    
    /**	height of a single tile ( = boardHeight / rowCount )
		@type	double
		@private */
    var tileHeight;
    
    /**	2D Array of tiles
		@type	BoardTile[][]
		@private */
    var tiles           =   [];
	
	
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
		
		boardImage					=	new Image();
		boardImage.src				=	'images/board' + strSize + '.jpg';
		
		oImage						=   new Image();
		oImage.src					=   'images/oTile' + strSize + '.png';
		
		xImage                  	=   new Image();
		xImage.src					=   'images/xTile' + strSize + '.png';
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
		
		tileWidth					=   boardWidth / colCount;
		tileHeight              	=   boardHeight / rowCount;
	};

	/** @returns	{double}	x co-ordinate of the board */
	this.x				=	function() {	return		boardX;			}
	
	/** @returns	{double}	y co-ordinate of the board */
	this.y				=	function() {	return		boardY;			}
	
	/** @returns	{double}	width of the board */
	this.width			=	function() {	return		boardWidth;		}
	
	/** @returns	{double}	height of the board */
	this.height			=	function() {	return		boardHeight;	}
	
	/** @returns	{double}	tile width of the board */
	this.tileWidth		=	function() {	return		tileWidth;		}
	
	/** @returns	{double}	tile height of the board */
	this.tileHeight		=	function() {	return		tileHeight;		}	
	
	/** refreshes the board layout based on the screen size	*/
	this.resize			=	function() {
		refreshUI();
		loadResources();
	};
	
	/** Updates the board state based on user input.
		Updates the tiles array
		@param	{point}		m		the current mouse co-ordinate
		@param	{bool}		clk		indicates if the mouse is clicked */
	this.update			=	function(m, clk) {
		var t			=	ZicZacZoe.GameState;
		var mx          =   (m.x - boardX);
		var my          =   (m.y - boardY);
		
		t.hoverTileX	=	-1;
		t.hoverTileY	=	-1;

		//if the mouse is hovered over the board, find the tile above which the mouse is placed
		if(mx > 0 && my > 0 && mx < boardWidth && my < boardHeight)
		{
			t.hoverTileX			=   Math.floor(mx / tileWidth);
			t.hoverTileY			=   Math.floor(my / tileHeight);
			
			if ( t.tiles[t.hoverTileY][t.hoverTileX] !== -1)
			{
				t.hoverTileX		=	-1;
				t.hoverTileY		=	-1;
			}
		}

		//if the mouse is clicked in a valid blank tile, then update the tiles[][] array appropriately
		if(clk !== null)
		{									
			if( t.hoverTileX != -1 )
			{
				t.selectedTileX	=	t.hoverTileX;
				t.selectedTileY	=	t.hoverTileY;
				t.tiles[t.selectedTileY][t.selectedTileX] =   t.currentPlayerID;
			}
		}
	};
    
	/**	Draw the board and the tiles
		@param	{context} 	ctx		2D drawing context to the HTML5 canvas */
    this.draw           =   function(ctx) {
	
		//draws the background image
        ctx.drawImage(boardImage, 0, 0);
        
		//draw all the tiles
        for (var j = 0; j < rowCount; j++)
        {
            for (var i = 0; i < colCount; i++)
            {
                var tileID  = tiles[j][i];

                if( tileID == 0 )
                {
					ctx.drawImage(xImage, i*tileWidth, j*tileHeight, tileWidth, tileHeight);
                }
                else if( tileID == 1 )
                {
					ctx.drawImage(oImage, i*tileWidth, j*tileHeight, tileWidth, tileHeight);
				}
            }
        }
        
		//mark the hovered tile in red color
        ctx.fillStyle   =   'rgba(255, 0, 0, 0.5);';
        ctx.beginPath();
        ctx.rect(ZicZacZoe.GameState.hoverTileX*tileWidth, ZicZacZoe.GameState.hoverTileY*tileHeight, tileWidth, tileHeight);
        ctx.closePath();
        ctx.fill();
    };
	
	
	rowCount        	=   rows;
	colCount        	=   cols;
	
	boardX          	=   $('#boardCanvas').offset().left;
	boardY          	=   $('#boardCanvas').offset().top;
	
	tiles				=	ZicZacZoe.GameState.tiles;

	refreshUI();
	loadResources();
};