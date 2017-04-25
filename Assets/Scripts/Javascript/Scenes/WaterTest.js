/**
 * Create a new Scene
 * <ul><li>Copy the content of this file in a new .js document.</li>
 * <li>Save the new file in Assets/Javascript/Scenes/NameOfYourScene.js .</li>
 * <li>In the index.html add below this comment <!-- Scene --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"</li>
 * <li>For create a new scene, use this instruction: "new Scene()".</li>
 * </ul>
 * <strong>To load your scene, use this instruction: "Application.LoadLevel(LevelName)".</strong>
 * 
 * @class
 * 
 * @return {Scene}
 * */
function WaterTestScene() 
{
	this.name = "WaterTest";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.WorldSize = new Vector(4096,4096);

	this.gridWidth = 25;
	this.Grid = new Grid(0,0, canvas.width, this.gridWidth);

	this.PropagationTiles = [];
	this.PropagationTilesNew = [];

	this.casesPropagation = 5;

	/**
	 * Called at the instruction new Scene().
	 * */
	this.Awake = function() 
	{
		console.clear();
		Print('System:Scene ' + this.name + " Created !");
	}
	
	/**
	 * Start the Scene and show a message in console or launch Update() if already started
	 * Called at the first use of scene in game.
	 * */
	this.Start = function() 
	{
		if (!this.started) 
		{
			Time.SetTimeWhenSceneBegin();

			this.Grid.SetToMultidimensionnalArray();

			this.Grid.Tiles[12][10] = 1;

			for (let x = 0; x < this.gridWidth; x++)
			{
				this.PropagationTiles[x] = [];
				this.PropagationTilesNew[x] = [];
			}

			this.Grid.TilesNew = this.Grid.CloneArray(this.Grid.Tiles);
			this.PropagationTiles = this.Grid.CloneArray(this.Grid.Tiles);

			// operation start
			this.started = true;
			Print('System:Scene ' + this.name + " Started !");
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	/**
	 * Start every GameObject, Group and apply the debug mode if asked
	 * Called each frame,code game is here.
	 * */
	this.Update = function() 
	{
		if (!Application.GamePaused) 
		{
			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) 
			{
				this.Groups[i].Start();
			}

			this.Grid.DrawMultidimensionnalArray();


			if (this.casesPropagation > 0) {
				this.GridPropagation();
				this.casesPropagation--;
			}
		}
		if (Application.debugMode) 
		{
			Debug.DebugScene();
		}
		this.GUI();
	}
	/**
	 * Called each frame, code all the GUI here.
	 * */
	this.GUI = function() 
	{
		if (!Application.GamePaused) 
		{
			//Show UI
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()

	this.GridPropagation = function()
	{
		for (let x = 0; x < this.PropagationTiles.length; x++)
		{
			for (let y = 0; y < this.PropagationTiles.length; y++)
			{
				if (this.PropagationTiles[x][y] === 1)
				{
					if (x-1 > -1) this.Grid.TilesNew[x-1][y] = this.PropagationTilesNew[x-1][y] = 1;
					if (x+1 < this.Grid.Tiles.length) this.Grid.TilesNew[x+1][y] = this.PropagationTilesNew[x+1][y] = 1;
					if (y-1 > -1) this.Grid.TilesNew[x][y-1] = this.PropagationTilesNew[x][y-1] = 1;
					if (y+1 < this.Grid.Tiles.length) this.Grid.TilesNew[x][y+1] = this.PropagationTilesNew[x][y+1] = 1;
				}
			}
		}

		this.PropagationTiles = this.Grid.CloneArray(this.PropagationTilesNew);
		this.Grid.ResetGrid(this.PropagationTilesNew);
		this.Grid.Tiles = this.Grid.CloneArray(this.Grid.TilesNew);
	}
}