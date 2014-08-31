var queue = new createjs.LoadQueue();

// queue.installPlugin(createjs.Sound);

queue.on("loadstart", handleStart, this);
queue.on("progress", handleProgress, this);
queue.on("complete", handleComplete, this);

queue.loadFile({ id: 'animationFrame', src: 'scripts/game/animationFrame.js' }, false);
queue.loadFile({ id: 'gameClass',      src: 'scripts/game/game.js' }, false);

queue.loadFile({ id: 'big',            src: 'images/big.jpg' }, false);
queue.loadFile({ id: 'background',     src: 'images/background.png' }, false);
queue.loadFile({ id: 'enemies',        src: 'images/enemies.png' }, false);
queue.loadFile({ id: 'loading-screen', src: 'images/loading-screen.png' }, false);

queue.load();

function handleStart() {
  console.log('Queue started');
}

function handleProgress(event) {
  var progress = parseInt(event.progress * 100);

  $('#progressValue').html(progress);
  $('#progressBar').val(progress);
}

function handleComplete() {
  console.log('Queue completed');
  game.init();
}