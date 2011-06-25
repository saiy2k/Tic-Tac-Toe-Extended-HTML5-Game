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
    This game Board class the 
    
	@class
*/
ZicZacZoe.GameBoard		=	function() {

	/** @private */
	var boardImage;
    
    /** @private */
    var xImage;
    
    /** @private */
    var oImage;
    
    /** @private */
    var boardX;
    
    /** @private */
    var boardY;
    
    /** @private */
    var boardWidth;
    
    /** @private */
    var boardHeight;
    
    /** @private */
    var rowCount;
    
    /** @private */
    var colCount;
    
    /** @private */
    var tileWidth;
    
    /** @private */
    var tileHeight;
    
    /** @private */
    var tiles           =   [];
    
	this.init			=	function(ctx, rows, cols) {
        rowCount        =   rows;
        colCount        =   cols;
        currentPlayerID =   0;
        
        boardX          =   $('#boardCanvas').offset().left;
        boardY          =   $('#boardCanvas').offset().top;
		
		tiles			=	ZicZacZoe.GameState.tiles;
		
		refreshUI();
		loadResources();
	};
	
	this.resize			=	function() {
		refreshUI();
		loadResources();
	};
	
	this.x				=	function() {	return		boardX;			}
	this.y				=	function() {	return		boardY;			}
	this.width			=	function() {	return		boardWidth;		}
	this.height			=	function() {	return		boardHeight;	}
	this.tileWidth		=	function() {	return		tileWidth;		}
	this.tileHeight		=	function() {	return		tileHeight;		}
	
	this.update			=	function() {
		
	};
    
    this.draw           =   function(ctx) {
        ctx.drawImage(boardImage, 0, 0);
        
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
        
        ctx.fillStyle   =   'rgba(255, 0, 0, 0.5);';
        ctx.beginPath();
        ctx.rect(ZicZacZoe.GameState.hoverTileX*tileWidth, ZicZacZoe.GameState.hoverTileY*tileHeight, tileWidth, tileHeight);
        ctx.closePath();
        ctx.fill();
    };
	
	/** @private */
	var loadResources	=	function()
	{
		var strSize;
		
		if ( $(window).width() > 800 )
			strSize					=	'2X';
		else
			strSize					=	'';
		
		boardImage				=	new Image();
		boardImage.src			=	'images/board' + strSize + '.jpg';
		
		oImage                  =   new Image();
		oImage.src              =   'images/oTile' + strSize + '.png';
		
		xImage                  =   new Image();
		xImage.src              =   'images/xTile' + strSize + '.png';
	};
	
	/** @private */
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
};