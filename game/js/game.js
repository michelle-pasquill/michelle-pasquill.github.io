window.onload = function() {
  loadCanvas();

  var stage;

  var background;
  var bounds;
  var currSprites = {};

  var queue;
  var loadBar;

  var nextScene = 1;

  var unvisited = ["Beach", "Desert", "Mountains", "Waterfall", "Forest"];
  var currPlace;
  var visiting = false;
  var favourite = false;

  var responseNeeded = false;

  // Page button listeners
  function switchPage() {
    resetSprites();

    var scene = nextScene;

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

    // Update next
    if (scene == 0) {
      nextScene = 1;
    } else if (scene == 16) {
      nextScene = scene;
    } else {
      nextScene = scene + 1;
    }
  }

  $("#next").click(function() {
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
      beachScene("");
    } else if (favourite) {
      favourite = false;
      scene14("beachBG");
      nextScene = 15;
    } else {
      switchPage("next");
    }
    $("#destButtons").hide();
  });

  $("#desertBtn").click(function() {
    responseNeeded = false;
    currPlace = "le d&eacute;sert";
    if (visiting) {
      desertScene("");
    } else if (favourite) {
      favourite = false;
      scene14("desertBG");
      nextScene = 15;
    } else {
      switchPage("next");
    }
    $("#destButtons").hide();
  });

  $("#mountainBtn").click(function() {
    responseNeeded = false;
    currPlace = "les montagnes";
    if (visiting) {
      mountainScene("");
    } else if (favourite) {
      favourite = false;
      scene14("mountainBG");
      nextScene = 15;
    } else {
      switchPage("next");
    }
    $("#destButtons").hide();
  });

  $("#waterfallBtn").click(function() {
    responseNeeded = false;
    currPlace = "la cascade";
    if (visiting) {
      waterfallScene("");
    } else if (favourite) {
      favourite = false;
      scene14("waterfallBG");
      nextScene = 15;
    } else {
      switchPage("next");
    }
    $("#destButtons").hide();
  });

  $("#forestBtn").click(function() {
    responseNeeded = false;
    currPlace = "la for&ecirc;t";
    if (visiting) {
      forestScene("");
    } else if (favourite) {
      favourite = false;
      scene14("forestBG");
      nextScene = 15;
    } else {
      switchPage("next");
    }
    $("#destButtons").hide();
  });

  // Createjs
  function loadCanvas() {
    stage = new createjs.Stage("gameCanvas");

    $("#destButtons").hide();

    $("#text").html("Loading ...");

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

    var text = "<div class='title'>Uzek: le petit voyageur</div>"
    + "<div>Uzek est un petit martien vert de la plan&egrave;te Strol." +
     " Strol est une petite plan&egrave;te rouge et s&egrave;che avec une " +
     "population de seulement 100 martiens.</div>";
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
      beachScene("");
    } else if (currPlace == "le d&eacute;sert") {
      desertScene("");
    } else if (currPlace == "les montagnes") {
      mountainScene("");
    } else if (currPlace == "la cascade") {
      waterfallScene("");
    } else if (currPlace == "la for&ecirc;t") {
      forestScene("");
    }
  }

  function scene8() {
    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;

    // Set text
    var text = "Uzek commence &agrave; se sentir fatigu&eacute; de toutes les " +
    "nouvelles choses qu&rsquo;il a vues. Il se rend compte que sa famille" +
    " au Strol se demandera o&ugrave; il est.";
    $("#text").html(text);
  }

  function scene9() {
    slideShow();

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;

    var text = "Il r&eacute;fl&eacute;chit de tous les endroits qu&rsquo;il a" +
    " visit&eacute;s. La plage ensoleill&eacute;e, les grandes montagnes, " +
    "les &eacute;toiles au-dessus de la for&ecirc;t verte, le bruit apaisant" +
    " de la cascade et le d&eacute;sert sec qui lui rappelle de Strol.";
    $("#text").html(text);
  }

  function scene10() {
    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;

    var text = "Uzek pense que la Terre est tr&egrave;s belle, mais il" +
    " pr&eacute;f&egrave;re la simplicit&eacute; de Strol. De plus, il " +
    "commence &agrave; se sentir coupable pour partir Strol sans dire" +
    " &agrave; personne. Donc il entre son vaisseau spatial et il retourne chez lui.";
    $("#text").html(text);
  }

  function scene11() {
    var bg = queue.getResult("planetBG");
    loadBackground(bg);

    // Spaceship
    var ship = addSprite("ship");
    ship.x = (bounds.width / 2) - 100;
    ship.y = bounds.height - 250;

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

    var text = "Il retourne &agrave; Strol et il trouve ses parents inquiets." +
    " Uzek s&rsquo;excuse pour partir sans leur dire.";
    $("#text").html(text);
  }

  function scene12() {
    // Same background as scene11
    scene11();

    var text = "Uzek leur d&eacute;crit tout ce qu&rsquo;il a vu sur la " +
    "Terre. Il commence &agrave; d&eacute;crire son endroit " +
    "pr&eacute;f&eacute;r&eacute; en plus d&eacute;tail.";
    $("#text").html(text);
  }

  function scene13() {
    // Same background as scene11
    scene11();

    var text = "Quel est l&rsquo;endroit pr&eacute;f&eacute;r&eacute; d&rsquo;Uzek?";
    $("#text").html(text);
    $("#destButtons").show();
    $("#beachBtn").show();
    $("#desertBtn").show();
    $("#mountainBtn").show();
    $("#waterfallBtn").show();
    $("#forestBtn").show();
    responseNeeded = true;
    favourite = true;
  }

  function scene14(place) {
    var bg = queue.getResult(place);
    loadBackground(bg);

    var text = "";
    if (place == "beachBG") {
      text = "Uzek parle de son endroit pr&eacute;f&eacute;r&eacute;," +
      " la plage. Il d&eacute;crit le surf, le voile, le sable et" +
      " l&rsquo;eau. Son partie pr&eacute;f&eacute;r&eacute; est la chaleur" +
      " du soleil et toutes les activit&eacute;s que vous pouvez faire &agrave; la plage.";
    } else if (place == "desertBG") {
      text = "Uzek parle de son endroit pr&eacute;f&eacute;r&eacute;, le" +
      " d&eacute;sert. Il aime le calme et la chaleur du d&eacute;sert." +
      " De plus, le d&eacute;sert est le plus similaire endroit avec sa" +
      " plan&egrave;te Strol.";
    } else if (place == "mountainBG") {
      text = "Uzek parle de son endroit pr&eacute;f&eacute;r&eacute;, les" +
      " montagnes. Il aime la grande taille des montagnes et il est "+
      "tr&egrave;s curieux avec les nuages. Le myst&egrave;re du sommet" +
      " des montages est la raison les montagnes sont l&rsquo;endroit " +
      "pr&eacute;f&eacute;r&eacute; d&rsquo;Uzek.";
    } else if (place == "waterfallBG") {
      text = "Uzek parle de son endroit pr&eacute;f&eacute;r&eacute;, la" +
      " cascade. Il d&eacute;crit l&rsquo;eau et l&rsquo;&eacute;coulement " +
      "apaisant de la cascade. Il aime le brouillard par la cascade et " +
      "les arc-en-ciel qu&rsquo;il produit.";
    } else if (place == "forestBG") {
      text = "Uzek parle de son endroit pr&eacute;f&eacute;r&eacute;, la" +
      " for&ecirc;t. Il aime les animaux qui habitent dans la for&ecirc;t et" +
      " toutes les plantes vertes. Uzek pense que la for&ecirc;t verte est " +
      "plus belle que le sable rouge de Strol.";
    }
    $("#text").html(text);
  }

  function scene15() {
    // Same background as scene11
    scene11();

    var text = "Apr&egrave;s Uzek d&eacute;crit tout, ses parents lui disent" +
    " qu&rsquo;ils soutiennent ses r&ecirc;ves, mais ils souhaitaient" +
    " qu&rsquo;il a expliqu&eacute; &agrave; l&rsquo;avance.";
    $("#text").html(text);
  }

  function scene16() {
    // Same as scene0
    scene0();

    var text = "<div>Uzek promet qu&rsquo;il ne partira jamais sans leur dire." +
    " Il veut visiter plus plan&egrave;tes dans l&rsquo;univers, mais la " +
    "prochaine fois il voyagera avec ses parents.</div>" +
    "<div class='title'>LA FIN</div>";
    $("#text").html(text);
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
      var text = "Finalement, Uzek visite ";
      // Otherwise show the last place
      if (unvisited.includes("Beach")) {
        beachScene(text + "la plage. ");
      } else if (unvisited.includes("Desert")) {
        desertScene(text + "le d&eacute;sert. ");
      } else if (unvisited.includes("Mountains")) {
        mountainScene(text + "les montagnes. ");
      } else if (unvisited.includes("Waterfall")) {
        waterfallScene(text + "la cascade. ");
      } else if (unvisited.includes("Forest")) {
        forestScene(text + "la for&ecirc;t. ");
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
    }, 4000);

    setTimeout(function() {
      createjs.Tween.get(mountain).to({x: end}, 1000);
      createjs.Tween.get(forest).to({x: 0}, 1000);
    }, 8000);

    setTimeout(function() {
      createjs.Tween.get(forest).to({x: end}, 1000);
      createjs.Tween.get(waterfall).to({x: 0}, 1000);
    }, 12000);

    setTimeout(function() {
      createjs.Tween.get(waterfall).to({x: end}, 1000);
      createjs.Tween.get(desert).to({x: 0}, 1000);
    }, 16000);

    setTimeout(function() {
      createjs.Tween.get(desert).to({x: end}, 1000);
    }, 20000);

  }

  function beachScene(last) {
    // Remove from unvisited
    var i = unvisited.indexOf("Beach");
    unvisited.splice(i, 1);

    var bg = queue.getResult("beachBG");
    loadBackground(bg);

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;

    var text = last + "Uzek arrive &agrave; la plage et il trouve beaucoup de " +
    "personnes jouent sous le soleil. Il y a des personnes qui font du " +
    "surf et les autres qui font de la voile. Il aime la plage parce " +
    "qu&rsquo;il n&rsquo;y a pas choses comme cela au Strol et il " +
    "semble que les personnes s&rsquo;amusent.";
    $("#text").html(text);
  }

  function desertScene(last) {
    // Remove from unvisited
    var i = unvisited.indexOf("Desert");
    unvisited.splice(i, 1);

    var bg = queue.getResult("desertBG");
    loadBackground(bg);

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 130;

    var text = last + "Au d&eacute;sert, il y a beaucoup de sable et de cactus. " +
    "Le sable souffle sur son visage, mais heureusement il porte un casque" +
    " qui le prot&egrave;ge. Le d&eacute;sert sec lui rappelle de Strol.";
    $("#text").html(text);
  }

  function mountainScene(last) {
    // Remove from unvisited
    var i = unvisited.indexOf("Mountains");
    unvisited.splice(i, 1);

    var bg = queue.getResult("mountainBG");
    loadBackground(bg);

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;

    var text = last + "Uzek est surpris avec la grande taille des montagnes et il " +
    "n&rsquo;a jamais rien vu une chose aussi grand qu&rsquo;eux. " +
    "Il ne peut pas voir le sommet des montagnes apr&egrave;s les nuages.";
    $("#text").html(text);
  }

  function waterfallScene(last) {
    // Remove from unvisited
    var i = unvisited.indexOf("Waterfall");
    unvisited.splice(i, 1);

    var bg = queue.getResult("waterfallBG");
    loadBackground(bg);

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;

    var text = last + "C&rsquo;est la nuit quand Uzek arrive &agrave; une cascade." +
    " Strol n&rsquo;a pas l&rsquo;eau, alors c&rsquo;est une chose" +
    " qu&rsquo;Uzek n&rsquo;a jamais vue. Il aime l&rsquo;&eacute;coulement" +
    " apaisant de la cascade et le beau reflet des &eacute;toiles.";
    $("#text").html(text);
  }

  function forestScene(last) {
    // Remove from unvisited
    var i = unvisited.indexOf("Forest");
    unvisited.splice(i, 1);

    var bg = queue.getResult("forestBG");
    loadBackground(bg);

    // Add alien
    var alien = addSprite("alienStand");
    alien.x = 200;
    alien.y = bounds.height - 150;

    var text = last + "C&rsquo;est la nuit quand Uzek arrive &agrave; la " +
    "for&ecirc;t et il fait un peu froid. Dans la for&ecirc;t il peut" +
    " &eacute;couter les hurlements des loups et le bruit apaisant de vent" +
    " entre les arbres. Il aime la vue des &eacute;toiles de dessous les arbres.";
    $("#text").html(text);
  }

};
