var game = {

    animationFrame: null,
    canvas: null,
    context: null,
    state: 'loading',

    init: function() {

        this.canvas = document.getElementById('main');
        this.context = this.canvas.getContext('2d');

        this.loadState();

        $('.loading-screen').hide();

        console.log('Initializing the game...');
        game.start();
    },

    draw: function() {
        console.log('draw');
    },

    update: function() {
        console.log('update');
    },

    animate: function() {
        game.update();
        game.draw();

        game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
    },

    start: function() {
        game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
    },

    stop: function() {
        window.cancelAnimationFrame(game.animationFrame);
    },

    restart: function() {

    },

    loadState: function() {
        
    }
}