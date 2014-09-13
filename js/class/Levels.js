Levels = function(game) {

    this.game = game;
    this.map = null;
    this.blocked = true; // it will be block until the path is calculated (may use a different way to fix it)

    this.path = null;
    this.pathfinder = null;

    this.enemies = new Phaser.ArrayList();
    this.startPoint = { x: 8 * 32, y: 0 * 32 };
    this.goalPoint = { x: 16 * 32, y: 0 * 32 };

    this.btnNextWave = null;
};

Levels.prototype = {

    preload: function() {

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

        this.btnNextWave = this.game.add.button(600, 520, 'btnNextWave', this.nextWave, this);

        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('RPGPackSheet');

        this.mapLayer = this.map.createLayer('LayerName');

        var start = this.mapLayer.getTileXY(this.startPoint.x, this.startPoint.y, {});
        var goal = this.mapLayer.getTileXY(this.goalPoint.x, this.goalPoint.y, {});

        this.pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(this.map.layers[0].data, [52]);

        var dis = this; // little hack until a find a better way
        this.pathfinder.setCallbackFunction(function(path) {
            dis.path = path || [];
        });

        this.pathfinder.preparePathCalculation([start.x, start.y], [goal.x, goal.y]);
        this.pathfinder.calculatePath();
    },

    nextWave: function() {

        this.enemies.reset();
        this.enemies.add(new Enemy(game, 1, this.startPoint.x, this.startPoint.y, this.path, this.mapLayer));
    }

};