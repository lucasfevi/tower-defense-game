Levels = function(game) {

    this.game = game;
    this.map = null;

    this.path = null;
    this.pathfinder = null;

    this.btnNextWave = null;
    this.currentWave = null;

    this.mapsData = null;
    this.enemiesData = null;

    this.enemies = new Phaser.ArrayList();
};

Levels.prototype = {

    preload: function() {

        this.game.load.json('mapsData', 'data/maps.json');
        this.game.load.json('enemiesData', 'data/enemies.json');

        this.game.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

        this.game.load.spritesheet('Enemies', 'assets/enemies.png', 30, 30);

        this.game.load.image('RPGPackSheet', 'assets/sprites/RPGPackSheet.png');
        this.game.load.image('btnNextWave', 'assets/btnNextWave.png');
    },

    create: function() {

    },

    update: function() {

        for (var i = 0; i < this.enemies.total; i++)
        {
            if (!this.enemies.list[i].sprite.alive) {
                this.enemies.remove(i); continue;
            }

            this.enemies.list[i].update();
        }
    },

    start: function() {

        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('RPGPackSheet');

        // Need to eval this because is coming between "" from the json Tiled created
        var start = eval(this.map.properties.start);
        var goal = eval(this.map.properties.goal);
        var walkables = eval(this.map.properties.walkables);

        this.mapLayer = this.map.createLayer(this.map.properties.layerName);

        this.pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(this.map.layers[this.map.properties.layerIndex].data, walkables);

        var dis = this; // little hack until a find a better way
        this.pathfinder.setCallbackFunction(function(path) {
            dis.path = path || [];
        });

        this.pathfinder.preparePathCalculation([start[0], start[1]], [goal[0], goal[1]]);
        this.pathfinder.calculatePath();

        this.btnNextWave = this.game.add.button(600, 520, 'btnNextWave', this.nextWave, this);

        this.mapsData = this.game.cache.getJSON('mapsData');
        this.enemiesData = this.game.cache.getJSON('enemiesData');
    },

    nextWave: function() {

        this.level = 0;
        this.currentWave = 2;
        var wave = this.mapsData[this.level].waves[this.currentWave - 1];

        // if (this.currentWave === null) {}
        // this.enemies.reset();

        this.enemyIndex = 0;

        this.game.time.events.repeat(Phaser.Timer.SECOND * 1.5, wave.enemies.length, this.addEnemy, this, wave.enemies);
    },

    addEnemy: function(enemies) {

        var type = enemies[this.enemyIndex].type;

        this.enemies.add(new Enemy(this.game, this.path, this.enemiesData[type]));
        this.enemyIndex++;
    }

};