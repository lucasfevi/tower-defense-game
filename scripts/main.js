var queue = new createjs.LoadQueue();

// queue.installPlugin(createjs.Sound);

queue.on("complete", handleComplete, this);
queue.on("progress", handleProgress, this);
queue.on("loadstart", handleStart, this);

queue.loadFile({ id: 'animationFrame', src: 'scripts/game/animationFrame.js' }, false);
queue.loadFile({ id: 'gameClass',      src: 'scripts/game/game.js' }, false);

queue.loadFile({ id: 'background',     src: 'images/background.png' }, false);
queue.loadFile({ id: 'enemies',        src: 'images/enemies.png' }, false);
queue.loadFile({ id: 'loading-screen', src: 'images/loading-screen.png' }, false);

queue.load();

function handleComplete() {
  console.log('Queue completed!');
}

function handleProgress(event) {
  $('#progress-bar').val(event.progress * 100);
}

function handleStart() {
  console.log('Queue started.');
}