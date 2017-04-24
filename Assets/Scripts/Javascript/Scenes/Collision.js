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
function CollisionScene() 
{
	this.name = "Collision";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.WorldSize = new Vector(4096,4096);

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

			this.GameObjects.push(new SquareObject(400, 400, 'green'));
			this.GameObjects.push(new SquareObject(canvas.width/2, canvas.height/2));

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

			if (Input.KeysDown[37]) //Left
			{
				this.GameObjects[1].Transform.RelativePosition.x -= 10;
			}
			else if (Input.KeysDown[39]) //Right
			{
				this.GameObjects[1].Transform.RelativePosition.x += 10;
			}
			else if (Input.KeysDown[38]) //Up
			{
				this.GameObjects[1].Transform.RelativePosition.y -= 10;
			}
			else if (Input.KeysDown[40]) //Down
			{
				this.GameObjects[1].Transform.RelativePosition.y += 10;
			}

			console.log(Physics.BoxBoxCollision(
				new Box(this.GameObjects[1].Transform.Position.x,
					this.GameObjects[1].Transform.Position.y,
					this.GameObjects[1].Transform.Size.x,
					this.GameObjects[1].Transform.Size.y),
				new Box(this.GameObjects[0].Transform.Position.x,
					this.GameObjects[0].Transform.Position.y,
					this.GameObjects[0].Transform.Size.x,
					this.GameObjects[0].Transform.Size.y)));
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