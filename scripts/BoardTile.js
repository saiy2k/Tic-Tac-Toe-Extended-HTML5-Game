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
*/
ZicZacZoe.BoardTile		=	function() {
	
	/**	image of the tile
		@type	image
		@private */
	var image;
	
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
	
	
	/**	
	*/
	this.update			=	function() {
		
	};
    
	/**	
	*/
    this.draw           =   function(ctx) {

    };
};
