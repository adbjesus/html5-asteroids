var stage, renderer, player;
init();


function init(){
  stage = new PIXI.Stage(0x000000);
  renderer = PIXI.autoDetectRenderer(800, 600);
  document.body.appendChild(renderer.view);

  //Player
  var texture = PIXI.Texture.fromImage("img/ship.png");
  player = new PIXI.Sprite(texture);
  player.scale = new PIXI.Point(0.7,0.7);
  stage.addChild(player);

  requestAnimFrame( animate );
}

function animate() {
  requestAnimFrame( animate );


  renderer.render(stage);
}
