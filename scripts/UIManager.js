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
    This class handles all the resources files and is responsible for the UI
	
	@class
*/
ZicZacZoe.UIManager		=	function() {

	/** @private */
	var boardImage;
		
	/** @private */
	var context;
	
	this.init			=	function()
	{
		loadResources();
		setUpUI();
	};
	
	/** @private */
	var loadResources	=	function()
	{
		if ( $(window).width() > 800 )
		{
			boardImage				=	new Image();
			boardImage.src			=	'images/board2X.jpg';
		}
		else
		{
			boardImage				=	new Image();
			boardImage.src			=	'images/board.jpg';
		}
	};
	
	/** @private */
	var setUpUI			=	function()
	{
		var canvas				=	document.getElementById("boardCanvas");
		context					=	canvas.getContext('2d');
		
		context.drawImage(boardImage, 0, 0);
	};
};