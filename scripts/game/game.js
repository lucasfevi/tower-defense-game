var game = {

    animationFrame: null,
    canvas: null,
    context: null,

    init: function() {
        console.log('game.init');

        this.canvas = document.getElementById('main');
        this.context = this.canvas.getContext('2d');

        $('.loading-screen').hide();
        $('.menu-screen').show();
    },

/*    draw: function() {
        console.log('draw');
    },

    update: function() {
        console.log('update');
    },

    animate: function() {
        game.update();
        game.draw();

        game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
    }, */

    // Show the options
    showOptions: function() {
        console.log('game.showOptions');
    },

    // When the start is called the map needs to be loaded and started
    start: function() {
        //game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
        console.log('game.start');
    },

    // Shows the menu screen
    stop: function() {
        window.cancelAnimationFrame(game.animationFrame);
    },
}