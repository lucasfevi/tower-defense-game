Levels = function(game) {

    this.game = game;
    this.map = null;
    this.world = null;

};

Levels.prototype = {

    preload: function() {

        this.game.load.image('RPGPackSheet', 'assets/sprites/RPGPackSheet.png');
        this.game.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    },

    create: function() {

    },

    update: function() {

    },

    start: function() {

        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('RPGPackSheet');
        this.map.createLayer('Tile Layer 1');
    },

};