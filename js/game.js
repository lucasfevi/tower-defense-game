var game = {

    animationFrame: null,
    canvas: null,
    context: null,

    init: function() {

        game.canvas = document.getElementById('main');
        game.context = game.canvas.getContext('2d');
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
}