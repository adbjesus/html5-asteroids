var stage, renderer, player;
var asteroids = [];
var asteroid_text = PIXI.Texture.fromImage("img/asteroid_1.png");
init();

key = {
  up: false,
  left: false,
  right: false
}

function init(){
	stage = new PIXI.Stage(0x000000);
	renderer = PIXI.autoDetectRenderer(800, 600);
	document.body.appendChild(renderer.view);

  //Player
  var texture = PIXI.Texture.fromImage("img/ship.png");
  player = new PIXI.Sprite(texture);
  player.scale = new PIXI.Point(0.7,0.7);
  stage.addChild(player);
  player.position.x = renderer.width/2;
  player.position.y = renderer.height/2;
  player.anchor.x = 0.5;
  player.anchor.y = 0.5;
  player.speed = 1;
  player.forward = function(){
    var multiplier = {
      x: Math.cos(this.rotation),
      y: Math.sin(this.rotation)
    }

    this.position.x += this.speed * multiplier.x;
    this.position.y += this.speed * multiplier.y;
  }

  window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 37: // Left
        key.left = true;
        break;

      case 38: // Up
        key.up = true;
        break;

      case 39: // Right
        key.right = true;
        break;
    }
  }, false);

  window.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
      case 37: // Left
        key.left = false;
        break;

      case 38: // Up
        key.up = false;
        break;

      case 39: // Right
        key.right = false;
        break;
    }
  }, false);
	requestAnimFrame( animate );
}

function spawn_asteroid(sx,sy){
  idx = asteroids.length;
  asteroid = new PIXI.Sprite(asteroid_text)
  asteroid.anchor.x = 0.5;
  asteroid.anchor.y = 0.5;
  asteroid.position.x = Math.random()*renderer.width;
  asteroid.position.y = Math.random()*renderer.height;
  asteroid.scale.x = sx;
  asteroid.scale.y = sy;
  stage.addChild(asteroid);
  asteroids.push(asteroid);
}

function animate() {
	requestAnimFrame( animate );

  if(key.up)
    player.forward();
  if(key.right)
    player.rotation += 0.1;
  if(key.left)
    player.rotation -= 0.1;

	screenWrap(player);

	renderer.render(stage);
}

function screenWrap(sprite) {
	if (sprite.x > renderer.width){
		sprite.x = 0;
	}else if (sprite.x < 0){
		sprite.x = renderer.width;
	}else if (sprite.y > renderer.height){
		sprite.y = 0;
	}else if (sprite.y < 0){
		sprite.y = renderer.height;
	}
}
