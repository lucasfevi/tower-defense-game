HUD = function(game) {

    this.game = game;
    this.btnStart = null;

};

HUD.prototype = {

    preload: function() {

        this.game.load.atlasXML('space', 'assets/sprites/uipackSpace_sheet.png', 'assets/sprites/uipackSpace_sheet.xml');
        this.game.load.image('btnStart', 'assets/btnStart.png');

    },

    create: function() {

        this.btnStart = this.game.add.button(300, 420, 'btnStart', this.handleStart, this);
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