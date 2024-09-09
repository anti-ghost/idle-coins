var player = {};

/* var newGame = {
  version: 0,
  lastUpdate: Date.now(),
  coins: 10,
  derivatives: [0, 0, 0, 0, 0, 0, 0, 0],
  boughtDerivatives: [0, 0, 0, 0, 0, 0, 0, 0]
}; */

function gameLoop(time) {
  const seconds = time / 1000;
  simulateTime(seconds);
  player.lastUpdate = Date.now();
}

function simulateTime(seconds) {
  player.derivativeTimer += getTickspeed() * seconds;
  if (player.derivativeTimer >= 1) {
    produceDerivatives(Math.floor(player.derivativeTimer));
    player.derivativeTimer %= 1;
  }
}

setInterval(() => gameLoop(Date.now() - player.lastTick));
