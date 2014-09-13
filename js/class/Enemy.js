Enemy = function(game, type, path) {

    this.game = game;
    this.type = type;
    this.path = path;

    this.config();
};

Enemy.prototype.update = function() {


};

Enemy.prototype.config = function() {

    // Don't add it to the game here???
    // Also, fix the -30 hack on the y position later
    this.sprite = this.game.add.sprite(this.path[0].x * 32, this.path[0].y * 32 - 30, 'Enemies', this.type);

    // Properties based the type
    this.speed = 60; // will change accordingly to the type

    // Physics
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.velocity.setTo(0, 0);
    this.sprite.outOfBoundsKill = true;
    this.sprite.checkWorldBounds = true;

    this.tween = null;
    this.setTween();
};

Enemy.prototype.setTween = function() {

    var duration = (this.game.physics.arcade.distanceToXY(this.sprite, this.path[0].x * 32, this.path[0].y * 32) / this.speed) * 1000;

    this.tween = this.game.add.tween(this.sprite);

    for (var i = 0; i < this.path.length; i++)
    {
        this.tween.to({ x: this.path[i].x * 32, y: this.path[i].y * 32 }, duration, Phaser.Easing.Linear.None);
    }

    this.tween.start();
}