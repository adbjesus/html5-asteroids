var stage, renderer, player;
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
  player.position.x = 200;
  player.position.y = 200;
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

function animate() {
  requestAnimFrame( animate );

  if(key.up)
    player.forward();
  if(key.right)
    player.rotation += 0.1;
  if(key.left)
    player.rotation -= 0.1;

  renderer.render(stage);
}
