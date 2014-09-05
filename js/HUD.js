HUD = function(game) {

    this.game = game;
    this.sprite = null;

};

HUD.prototype = {

    preload: function() {

        game.load.atlasXML('space', 'assets/sprites/uipackSpace_sheet.png', 'assets/sprites/uipackSpace_sheet.xml');

    },

    create: function() {


        this.createRectangle(300, 150, 200, 40, 'space', 'glassPanel');

        this.createRectangle(300, 300, 200, 80, 'space', 'metalPanel');

    },

    update: function() {

    },

    // first row use TopCorner
    // last row use BottomCorner
    //
    // first column use LeftCorner
    // last column use RightCorner
    //
    // first row first column use TopLeftCorner
    // first row last column use TopRightCorner
    //
    // last row first column use BottomLeftCorner
    // last row last column use BottomRightCorner
    //
    // the rest use Background
    createRectangle: function(x, y, width, height, key, framePrefix) {

        var columns = width / 10;
        var rows = height / 10;
        var frameName = null;

        for (var column = 0; column < columns; column++)
        {
            for (var row = 0; row < rows; row++)
            {
                frameName = '';

                if (row == 0) {
                    frameName += 'Top';
                } else if (row == (rows - 1)) {
                    frameName += 'Bottom';
                }

                if (column == 0) {
                    frameName += 'Left';
                } else if (column == (columns - 1)) {
                    frameName += 'Right';
                }

                if (frameName == '') {
                    frameName = 'Background';
                } else {
                    frameName += 'Corner';
                }

                game.add.sprite(x + (10 * column), y + (10 * row), key, framePrefix + frameName);
            }
        }
    }

};