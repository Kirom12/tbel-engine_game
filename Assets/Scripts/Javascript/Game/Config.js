/**
 * Get Canvas and the context<br/>
 *
 * - Create Scene Object which will contain the scene<br/>
 * - Create and set the gravity<br/>
 * - Application : An Object which will handle the scene to load, if game is paused or not and if debug mode is activate<br/>
 * - imagesLoaded : counter for loaded images<br/>
 * - WalkableTiles : an Array which will contain where integer where we can walk<br/>
 * - ImagesPath : Array of image object. Each image has a name and a path<br/>
 * - Images : an object which contain all loaded image
 * 
 * */


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var Scenes = {};

var Application = 
{
	LoadedScene: null,
	gamePaused: false,
	debugMode: true,
	currentMap: null
};

var imagesLoaded = 0;
var WalkableTiles = [];

var ImagesPath = 
[
	{name: "character", path: "PlanetCute/Character Boy.png"},
	{name: "character-sp", path: "Spritesheet/character-small.png"},
	{name: "water-block", path: "PlanetCute/Water Block.png"},
	{name: "brown-block", path: "PlanetCute/Brown Block.png"},
	{name: "grass-block", path: "PlanetCute/Grass Block.png"},
	{name: "stone-block", path: "PlanetCute/Stone Block.png"},
	{name: "tree-tall", path: "PlanetCute/Tree Tall.png"},
	{name: "wood-block", path: "PlanetCute/Wood Block.png"},
	{name: "wall-block", path: "PlanetCute/Wall Block.png"},
	{name: "character-girl", path: "PlanetCute/Character Pink Girl.png"},
	{name: "character-boy", path: "PlanetCute/Character Boy.png"},
	{name: "wrong-cross", path: "PlanetCute/Wrong Cross.png"}
];
var Images = {};