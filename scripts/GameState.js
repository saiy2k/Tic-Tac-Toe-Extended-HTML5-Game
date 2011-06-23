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
    GameState
	
	@namespace
*/
ZicZacZoe.GameState	=	function() {

	var updateCurrentTile			=	function(gBoard, m, clk)
	{
		var t			=	ZicZacZoe.GameState;
		var mx          =   (m.x - gBoard.x());
		var my          =   (m.y - gBoard.y());
		t.hoverTileX	=	-1;
		t.hoverTileY	=	-1;

		if(mx > 0 && my > 0 && mx < gBoard.width() && my < gBoard.height())
		{
			t.hoverTileX			=   Math.floor(mx / gBoard.tileWidth());
			t.hoverTileY			=   Math.floor(my / gBoard.tileHeight());
			
			if ( t.tiles[t.hoverTileY][t.hoverTileX] !== -1)
			{
				t.hoverTileX		=	-1;
				t.hoverTileY		=	-1;
			}
		}

		if(clk !== null)
		{									
			if( t.hoverTileX != -1 )
			{
				t.selectedTileX	=	t.hoverTileX;
				t.selectedTileY	=	t.hoverTileY;
				t.tiles[t.selectedTileY][t.selectedTileX] =   t.currentPlayerID;
			}
			
			for (var j = 0; j < 10; j++)
			{
				var str = '';
				for (var  i = 0; i < 10; i++)
				{
					var til	=	ZicZacZoe.GameState.tiles[j][i];
					str = str + ', ' + til;
				}
				//console.log(str);
			}
		}
	};
	
	var checkMove					=	function()
	{
	/*
		var t			=	ZicZacZoe.GameState;
		var	p			=	t.currentPlayerID;
		var giveScore;
		var	tmpScore	=	0;

		giveScore		=	true;
		for ( var i = t.selectedTileX; i >= 0 && i > t.selectedTileX - 5 ; i-- )
		{
			if ( t.tiles[i][t.selectedTileY] != p )
			{
				giveScore	=	false;
				break;
			}
		}
		if ( giveScore )
			tmpScore++;
		
			
		giveScore	=	true;
		var str = '';
		for ( var i = t.selectedTileX; i < 10 && i < t.selectedTileX + 5 ; i++ )
		{
			console.log(i + ', ' + t.selectedTileY + ':  ' + t.tiles[i][t.selectedTileY]);
			str			=	str + ', ' + t.tiles[i][t.selectedTileY];
			if ( t.tiles[i][t.selectedTileY] != p )
			{
				giveScore	=	false;
				break;
			}
		}
		if ( giveScore )
			tmpScore++;


		giveScore	=	true;
		var str = '';
		for ( var i = t.selectedTileX; i < 10 && i < t.selectedTileX + 5 ; i++ )
		{
			console.log(i + ', ' + t.selectedTileY + ':  ' + t.tiles[i][t.selectedTileY]);
			str			=	str + ', ' + t.tiles[i][t.selectedTileY];
			if ( t.tiles[i][t.selectedTileY] != p )
			{
				giveScore	=	false;
				break;
			}
		}
		if ( giveScore )
			tmpScore++;

			
		
		if(p == 0)
			t.player1Score	+=	tmpScore;
		else
			t.player2Score	+=	tmpScore;
			
		console.log('t score' + tmpScore);
	*/
	};
	
	var endTurn						=	function()
	{
		var t			=	ZicZacZoe.GameState;
		
		if( t.currentPlayerID == 0 )
			t.currentPlayerID	=	1;
		else
			t.currentPlayerID	=	0;
	};
	
	/** @scope ZicZacZoe.GameState */
	return {
		/** init function */
		reset			:	function()
							{
								currentPlayerID		=	0;
								player1Score		=	0;
								player2Score		=	0;
								selectedTileX		=	0;
								selectedTileY		=	0;
								
								for (var j = 0; j < 10; j++)
								{
									ZicZacZoe.GameState.tiles[j]    =   [];
									for (var  i = 0; i < 10; i++)
									{
										ZicZacZoe.GameState.tiles[j][i] =   -1;
									}
								}
							},
							
		tiles           :   [],
		
		currentPlayerID	:	0,
		
		player1Score	:	0,
		player2Score	:	0,
		
		hoverTileX		:	0,
		hoverTileY		:	0,
		
		selectedTileX	:	0,
		selectedTileY	:	0,
		
		update			:	function(gBoard, m, clk)
							{
								updateCurrentTile(gBoard, m, clk);
								
								if ( clk !== null )
								{
									checkMove();
									endTurn();
								}
							},

		
	};
}();