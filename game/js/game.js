window.onload = function() {
  loadCanvas();

  var stage;

  var background;
  var bounds;
  var currSprites = {};

  var queue;
  var loadBar;

  var prevScene = 0;
  var nextScene = 1;

  var unvisited = ["Beach", "Desert", "Mountains", "Waterfall", "Forest"];

  // Page button listeners
  function switchPage(type) {
    resetSprites();

    var scene;
    if (type == "prev") {
      scene = prevScene;
    } else {
      scene = nextScene;
    }

    if (scene == 0) {
      scene0();
    } else if (scene == 1) {
      scene1();
    } else if (scene == 2) {
      scene2();
    }

    // Update prev and next
    if (scene == 0) {
      prevScene = 0;
      nextScene = 1;
    } else {
      prevScene = scene - 1;
      nextScene = scene + 1;
    }
  }

  $("#prev").click(function() {
    switchPage("prev");
  });

  $("#next").click(function() {
    console.log("here");
    switchPage("next");
  });

  // Createjs
  function loadCanvas() {
    stage = new createjs.Stage("gameCanvas");

    loadBar = new createjs.Shape();
    loadBar.graphics.beginFill("blue").drawRect(0, 165, 1, 20).endFill();

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

    stage.update();
  }

  function start() {
    // Remove load bar.
    stage.removeChild(loadBar);

    // Load first scene
    scene0();
  }

  function setBar(e) {
    loadBar.scaleX = e.progress * 990;
    stage.update();
  }

  function loadBackground(bg) {
    // remove current background if there is one
    if (background != null) {
      stage.removeChild(background);
      background = null;
    }
    // Add new background
    background = new createjs.Bitmap(bg);
    stage.addChild(background);
    stage.update();
    bounds = background.getBounds();
  }

  function addSprite(id) {
    var img = queue.getResult(id);
    var bm = new createjs.Bitmap(img);
    currSprites[id] = bm;
    stage.addChild(bm);
    return bm;
  }

  function resetSprites() {
    for(var key in currSprites) {
      stage.removeChild(currSprites[key]);
    }
    currSprites = {};
  }

  function scene0() {
    // Get planet Image
    var bg = queue.getResult("planetBG");
    loadBackground(bg);

    // Put alien sprite
    var alien = addSprite("alienTurn");
    alien.x = bounds.width / 2;
    alien.y = bounds.height - 150;

    stage.update();
  }

  function scene1() {

    // Get planet Image
    var bg = queue.getResult("planetBG");
    loadBackground(bg);

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;

    // Add parents
    var p0 = addSprite("p0");
    p0.x = bounds.width - 200;
    p0.y = bounds.height - 150;

    var p1 = addSprite("p1");
    p1.x = bounds.width - 300;
    p1.y = bounds.height - 150;

    stage.update();

  }

  function scene2() {

    var bg = queue.getResult("spaceBG");
    loadBackground(bg);

    stage.update();

  }

  function scene3() {

    var bg = queue.getResult("planetBG");
    loadBackground(bg);

    // Spaceship
    var ship = addSprite("ship");
    ship.x = 200;
    ship.y = bounds.height - 150;

    stage.update();

    // Move ship up
    createjs.Tween.get(ship).to({y: -100}, 5000);

  }

  function scene4() {
    var bg = queue.getResult("spaceBG");
    loadBackground(bg);

    // Spaceship
    var ship = addSprite("ship");
    ship.x = bounds.width;
    ship.y = bounds.height / 2;

    stage.update();

    // Move ship left
    createjs.Tween.get(ship).to({x: -100}, 10000);

  }

  function scene5() {
    var bg = queue.getResult("spaceBG");
    loadBackground(bg);

    // Spaceship
    var ship = addSprite("ship");
    ship.x = bounds.width - 200;
    ship.y = bounds.height / 2;

    var earth = addSprite("earth");
    earth.x = 100;
    earth.y = bounds.height - 100;
  }

};
