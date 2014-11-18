var stage, renderer, player;
var asteroids = [];
var asteroid_text = PIXI.Texture.fromImage("img/asteroid_1.png");
init();

function init(){
	stage = new PIXI.Stage(0x000000);
	renderer = PIXI.autoDetectRenderer(800, 600);
	document.body.appendChild(renderer.view);

	//Player
	var texture = PIXI.Texture.fromImage("img/asteroid_1.png");
	player = new PIXI.Sprite(texture);
	player.anchor.x = 0.5;
	player.anchor.y = 0.5;
	player.position.x = renderer.width/2;
	player.position.y = renderer.height/2;
	player.scale = new PIXI.Point(0.7,0.7);
	
	stage.addChild(player);

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

	player.position.x += 5;

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
