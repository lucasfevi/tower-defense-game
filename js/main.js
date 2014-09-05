var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update, render: render });

function preload() {

  game.stage.backgroundColor = '#5aac7b';

  // Listening these events from Phaser.Loader
  game.load.onLoadStart.add(loadStart, this);
  game.load.onLoadComplete.add(loadComplete, this);
  game.load.onFileComplete.add(fileComplete, this);

  game.load.image('big', 'assets/big.jpg');
  game.load.image('enemies', 'assets/enemies.png');
  game.load.image('background', 'assets/background.png');

  hud = new HUD(game);
  hud.preload();

}

function create() {

  hud.create();

}

function update() {

}

function render() {

}

// Loader callbacks
function loadStart() {

}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

  $('#progressValue span').html(progress);
  $('#progressBar').val(progress);

}

function loadComplete() {

  $('.progress').hide();

}