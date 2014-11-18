function Player() {
  var texture = PIXI.Texture.fromImage("img/ship.png");
  PIXI.Sprite.call(this, texture);

  this.scale = new PIXI.Point(0.7,0.7);
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this.acceleration = {
    x: 0.0,
    y: 0.0
  };

  this.forward = function(){
    var multiplier = {
      x: Math.cos(this.rotation),
      y: Math.sin(this.rotation)
    }

    this.acceleration.x += this.speed * multiplier.x;
    if(this.acceleration.x > 7)
      this.acceleration.x = 7;
    else if(this.acceleration.x < -7)
      this.acceleration.x = -7;

    this.acceleration.y += this.speed * multiplier.y;
    if(this.acceleration.y > 7)
      this.acceleration.y = 7;
    else if(this.acceleration.y < -7)
      this.acceleration.y = -7;
  }

}

Player.prototype = Object.create(PIXI.Sprite.prototype);
