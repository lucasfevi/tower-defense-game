Levels = function(game) {

    this.game = game;

    this.map = null;
    this.mapLayer = null;

    this.path = null;
    this.pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);

    this.btnNextWave = null;

    this.waveManager = null;
};

Levels.prototype.preload = function() {

    this.game.load.json('mapsData', 'data/maps.json');
    this.game.load.json('enemiesData', 'data/enemies.json');

    this.game.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

    this.game.load.spritesheet('Enemies', 'assets/enemies.png', 30, 30);

    this.game.load.image('RPGPackSheet', 'assets/sprites/RPGPackSheet.png');
    this.game.load.image('btnNextWave', 'assets/btnNextWave.png');
};

Levels.prototype.update = function() {

    if (this.waveManager !== null && this.waveManager.wave !== null)
    {
        this.waveManager.wave.update();
    }
};

Levels.prototype.start = function() {

    // Show the map and its layers
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('RPGPackSheet');

    this.mapLayer = this.map.createLayer(this.map.properties.layerName);

    // Calculate the path using the PathFinderPlugin
    this.calculatePath();

    // Create the button to call the next wave
    this.btnNextWave = this.game.add.button(600, 520, 'btnNextWave', this.nextWave, this);
};

Levels.prototype.calculatePath = function() {

    // Need to eval this arrays because they're coming between "" from the json Tiled created
    var start = eval(this.map.properties.start);
    var goal = eval(this.map.properties.goal);
    var walkables = eval(this.map.properties.walkables);

    this.pathfinder.setGrid(this.map.layers[this.map.properties.layerIndex].data, walkables);

    var dis = this; // little hack until I find a better way
    this.pathfinder.setCallbackFunction(function(path) {
        dis.path = path || [];
        dis.waveManager = new WaveManager(dis.game, dis.path, dis.callbackWave, dis);
    });

    this.pathfinder.preparePathCalculation([start[0], start[1]], [goal[0], goal[1]]);
    this.pathfinder.calculatePath();
};

Levels.prototype.nextWave = function() {

    this.waveManager.nextWave();

    // It may also change the frame so the user can see it is disabled
    this.btnNextWave.inputEnabled = false;
    this.btnNextWave.alpha = 0.6;
};

Levels.prototype.callbackWave = function() {

    if (this.waveManager.hasNextWave)
    {
        this.btnNextWave.inputEnabled = true;
        this.btnNextWave.alpha = 1;
    }
};