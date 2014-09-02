var queue = new createjs.LoadQueue();

queue.on("loadstart", handleStart, this);
queue.on("progress", handleProgress, this);
queue.on("complete", handleComplete, this);

queue.loadFile({ id: 'animationFrame', src: 'scripts/game/animationFrame.js' }, false);
queue.loadFile({ id: 'gameClass',      src: 'scripts/game/game.js' }, false);
queue.loadFile({ id: 'levelsClass',    src: 'scripts/game/levels.js' }, false);

queue.loadFile({ id: 'mapsJson',       src: 'data/maps.json' }, false);
queue.loadFile({ id: 'enemiesJson',    src: 'data/enemies.json' }, false);

queue.loadFile({ id: 'big',            src: 'images/big.jpg' }, false);
queue.loadFile({ id: 'background',     src: 'images/background.png' }, false);
queue.loadFile({ id: 'enemies',        src: 'images/enemies.png' }, false);
queue.loadFile({ id: 'loading-screen', src: 'images/loading-screen.png' }, false);

queue.load();

function handleStart() {
  console.log('Queue started');
}

function handleProgress(event) {
  var progress = (event.progress * 100).toFixed(2);

  $('#progressValue').html(progress);
  $('#progressBar').val(progress);
}

function handleComplete() {
  console.log('Queue completed');

  $('#btnStart').on('click', game.start);
  $('#btnOptions').on('click', game.showOptions);

  // JSON Files
  levels.data.maps = queue.getResult('mapsJson');
  levels.data.enemies = queue.getResult('enemiesJson');

  game.init();
}