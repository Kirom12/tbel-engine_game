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

	this.gridWidth = 100;
	this.Grid = new Grid(0,0, canvas.width, this.gridWidth);

	this.CreatePropagationZone = function()
	{

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
			this.Grid.fillZone(0, 0, 100, 5, 2);
			this.Grid.fillZone(0, 50, 50, 2, 2);
			this.Grid.fillZone(60, 6, 2, 50, 2);
			this.Grid.fillZone(80, 5, 2, 20, 2);

			this.GameObjects.push(new WaterReactionObject(this.Grid, 10, 10));
			this.GameObjects.push(new WaterReactionObject(this.Grid, 20, 20));
			this.GameObjects.push(new WaterReactionObject(this.Grid, 40, 12));
			this.GameObjects.push(new WaterReactionObject(this.Grid, 23, 64));

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
			if (Input.mouseClick) {
				//console.log(Math.floor(Input.MousePosition.x/this.Grid.caseLength));
				//console.log(Math.floor(Input.MousePosition.y/this.Grid.caseLength));
				this.WaterSources.push(new WaterPropagationObject(this.Grid, this.gridWidth, Math.floor(Input.MousePosition.x/this.Grid.caseLength), Math.floor(Input.MousePosition.y/this.Grid.caseLength), 200));
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
				if (this.WaterSources[i].casesPropagation > 0)
				{
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
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}