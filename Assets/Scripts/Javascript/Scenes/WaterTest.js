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
	this.GameObjects = [];

	this.WaterSources = [];

	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.WorldSize = new Vector(4096,4096);

	this.gridWidth = 15;
	this.Grid = new Grid(0,0, 900, this.gridWidth);
	this.maxWaterPropagation = 10;

	this.Time = Time.Time;

	this.CountActivated =
	{
		pirateObjects: 0,
		treeObjects: 0
	}

	this.GameOver = function()
	{
		Print('Game Over !');

		Application.LoadedScene = Scenes["GameOver"];
	}

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
			// operation start
			Time.SetTimeWhenSceneBegin();

			this.Grid.SetToMultidimensionnalArray();

			//Set obstacle

			this.Grid.FillZone(0, 0, this.gridWidth, this.gridWidth, 2);

			for (let i = 0; i < 20; i++)
			{
				this.Grid.FillZone(Math.floor(Math.random()*this.gridWidth), Math.floor(Math.random()*this.gridWidth), 1, 1, 10);
			}

			for (let i = 0; i < 20; i++)
			{
				switch(Math.floor(Math.random()*3))
				{
					case 0:
						this.GameObjects.push(new TreeObject(this.Grid, Math.floor(Math.random()*this.gridWidth), Math.floor(Math.random()*this.gridWidth)));
						break;
					case 1:
						this.GameObjects.push(new VillagerObject(this.Grid, Math.floor(Math.random()*this.gridWidth), Math.floor(Math.random()*this.gridWidth)));
						break;
					case 2:
						this.GameObjects.push(new PirateObject(this.Grid, Math.floor(Math.random()*this.gridWidth), Math.floor(Math.random()*this.gridWidth)));
						break;
				}
			}


			let startX = Math.floor(Math.random()*this.gridWidth);
			let startY = Math.floor(Math.random()*this.gridWidth);

			this.Grid.FillZone(startX, startY, 2, 1, 0);
			this.WaterSources.push(new WaterPropagationObject(this, this.Grid, this.gridWidth, this.GameObjects, startX, startY));

			this.Grid.TilesNew = this.Grid.CloneArray(this.Grid.Tiles);



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
			if (Input.mouseLongClick)
			{
				//console.log(Math.floor(Input.MousePosition.x/this.Grid.caseLength));
				//console.log(Math.floor(Input.MousePosition.y/this.Grid.caseLength));
				//this.WaterSources.push(new WaterPropagationObject(this, this.Grid, this.gridWidth, this.GameObjects, Math.floor(Input.MousePosition.x/this.Grid.caseLength), Math.floor(Input.MousePosition.y/this.Grid.caseLength), this.maxWaterPropagation));
				let x = Math.floor(Input.MousePosition.x/this.Grid.caseLength);
				let y = Math.floor(Input.MousePosition.y/this.Grid.caseLength)

				if (x < this.gridWidth && y < this.gridWidth)
				{
					let cellId = this.Grid.GetCellType(x, y);

					if (cellId === 2) {
						this.Grid.FillZone(x, y, 1, 1, 0);	
					}
				}
			}

			for (var i = 0; i < this.WaterSources.length; i++) 
			{
				this.WaterSources[i].Start();
			}
			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) 
			{
				this.Groups[i].Start();
			}

			this.Grid.DrawMultidimensionnalArray();


			for (let i = 0; i < this.WaterSources.length; i++) 
			{
				// if (this.WaterSources[i].casesPropagation > 0)
				if (this.WaterSources[i].Time + this.WaterSources[i].refreshTime < Time.Time) {
					this.WaterSources[i].Time = Time.Time;
					this.WaterSources[i].Propagation();
					this.WaterSources[i].casesPropagation--;
				}
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

			ctx.font = '20px Arial';
			ctx.fillStyle = "orange";
			ctx.fillText("Pirates : " + this.CountActivated.pirateObjects, 920, 80);
			ctx.fillText("Arbres : " + this.CountActivated.treeObjects, 920, 120);
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}