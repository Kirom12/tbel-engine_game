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
			this.Grid.fillZone(50, 50, 5, 5, 2)

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
				this.GameObjects.push(new WaterPropagationObject(this.Grid, this.gridWidth, Math.floor(Input.MousePosition.x/this.Grid.caseLength), Math.floor(Input.MousePosition.y/this.Grid.caseLength), 50));
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


			for (let i = 0; i < this.GameObjects.length; i++) 
			{
				if (this.GameObjects[i].casesPropagation > 0)
				{
					this.GameObjects[i].Propagation();
					this.GameObjects[i].casesPropagation--;
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