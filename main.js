var stage, renderer, player;
var asteroids = [];
var asteroid_text = PIXI.Texture.fromImage("img/asteroid_1.png");
var pew_pews = [];
var pew_pew_text = PIXI.Texture.fromImage("img/pew_pew.png");
init();

key = {
	up: false,
	left: false,
	right: false,
  space: false
}

var shoot = true;

function init(){
	stage = new PIXI.Stage(0x000000);
	renderer = PIXI.autoDetectRenderer(800, 600);
	document.body.appendChild(renderer.view);

	//Player
	player = new Player();
	stage.addChild(player);
	player.position.x = renderer.width/2;
	player.position.y = renderer.height/2;
  player.speed = 0.05;


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

      case 32: //Space
        key.space = true;
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

      case 32: //Space
        key.space = false;
        break;
		}
	}, false);
	requestAnimFrame( animate );
}

function spawn_asteroid(sx,sy){
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

function spawn_pew_pew(){
  pew_pew = new PIXI.Sprite(pew_pew_text)
  pew_pew.anchor.x = 0.5;
  pew_pew.anchor.y = 0.5;
  pew_pew.position.x = player.position.x;
  pew_pew.position.y = player.position.y;
  pew_pew.scale.x = 0.2;
  pew_pew.scale.y = 0.2;
  pew_pew.speed = {
    x: Math.cos(player.rotation)*(player.acceleration.x+6),
    y: Math.sin(player.rotation)*(player.acceleration.y+6)
  }
  pew_pew.rotation = player.rotation;
  stage.addChild(pew_pew);
  pew_pews.push(pew_pew);
  setTimeout(function(){stage.removeChild(pew_pews.splice(0,1)[0]);},1500);
}

function animate() {
	requestAnimFrame( animate );

	if(key.up)
		player.forward();
	if(key.right)
		player.rotation += 0.1;
	if(key.left)
		player.rotation -= 0.1;
  if(key.space)
    if(shoot){
      shoot=false;
      setTimeout(function(){shoot=true;spawn_pew_pew();},250)
    }


  player.position.x += player.acceleration.x;
  player.position.y += player.acceleration.y;
  for(i=pew_pews.length-1;i>=0;--i){
    pew_pews[i].position.x += pew_pews[i].speed.x;
    pew_pews[i].position.y += pew_pews[i].speed.y;
    screenWrap(pew_pews[i]);
  }

	screenWrap(player);

  while(asteroids.length<3){
    spawn_asteroid(1,1);
    spawn_asteroid(0.7,0.7);
    spawn_asteroid(0.3,0.3);
  }

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
