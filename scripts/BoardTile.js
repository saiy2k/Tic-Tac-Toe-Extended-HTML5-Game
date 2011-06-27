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
    This class is used to visually represent a single tile
    
	@class
	@param	{image}	 	xImg	Image that represents X tile
	@param	{image}	 	oImg	Image that represents O tile
	@param	{int}		tX		x position of the tile in the tile array
	@param	{int}		tY		y position of the tile in the tile array
	@param	{double}	tWidth	width of the tile
	@param	{double}	tHeight	height of the tile
*/
ZicZacZoe.BoardTile		=	function(xImg, oImg, tX, tY, tWidth, tHeight) {
	
	/**	x image
		@type	image
		@private */
	var xImage;
	
	/**	o image
		@type	image
		@private */
	var oImage;
	
	/**	x co-ordinate of the tile in the grid
		@type	int
		@private */
    var tileX;

    /**	y co-ordinate of the tile in the grid
		@type	int
		@private */
    var tileY;
	
	/**	width of the tile
		@type	double
		@private */
    var tileWidth;
	
	/**	height of the tile
		@type	double
		@private */
    var tileHeight;

	/** State of the tile. Possible States:
		"empty", "x", "o", "toO", "toX"	
		@type	string
		@private */
	var	tileState;
	
	/**	Key value (ranges from 0.0 to 1.0). Used to animate the tile.
		@type	double
		@private */
	var	keyValue;
	
	/**	Updates the Key value if the tile is is animation state */
	this.update			=	function() {
		if (tileState	==	"toX")
		{
			if (keyValue	>=	1.0)
				tileState	=	"x";
			keyValue		+=	0.05;
		}
		if (tileState	==	"toO")
		{
			if (keyValue	>=	1.0)
				tileState	=	"o";
			keyValue		+=	0.05;
		}
	};
    
	/**	Draws the current tile, based on the state and keyValue, if the tile is under animation
		@param	{context}	ctx		2D Drawing context of the Canvas */
    this.draw           =   function(ctx) {
		if (tileState	==	"x")
			ctx.drawImage(xImage, tileX*tileWidth, tileY*tileHeight, tileWidth, tileHeight);
		else if (tileState	==	"o")
			ctx.drawImage(oImage, tileX*tileWidth, tileY*tileHeight, tileWidth, tileHeight);
		else if (tileState	==	"toX")
		{
			ctx.globalAlpha	=	keyValue;
			ctx.drawImage(xImage,
				tileX*tileWidth - (tileWidth / 2) * (1.0 - keyValue),
				tileY*tileHeight - (tileHeight / 2) * (1.0 - keyValue),
				(tileWidth * (2.0 - keyValue)),
				tileHeight * (2.0 - keyValue));
			ctx.globalAlpha	=	1.0;
			
			console.log(keyValue);
		}
		else if (tileState	==	"toO")
		{
			ctx.globalAlpha	=	keyValue;
			ctx.drawImage(oImage, tileX*tileWidth, tileY*tileHeight, tileWidth / keyValue, tileHeight / keyValue);
			ctx.globalAlpha	=	1.0;
		}	
    };

	/** Sets the state of the tile. And resets the keyValue to 0.0
		@param	{int}		tState	state of the tile, where -1 is empty, 0 is X and 1 is O */
	this.setState		=	function(tState) {
		switch (tState)
		{
			case	-1:		tileState = "empty";		break;
			case	0:		tileState = "toX";			break;
			case	1:		tileState = "toO";			break;
		}
		
		keyValue		=	0.0;
	};
	
	tileState			=	"empty";
	xImage				=	xImg;
	oImage				=	oImg;
	tileX				=	tX;
	tileY				=	tY;
	tileWidth			=	tWidth;
	tileHeight			=	tHeight;
};
