/**
* Initializes the grid and obstacle
* @class 
*
* @param {Number} _x - original position x of the grid
* @param {Number} _y - original position y of the grid
* @param {Number} _length - Desired length in pixel for the grid.
* @param {Number} _cases - number of Cases desired.
*
* */ 
function Grid(_x, _y, _length, _cases) 
{
	this.x = _x;
	this.y = _y;
	this.length = _length;
	this.cases = _cases;
	this.caseLength = this.length / this.cases
	this.Tiles = [];
	this.TilesNew = [];

	this.BestPath = null;

	this.tilesCorrection =
	{
		y: -36,
		width: 70
	};

/**
*
* Draw the grid
* default black color 
* 
* */
	this.Draw = function() 
	{
		ctx.strokeStyle = '#000000';
		ctx.fillStyle = '#000000';
		for (var i = 0; i * this.caseLength < this.length; i++) 
		{
			for (var j = 0; j * this.caseLength < this.length; j++) 
			{
				ctx.strokeRect(this.x + i * this.caseLength, this.y + j * this.caseLength, this.caseLength, this.caseLength);
				// Draw Obstacles
				if (this.Tiles[j * this.cases + i] == 1) {
					ctx.fillStyle = '#000000';
					ctx.fillRect(this.x + i * this.caseLength, this.y + j * this.caseLength, this.caseLength, this.caseLength);
				}
			}
		}
	}

	this.DrawMultidimensionnalArray = function(grid = false) 
	{
		let tileImage = [null, null];

		for (let x = 0; x < this.cases; x++)
		{
			for (let y = 0; y < this.cases; y++)
			{
				ctx.fillStyle = '#d9d7d6';

				if (grid) {
					ctx.strokeStyle="#66645e";
					ctx.strokeRect(x*this.caseLength, y*this.caseLength, this.caseLength, this.caseLength);
				}

				switch (this.Tiles[x][y])
				{
					case 0:
						continue;
						break;
					case 1: //Water
						tileImage[0] = Images['water-block'];
						break;
					case 2: //Stone
						tileImage[0] = Images['stone-block'];
						break;
					case 3:
						tileImage[0] = Images['brown-block'];
						break;
					case 4:
						tileImage[0] = Images['grass-block'];
						tileImage[1] = Images['tree-tall'];
						break;
					case 5:
						tileImage[0] = Images['wood-block'];
						tileImage[1] = Images['character-girl'];
						break;
					case 6:
						continue;
						break;
					case 7:
						tileImage[0] = Images['wood-block'];
						tileImage[1] = Images['character-boy'];
						break;
					case 8:
						tileImage[0] = Images['water-block'];
						tileImage[1] = Images['character-boy'];
						break;
					case 10:
						tileImage[0] = Images['wall-block'];
						break;
					default:

				}

				if (tileImage[0]) {
					ctx.drawImage(tileImage[0],
								x*this.caseLength,
								y*this.caseLength+this.tilesCorrection.y,
								this.caseLength,
								this.caseLength+this.tilesCorrection.width);
					tileImage[0] = null;

					if (tileImage[1]) {
						ctx.drawImage(tileImage[1],
							x*this.caseLength,
							y*this.caseLength+this.tilesCorrection.y-25,
							this.caseLength,
							this.caseLength+this.tilesCorrection.width);
						tileImage[1] = 0;
					}
				} else {
					ctx.fillRect(x*this.caseLength, y*this.caseLength, this.caseLength, this.caseLength);
				}
			}
		}
	}

	this.SetToMultidimensionnalArray = function()
	{
		for (let x = 0; x < this.cases; x++)
		{
			
			this.Tiles[x] = [];
			this.TilesNew[x] = [];

			for (let y = 0; y < this.cases; y++)
			{
				this.Tiles[x][y] = 0;
			}
		}
	}

/**
*
* Get the mouse position on the Grid<br/>
* exemple => position.x = 0 , position.y = 0. Return Index 0
*
**/	

	this.GetMousePosition = function () 
	{
		var x = Input.MousePosition.x / this.caseLength |0;
		var y = Input.MousePosition.y / this.caseLength |0;

		return new Vector(x, y);	
	}

/**
*
* On debug mode, show the short path
*
**/	

	this.ShowPathDebug = function() 
	{
		if (Application.debugMode) 
		{
			if(this.BestPath != null){
				for (vector of this.BestPath) 
				{
					ctx.fillStyle = 'rgba(51,255,255,0.33)';
					ctx.fillRect(this.x + vector.x * this.caseLength, this.y + vector.y * this.caseLength, this.caseLength, this.caseLength);
				}	
			}
		}
	}

	this.CloneArray = function(Array)
	{
		let NewArray = [];

		for (let i in Array) {
			NewArray[i] = [];
			NewArray[i] = Array[i].slice();
		}

		return NewArray;
	}

	this.ResetGrid = function(Array)
	{
		for (let x = 0; x < Array.length; x++)
		{
			for (let y = 0; y < Array[x].length; y++)
			{
				Array[x][y] = 0;
			}
		}
	}

	this.FillZone = function(startX, startY, endX, endY, id)
	{
		for (let x = startX; x < startX+endX; x++)
		{
			for (let y = startY; y < startY+endY; y++)
			{
				this.Tiles[x][y] = id;
				this.TilesNew[x][y] = id;
			}
		}
	}

	this.GetCellType = function(x, y)
	{
		return this.Tiles[x][y];
	}
}


	