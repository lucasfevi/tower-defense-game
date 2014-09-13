Enemy = function(game, type, startX, startY, path) {

    this.game = game;
    this.type = type;
    this.path = path;

    this.startPoint = { x: startX, y: startY };
    this.sprite = this.game.add.sprite(this.startPoint.x - 30, this.startPoint.y - 30, 'Enemies'); // don't add it here

    this.tween = null;

    this.config();
};

Enemy.prototype.update = function() {

    // if (this.alive = console.log(this.game.physics.arcade.distanceToXY(this.sprite, 50, 50));
    // console.log(this.tween.isRunning);


    // if (this.game.physics.arcade.distanceToXY(this.sprite, 50, 50) < 1) {
    //     this.game.physics.arcade.moveToXY(this.sprite, 400, 150);
    // }
};

Enemy.prototype.config = function() {

    this.game.physics.arcade.enable(this.sprite);

    this.sprite.body.velocity.setTo(0, 0);
    this.sprite.outOfBoundsKill = true;
    this.sprite.checkWorldBounds = true;

    // 300 = 300 pixels per second = the speed the sprite will move at, regardless of the distance it has to travel
    var duration = (this.game.physics.arcade.distanceToXY(this.sprite, this.startPoint.x, this.startPoint.y) / 60) * 1000;
    this.tween = this.game.add.tween(this.sprite).to({ x: this.startPoint.x, y: this.startPoint.y }, duration, Phaser.Easing.Linear.None, true);
}