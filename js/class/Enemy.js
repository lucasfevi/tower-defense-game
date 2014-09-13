Enemy = function(game, type, startX, startY, path) {

    this.game = game;
    this.type = type;
    this.path = path;

    this.speed = 60; // will change accordingly to the type

    this.startPoint = { x: startX, y: startY };

    // Don't add it to the game here???
    // Also, fix the - 30 y position
    this.sprite = this.game.add.sprite(this.startPoint.x, this.startPoint.y - 30, 'Enemies');

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

    var duration = (this.game.physics.arcade.distanceToXY(this.sprite, this.path[0].x * 32, this.path[0].y * 32) / this.speed) * 1000;

    this.tween = this.game.add.tween(this.sprite).to({ x: this.path[0].x * 32, y: this.path[0].y * 32 }, duration, Phaser.Easing.Linear.None, true);
}