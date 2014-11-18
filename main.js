var stage, renderer, player;
init();


function init(){
   stage = new PIXI.Stage(0x000000);
   renderer = PIXI.autoDetectRenderer(800, 600);
   document.body.appendChild(renderer.view);

   //Player
   var texture = PIXI.Texture.fromImage("img/asteroid_1.png");
   player = new PIXI.Sprite(texture);
   stage.addChild(player);

   requestAnimFrame( animate );
}




 function animate() {
     requestAnimFrame( animate );

     player.position.x += 5;

     renderer.render(stage);
 }
