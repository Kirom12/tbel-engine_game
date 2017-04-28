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
function StartScreenScene() 
{
	this.name = "StartScene";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.WorldSize = new Vector(4096,4096);

	this.Maps = [];

	this.Buttons = {};

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

			//Get map from localStorage
			for (let i = 0; i < localStorage.length; i++)
			{
				this.Maps.push({name: localStorage.key(i), data: localStorage.getItem(localStorage.key(i))});
			}

			for (let i in this.Maps)
			{
				this.Buttons["Map" + i] = new Button(this.Maps[i].name, "Arial");
			}

			console.log(this.Maps);
			console.log(this.Buttons);

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

			if (this.Maps.length === 0) {
				Application.currentMap = "Random";
				Application.LoadedScene = Scenes["WaterTest"];
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

			j = 0;

			for (let i in this.Buttons)
			{
				this.Buttons[i].Render(canvas.width/2-20, (j+1)*50);
				
				if (Input.mouseClick)
				{
					if (Physics.PointBoxCollision(Input.MousePosition, this.Buttons[i].Box)) {
						Application.currentMap = this.Maps[j].name;

						Application.LoadedScene = Scenes["WaterTest"];
					}
				}

				j++;	
			}
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}