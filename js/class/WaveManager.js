WaveManager = function(game, path, callback, callbackContext) {

    this.game = game;
    this.path = path;
    this.context = callbackContext
    this.context.callback = callback;

    this.config();
};

WaveManager.prototype.config = function() {

    this.wave = null; // in the future it can turn in an array of waves

    this.hasNextWave = true;
    this.isRunning = false;

    this.mapsData = this.game.cache.getJSON('mapsData');

    this.currentWaveNumber = 0;
    this.currentWaveData = null;
};

WaveManager.prototype.nextWave = function() {

    this.isRunning = true;

    this.currentWaveNumber++;
    this.currentWaveData = this.mapsData[0].waves[this.currentWaveNumber];

    this.wave = new Wave(this.game, this.path, this.currentWaveData, this);

    this.hasNextWave = (this.mapsData[0].waves[this.currentWaveNumber + 1] !== undefined) ? true : false;
};

WaveManager.prototype.waveComplete = function() {

    this.isRunning = false;

    this.wave = null;

    this.context.callback();
};