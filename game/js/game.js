window.onload = function() {
  loadCanvas();
};

var stage;

var background;

var queue;
var loadBar;

/*var planetBG;
var spaceBG;
var beachBG;
var desertBG;
var mountainBG;
var waterfallBG;
var forestBG;

var alienTurn;
var alienStand;
var p0;
var p1;

var ship;
var earth;*/

var unvisited = ["Beach", "Desert", "Mountains", "Waterfall", "Forest"];

function loadCanvas() {
  stage = new createjs.Stage("gameCanvas");

  loadBar = new createjs.Shape();
  loadBar.graphics.beginFill("blue").drawRect(0, 0, 1, 20).endFill();

  stage.addChild(loadBar);

  queue = new createjs.LoadQueue();
  queue.loadManifest([
    {id: "planetBG", src: "assets/planet.jpg"},
    {id: "spaceBG", src: "assets/space.jpg"},
    {id: "beachBG", src: "assets/Beach/game_background_1.png"},
    {id: "desertBG", src: "assets/Desert/background1.png"},
    {id: "mountainBG", src: "assets/Earth/game_background_1.png"},
    {id: "waterfallBG", src: "assets/Earth/game_background_4.png"},
    {id: "forestBG", src: "assets/Earth/game_background_3.1.png"},
    {id: "alienTurn", src: "assets/Aliens/alienBlue.png"},
    {id: "alienStand", src: "assets/Aliens/alienBlue_stand.png"},
    {id: "p0", src: "assets/Aliens/alienBeige_stand.png"},
    {id: "p1", src: "assets/Aliens/alienPink_stand.png"},
    {id: "ship", src: "assets/ufo.png"},
    {id: "earth", src: "assets/earth-globe.png"}
  ]);

  queue.on("progress", setBar);
  queue.on("complete", start, this);

  // Load all the sprites
  /*alienTurn = new Image();
  alienTurn.src = "assets/Aliens/alienBlue.png";

  alienStand = new Image();
  alienStand.src = "assets/Aliens/alienBlue_stand.png";

  p0 = new Image();
  p0.src = "assets/Aliens/alienBeige_stand.png";

  p1 = new Image();
  p1.src = "assets/Aliens/alienPink_stand.png";

  ship = new Image();
  ship.src = "assets/ufo.png";

  earth = new Image();
  earth.src = "assets/earth-globe.png";

  // Load all the backgrounds
  planetBG = new Image();
  planetBG.src = "assets/planet.jpg";

  spaceBg = new Image();
  spaceBG.src = "assets/space.jpg";

  beachBG = new Image();
  beachBG.src = "assets/Beach/game_background_1.png";

  desertBG = new Image();
  desertBG.src = "assets/Desert/background1.png";

  mountainBG = new Image();
  mountainBG.src = "assets/Earth/game_background_1.png";

  waterfallBG = new Image();
  waterfallBG.src = "assets/Earth/game_background_4.png";

  forestBG = new Image();
  forestBG.src = "assets/Earth/game_background_3.1.png";*/

}

function start() {
  console.log("start");
  // Remove load bar.
  stage.removeChild(loadBar);

  // Load first scene
  scene0();
}

function setBar(e) {
  loadBar.scaleX = e.progress * 300;
}

function loadBackground(bg) {
  background = new createjs.Bitmap(bg);
  stage.addChild(background);
  stage.update();
}

function scene0() {
  // Get planet Image
  var bg = queue.getResult("planetBG");
  loadBackground(bg);

  // Get alien sprite
  var alienImg = queue.getResult("alienTurn");
  var alienBm = new createjs.Bitmap(alienImg);
  stage.addChild(alienBm);

  stage.update();
}
