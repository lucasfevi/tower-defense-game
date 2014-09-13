HUD = function(game) {

    this.game = game;
    this.btnStart = null;
};

HUD.prototype = {

    preload: function() {

        this.game.load.image('btnStart', 'assets/btnStart.png');
    },

    create: function() {

        this.btnStart = this.game.add.button(this.game.world.centerX, 470, 'btnStart', this.handleStart, this);
        this.btnStart.anchor.setTo(0.5, 0.5);
        this.btnStart.visible = false;
        this.btnStart.exists = false;
    },

    showMenu: function() {

        this.btnStart.visible = true;
    },

    handleStart: function() {

        this.btnStart.visible = false;

        levels.start();
    }
};