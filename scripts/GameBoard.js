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
    var hoverTileX;

    /** @private */
    var hoverTileY;
    
    /** @private */
    var selectedTileX;

    /** @private */
    var selectedTileY;
    
    /** @private */
    var currentPlayerID;
    
    /** @private */
    var tiles           =   [];
    
	this.init			=	function(ctx) {
        rowCount        =   9;
        colCount        =   9;
        currentPlayerID =   0;
        
        boardX          =   $('#boardCanvas').offset().left;
        boardY          =   $('#boardCanvas').offset().top;
        
        for (var i = 0; i < rowCount; i++)
        {
            tiles[i]    =   [];
            for (var  j = 0; j < colCount; j++)
            {
                tiles[i][j] =   -1;
            }
        }
        
		loadResources();
		setUpUI(ctx);
	};
    
    this.update         =   function(m, clk) {        
        var mx          =   (m.x - boardX);
        var my          =   (m.y - boardY);
        
        if(mx > 0 && my > 0 && mx < boardWidth && my < boardHeight)
        {
            hoverTileY          =   Math.floor(mx / tileWidth);
            hoverTileX          =   Math.floor(my / tileHeight);
        }
        
        if(clk !== null)
        {
            var cx          =   (clk.x - boardX);
            var cy          =   (clk.y - boardY);
            
            if(cx > 0 && cy > 0 && cx < boardWidth && cy < boardHeight)
            {
                selectedTileY       =   Math.floor(mx / tileWidth);
                selectedTileX       =   Math.floor(my / tileHeight);
                
                tiles[selectedTileX][selectedTileY] =   currentPlayerID;
            }
            
            if( currentPlayerID === 0 )
            {
                currentPlayerID = 1;
            }
            else
            {
                currentPlayerID = 0;
            }
        }
    };
    
    this.draw           =   function(ctx) {
        //ctx.drawImage(boardImage, 0, 0);
        
        for (var i = 0; i < rowCount; i++)
        {
            var str = "";
            for (var  j = 0; j < colCount; j++)
            {
                var tileID  = tiles[i][j];
                
                str = str + ', ' + tileID;

                if( tileID === 0 )
                {
                    //ctx.drawImage(xImage, j*tileWidth, i*tileHeight);
                    ctx.fillStyle   =   'rgb(255, 0, 0);';
                    ctx.beginPath();
                    ctx.rect(j*tileWidth, i*tileHeight, tileWidth, tileHeight);
                    ctx.closePath();
                    ctx.fill();
                    
                }
                else if( tileID === 1 )
                {
                    ctx.fillStyle   =   'rgb(255, 255, 0);';
                    ctx.beginPath();
                    ctx.rect(j*tileWidth, i*tileHeight, tileWidth, tileHeight);
                    ctx.closePath();
                    ctx.fill();
                }
                
                ctx.beginPath();
                ctx.rect(i*tileWidth, j*tileHeight, tileWidth, tileHeight);
                ctx.closePath();
                ctx.stroke();
            }
            console.log(str);
        }
        
        console.log();
        
        ctx.fillStyle   =   'rgba(255, 0, 0, 0.5);';
        ctx.beginPath();
        ctx.rect(hoverTileY*tileWidth, hoverTileX*tileHeight, tileWidth, tileHeight);
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
            
            oImage                  =   new Image();
            oImage.src              =   'images/oTile2X.png';
            
            xImage                  =   new Image();
            xImage.src              =   'images/xTile2X.png';
		}
		else
		{
            boardWidth              =   320;
            boardHeight             =   320;
            
            tileWidth               =   boardWidth / colCount;
            tileHeight              =   boardHeight / rowCount;
            
			boardImage				=	new Image();
			boardImage.src			=	'images/board.jpg';
            
            oImage                  =   new Image();
            oImage.src              =   'images/oTile2X.png';
            
            xImage                  =   new Image();
            xImage.src              =   'images/xTile2X.png';
		}
	};
	
	/** @private */
	var setUpUI			=	function(ctx)
	{
	};
};