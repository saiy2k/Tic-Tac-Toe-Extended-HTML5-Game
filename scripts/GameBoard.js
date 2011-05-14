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
    This class the game Board
    
	@class
*/
ZicZacZoe.GameBoard		=	function() {

	/** @private */
	var boardImage;
    
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
    var selectedTileX;

    /** @private */
    var selectedTileY;
    
	this.init			=	function(ctx) {
        rowCount        =   9;
        colCount        =   9;
        
        boardX          =   $('#boardCanvas').offset().left;
        boardY          =   $('#boardCanvas').offset().top;
        
		loadResources();
		setUpUI(ctx);
	};
    
    this.update         =   function(m) {        
        var mx          =   (m.x - boardX);        var my          =   (m.y - boardY);
        
        if(mx > 0 && my > 0 && mx < boardWidth && my < boardHeight)
        {
            selectedTileX       =   Math.floor(mx / tileWidth);
            selectedTileY       =   Math.floor(my / tileHeight);
        }
    };
    
    this.draw           =   function(ctx) {        
        for (var i = 0; i < rowCount; i++)
        {
            for (var  j = 0; j < colCount; j++)
            {
                ctx.beginPath();
                ctx.rect(i*tileWidth, j*tileHeight, tileWidth, tileHeight);
                ctx.closePath();
                ctx.stroke();
            }
        }
        
        ctx.fillStyle   =   'rgba(255, 0, 0, 0.5);';
        ctx.beginPath();
        ctx.rect(selectedTileX*tileWidth, selectedTileY*tileHeight, tileWidth, tileHeight);
        ctx.closePath();
        ctx.fill();
        
    };
	
	/** @private */
	var loadResources	=	function()
	{
		if ( $(window).width() > 800 )
		{
            boardWidth              =   480;
            boardHeight             =   480;
            
            tileWidth               =   boardWidth / colCount;
            tileHeight              =   boardHeight / rowCount;
            
			boardImage				=	new Image();
			boardImage.src			=	'images/board2X.jpg';
		}
		else
		{
            boardWidth              =   320;
            boardHeight             =   320;
            
            tileWidth               =   boardWidth / colCount;
            tileHeight              =   boardHeight / rowCount;
            
			boardImage				=	new Image();
			boardImage.src			=	'images/board.jpg';
		}
	};
	
	/** @private */
	var setUpUI			=	function(ctx)
	{
		ctx.drawImage(boardImage, 0, 0);
	};
};