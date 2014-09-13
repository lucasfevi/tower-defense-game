Enemy = function(game, path, data) {

    this.game = game;
    this.path = path;

    this.config(data);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {

    // console.log(this.alive);
};

Enemy.prototype.config = function(data) {

    // Fix the -30 hack on the y position later
    Phaser.Sprite.call(this, this.game, this.path[0].x * 32, this.path[0].y * 32 - 30, 'Enemies', data.frameName);

    this.name = data.name;
    this.hp = data.hp;
    this.speed = data.speed;
    this.power = data.power;
    this.value = data.value;

    this.tween = null;
    this.setTween();
};

Enemy.prototype.setTween = function() {

    var duration = (this.game.physics.arcade.distanceToXY(this, this.path[0].x * 32, this.path[0].y * 32) / this.speed) * 1000;

    this.tween = this.game.add.tween(this);

    for (var i = 0; i < this.path.length; i++)
    {
        this.tween.to({ x: this.path[i].x * 32, y: this.path[i].y * 32 }, duration, Phaser.Easing.Linear.None);
    }

    this.tween.to({ x: this.path[this.path.length - 1].x * 32, y: this.path[this.path.length - 1].y * 32 - 30 }, duration, Phaser.Easing.Linear.None);

    this.tween.start();

    this.tween._lastChild.onComplete.add(this.handleTweenComplete, this);
};

// It will mean that the enemy reaches the final path, so you lose a life
Enemy.prototype.handleTweenComplete = function() {

    this.kill();
};