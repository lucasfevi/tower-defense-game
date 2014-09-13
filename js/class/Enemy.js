Enemy = function(game, path, data) {

    this.game = game;
    this.path = path;

    this.name = data.name;
    this.hp = data.hp;
    this.speed = data.speed;
    this.power = data.power;
    this.value = data.value;
    this.frameName = data.frameName;

    this.config();
};

Enemy.prototype.update = function() {


};

Enemy.prototype.config = function() {

    // Don't add it to the game here???
    // Also, fix the -30 hack on the y position later
    this.sprite = this.game.add.sprite(this.path[0].x * 32, this.path[0].y * 32 - 30, 'Enemies', this.frameName);

    // Physics
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.velocity.setTo(0, 0);

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