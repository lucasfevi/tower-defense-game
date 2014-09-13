Wave = function(game, path, data, parent) {

    this.game = game;
    this.path = path;
    this.data = data;
    this.parent = parent;

    this.config();
};

Wave.prototype.config = function() {

    this.timer = null;

    this.enemies = this.game.add.group();
    this.enemyIndex = null;
    this.enemiesData = this.game.cache.getJSON('enemiesData');

    this.start();
};

Wave.prototype.update = function() {

    // If 0 living enemies and no timers
    // the wave is ended
    if (!this.timer.running && this.enemies.countLiving() == 0)
    {
        console.log('wave ended');
        this.parent.waveComplete();
    }
}

Wave.prototype.start = function() {

    this.enemyIndex = 0;

    this.timer = this.game.time.create();
    this.timer.start();
    this.timer.onComplete.add(this.timerComplete, this);
    this.timer.repeat(Phaser.Timer.SECOND * 1.5, this.data.enemies.length, this.addEnemy, this, this.data.enemies);
};

Wave.prototype.addEnemy = function(enemies) {

    var type = enemies[this.enemyIndex].type;

    this.enemies.add(new Enemy(this.game, this.path, this.enemiesData[type]));

    this.enemyIndex++;
};

Wave.prototype.timerComplete = function() {

    this.timer.destroy();
}