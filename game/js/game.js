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
  var currPlace;
  var visiting = false;

  var responseNeeded = false;

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
    } else if (scene == 3) {
      scene3();
    } else if (scene == 4) {
      scene4();
    } else if (scene == 5) {
      scene5();
    } else if (scene == 6) {
      scene6();
    } else if (scene == 7) {
      scene7();
    } else if (scene == 8) {
      scene8();
    } else if (scene == 9) {
      scene9();
    } else if (scene == 10) {
      scene10();
    } else if (scene == 11) {
      scene11();
    } else if (scene == 12) {
      scene12();
    } else if (scene == 13) {
      scene13();
    } else if (scene == 14) {
      scene14("beachBG");
    } else if (scene == 15) {
      scene15();
    } else if (scene == 16) {
      scene16();
    }

    // Update prev and next
    if (scene == 0) {
      prevScene = 0;
      nextScene = 1;
    } else if (scene == 16) {
      prevScene = scene - 1;
      nextScene = scene;
    } else {
      prevScene = scene - 1;
      nextScene = scene + 1;
    }
  }

  $("#prev").click(function() {
    if (!responseNeeded && !visiting) {
      switchPage("prev");
    } else if (!responseNeeded && visiting) {
      nextPlace();
    }
  });

  $("#next").click(function() {
    console.log(responseNeeded);
    if (!responseNeeded && !visiting) {
      switchPage("next");
    } else if (!responseNeeded && visiting) {
      nextPlace();
    }
  });

  $("#beachBtn").click(function() {
    responseNeeded = false;
    currPlace = "la plage";
    if (visiting) {
      beachScene();
    } else {
      switchPage("next");
    }
  });

  $("#desertBtn").click(function() {
    responseNeeded = false;
    currPlace = "le d&eacute;sert";
    if (visiting) {
      desertScene();
    } else {
      switchPage("next");
    }
  });

  $("#mountainBtn").click(function() {
    responseNeeded = false;
    currPlace = "les montagnes";
    if (visiting) {
      mountainScene();
    } else {
      switchPage("next");
    }
  });

  $("#waterfallBtn").click(function() {
    responseNeeded = false;
    currPlace = "la cascade";
    if (visiting) {
      waterfallScene();
    } else {
      switchPage("next");
    }
  });

  $("#forestBtn").click(function() {
    responseNeeded = false;
    currPlace = "la for&ecirc;t";
    if (visiting) {
      forestScene();
    } else {
      switchPage("next");
    }
  });

  // Createjs
  function loadCanvas() {
    stage = new createjs.Stage("gameCanvas");

    $("#destButtons").hide();

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);

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
      {id: "alienTurn", src: "assets/Aliens/alienGreen.png"},
      {id: "alienStand", src: "assets/Aliens/alienGreen_stand.png"},
      {id: "p0", src: "assets/Aliens/alienBeige_stand.png"},
      {id: "p1", src: "assets/Aliens/alienPink_stand.png"},
      {id: "ship", src: "assets/ufo.png"},
      {id: "earth", src: "assets/earth-globe.png"}
    ]);

    queue.on("progress", setBar);
    queue.on("complete", start, this);


  }

  function start() {
    // Remove load bar.
    stage.removeChild(loadBar);

    // Load first scene
    scene0();
  }

  function setBar(e) {
    loadBar.scaleX = e.progress * 990;

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

    var text = "Uzek est un petit martien vert de la plan&egrave;te Strol." +
     " Strol est une petite plan&egrave;te rouge et s&egrave;che avec une " +
     "population de seulement 100 martiens.";
    $("#text").html(text);
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

    var text = "Uzek habite ici avec ses parents protecteurs, qui ne lui " +
    "permettent jamais de suivre ses r&ecirc;ves.";
    $("#text").html(text);

  }

  function scene2() {

    var bg = queue.getResult("spaceBG");
    loadBackground(bg);

    var text = "Uzek regarde toujours les &eacute;toiles et les" +
    " plan&egrave;tes dans le ciel et il r&ecirc;ve de voyager l&rsquo;univers.";
    $("#text").html(text);

  }

  function scene3() {

    var bg = queue.getResult("planetBG");
    loadBackground(bg);

    // Spaceship
    var ship = addSprite("ship");
    ship.x = (bounds.width / 2) - 100;
    ship.y = bounds.height - 150;


    // Move ship up
    createjs.Tween.get(ship).to({y: -200}, 5000);

    var text = "Un jour, il d&eacute;cide d&rsquo;entrer dans son vaisseau" +
    " spatial et il part vers la Terre.";
    $("#text").html(text);

  }

  function scene4() {
    var bg = queue.getResult("spaceBG");
    loadBackground(bg);

    // Spaceship
    var ship = addSprite("ship");
    ship.x = bounds.width - 250;
    ship.y = (bounds.height / 2) - 200;

    var earth = addSprite("earth");
    earth.x = -600;
    earth.y = bounds.height - 300;


    // Move earth right
    createjs.Tween.get(earth).to({x: 100}, 10000);

    var text = "Uzek arrive &agrave; la Terre, mais la plan&egrave;te est " +
    "trop grande. Il ne sait pas quel endroit il devrait visiter en premier.";
    $("#text").html(text);
  }

  function scene5() {
    var bg = queue.getResult("spaceBG");
    loadBackground(bg);

    // Spaceship
    var ship = addSprite("ship");
    ship.x = bounds.width - 250;
    ship.y = (bounds.height / 2) - 200;

    var earth = addSprite("earth");
    earth.x = 100;
    earth.y = bounds.height - 300;

    // Set question text
    var question = "Quel endroit pensez-vous Uzek devrait visiter en premier?";
    $("#text").html(question);

    enableChoices();
  }

  function scene6() {
    var bg = queue.getResult("spaceBG");
    loadBackground(bg);

    var earth = addSprite("earth");
    earth.x = 100;
    earth.y = bounds.height - 300;

    // Spaceship
    var ship = addSprite("ship");
    ship.x = bounds.width - 250;
    ship.y = (bounds.height / 2) - 200;

    createjs.Tween.get(ship).to({x: earth.x + 250, y: earth.y + 250, scale: 0}, 3000);

    var text = "D&rsquo;abord, Uzek d&eacute;cide de visiter " + currPlace + ".";
    $("#text").html(text);
  }

  function scene7() {
    // This scene calls the stored location scene
    visiting = true;
    if (currPlace == "la plage") {
      beachScene();
    } else if (currPlace == "le d&eacute;sert") {
      desertScene();
    } else if (currPlace == "les montagnes") {
      mountainScene();
    } else if (currPlace == "la cascade") {
      waterfallScene();
    } else if (currPlace == "la for&ecirc;t") {
      forestScene();
    }
  }

  function scene8() {
    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;

    // Set text
  }

  function scene9() {
    slideShow();

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;
  }

  function scene10() {
    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;
  }

  function scene11() {
    var bg = queue.getResult("planetBG");
    loadBackground(bg);

    // Spaceship
    var ship = addSprite("ship");
    ship.x = (bounds.width / 2) - 100;
    ship.y = bounds.height - 150;

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
  }

  function scene12() {
    // Same background as scene11
    scene11();
  }

  function scene13() {
    // Same background as scene11
    scene11();
  }

  function scene14(place) {
    var bg = queue.getResult(place);
    loadBackground(bg);
  }

  function scene15() {
    // Same background as scene11
    scene11();
  }

  function scene16() {
    // Same as scene0
    scene0();
  }

  function enableChoices() {
    // If there are more than one unvisited places, then show options
    if (unvisited.length > 1) {
      responseNeeded = true;
      $("#destButtons").show();
      // Hide any button that is visited
      if (!unvisited.includes("Beach")) {
        $("#beachBtn").hide();
      }
      if (!unvisited.includes("Desert")) {
        $("#desertBtn").hide();
      }
      if (!unvisited.includes("Mountains")) {
        $("#mountainBtn").hide();
      }
      if (!unvisited.includes("Waterfall")) {
        $("#waterfallBtn").hide();
      }
      if (!unvisited.includes("Forest")) {
        $("#forestBtn").hide();
      }
    } else {
      visiting = false;
      // Otherwise show the last place
      if (unvisited.includes("Beach")) {
        beachScene();
      } else if (unvisited.includes("Desert")) {
        desertScene();
      } else if (unvisited.includes("Mountains")) {
        mountainScene();
      } else if (unvisited.includes("Waterfall")) {
        waterfallScene();
      } else if (unvisited.includes("Forest")) {
        forestScene();
      }
    }
  }

  function nextPlace() {
    if (unvisited.length >= 1) {
      // Set question text
      var question = "Quel endroit pensez-vous Uzek devrait visiter ensuite?";
      $("#text").html(question);
      // Set buttons
      enableChoices();
    } else {
      responseNeeded = false;
    }
  }

  function slideShow() {
    // Add all backgrounds off scren.
    var beach = addSprite("beachBG");
    beach.x = bounds.width;
    var mountain = addSprite("mountainBG");
    mountain.x = bounds.width;
    var forest = addSprite("forestBG");
    forest.x = bounds.width;
    var waterfall = addSprite("waterfallBG");
    waterfall.x = bounds.width;
    var desert = addSprite("desertBG");
    desert.x = bounds.width;

    var end = (0 - bounds.width);

    createjs.Tween.get(beach).to({x: 0}, 1000);

    setTimeout(function() {
      createjs.Tween.get(beach).to({x: end}, 1000);
      createjs.Tween.get(mountain).to({x: 0}, 1000);
    }, 5000);

    setTimeout(function() {
      createjs.Tween.get(mountain).to({x: end}, 1000);
      createjs.Tween.get(forest).to({x: 0}, 1000);
    }, 10000);

    setTimeout(function() {
      createjs.Tween.get(forest).to({x: end}, 1000);
      createjs.Tween.get(waterfall).to({x: 0}, 1000);
    }, 15000);

    setTimeout(function() {
      createjs.Tween.get(waterfall).to({x: end}, 1000);
      createjs.Tween.get(desert).to({x: 0}, 1000);
    }, 20000);

    setTimeout(function() {
      createjs.Tween.get(desert).to({x: end}, 1000);
    }, 25000);

  }

  function beachScene() {
    var bg = queue.getResult("beachBG");
    loadBackground(bg);

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;
  }

  function desertScene() {
    var bg = queue.getResult("desertBG");
    loadBackground(bg);

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 100;
  }

  function mountainScene() {
    var bg = queue.getResult("mountainBG");
    loadBackground(bg);

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;
  }

  function waterfallScene() {
    var bg = queue.getResult("waterfallBG");
    loadBackground(bg);

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;
  }

  function forestScene() {
    var bg = queue.getResult("forestBG");
    loadBackground(bg);

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;
  }

};
