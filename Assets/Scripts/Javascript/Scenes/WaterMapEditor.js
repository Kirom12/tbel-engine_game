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
function WaterMapEditorScene() 
{
	this.name = "WaterMapEditor";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.WorldSize = new Vector(4096,4096);

	this.gridWidth = 15;
	this.Grid = new Grid(0,0, 900, this.gridWidth);

	this.selectedTile = 0;
	this.selectedPositionArray = 6;

	this.tileSprites = [];

	this.tilesData =
	{
		width: 101,
		height: 170
	}

	this.Buttons =
	{
		save: new Button("Sauvegarder", "Arial")
	}

	this.Input; this.BodyElement;

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
			// operation start

			this.Grid.SetToMultidimensionnalArray();

			this.Grid.FillZone(0, 0, this.gridWidth, this.gridWidth, 2);

			this.Grid.Tiles = JSON.parse(LocalStorage.Load(Application.currentMap));

			//Set tiles buttons
			this.tileSprites =
			[
				{id: 1, img: Images['water-block']},
				{id: 2, img: Images['stone-block']},
				{id: 3, img: Images['brown-block']},
				{id: 5, img: [Images['wood-block'], Images['character-girl']]},
				{id: 7, img: [Images['wood-block'], Images['character-boy']]},
				{id: 10, img: Images['wall-block']},
				{id: 0, img: Images['wrong-cross']}
			]

			//Set position for click event
			for (let i in this.tileSprites)
			{
				this.tileSprites[i].Position = new Vector(900+40, i*this.tilesData.height/1.5);
				this.tileSprites[i].Size = new Vector(this.tilesData.width/1.5, this.tilesData.height/1.5);
			}

			this.tileSprites[6].Position = new Vector(900+40, 6*this.tilesData.height/1.5+30);
			this.tileSprites[6].Size = new Vector(this.tilesData.width/1.5, this.tilesData.width/1.5);

			//Set input
			this.Input = document.createElement("input");
			this.BodyElement = document.getElementsByTagName("body");

			this.Input.setAttribute("type", "text");
			this.Input.setAttribute("id", "save_input");

			this.Input.style.left = "920px";
			this.Input.style.top = "820px";

			this.Input.value = Application.currentMap;

			this.BodyElement[0].appendChild(this.Input);

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

			if (Input.mouseLongClick)
			{
				//console.log(Math.floor(Input.MousePosition.x/this.Grid.caseLength));
				//console.log(Math.floor(Input.MousePosition.y/this.Grid.caseLength));
				//this.WaterSources.push(new WaterPropagationObject(this, this.Grid, this.gridWidth, this.GameObjects, Math.floor(Input.MousePosition.x/this.Grid.caseLength), Math.floor(Input.MousePosition.y/this.Grid.caseLength), this.maxWaterPropagation));
				let x = Math.floor(Input.MousePosition.x/this.Grid.caseLength);
				let y = Math.floor(Input.MousePosition.y/this.Grid.caseLength)

				if (x < this.gridWidth && y < this.gridWidth)
				{
					this.Grid.FillZone(x, y, 1, 1, this.selectedTile);	
				}
			}

			this.Grid.DrawMultidimensionnalArray();
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
			for (let i in this.tileSprites)
			{
				if (this.tileSprites[i].img instanceof Array) {
					ctx.drawImage(this.tileSprites[i].img[0],
								this.tileSprites[i].Position.x,
								this.tileSprites[i].Position.y,
								this.tileSprites[i].Size.x,
								this.tileSprites[i].Size.y);

					ctx.drawImage(this.tileSprites[i].img[1],
								this.tileSprites[i].Position.x,
								this.tileSprites[i].Position.y-25,
								this.tileSprites[i].Size.x,
								this.tileSprites[i].Size.y);
				} else {
					ctx.drawImage(this.tileSprites[i].img,
								this.tileSprites[i].Position.x,
								this.tileSprites[i].Position.y,
								this.tileSprites[i].Size.x,
								this.tileSprites[i].Size.y);
				}
			}

			//Draw stroke
			ctx.strokeStyle="#ad2826";
			ctx.strokeRect(this.tileSprites[this.selectedPositionArray].Position.x, this.tileSprites[this.selectedPositionArray].Position.y, this.tileSprites[this.selectedPositionArray].Size.x, this.tileSprites[this.selectedPositionArray].Size.y);

			this.Buttons['save'].Render(920, 880);

			if (Input.mouseClick)
			{		
				//Check if a tile is clicked
				for (let i in this.tileSprites)
				{
					if (Physics.PointBoxCollision(Input.MousePosition, new Box(this.tileSprites[i].Position.x, this.tileSprites[i].Position.y, this.tileSprites[i].Size.x, this.tileSprites[i].Size.y))) {
						this.selectedTile = this.tileSprites[i].id;
						this.selectedPositionArray = i;
					}
				}

				if (Physics.PointBoxCollision(Input.MousePosition, this.Buttons['save'].Box))
				{
					console.log("save");
					LocalStorage.Save(this.Input.value, JSON.stringify(this.Grid.Tiles));
				}
			}
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}