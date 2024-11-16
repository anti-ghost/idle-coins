/* eslint-disable */

function prestige() {
  if (player.coins.gte(1e12)) {
    player.prestigePoints = player.prestigePoints.plus(getPrestigePointGain());
    player.coins = nD(1);
    player.workers = 0;
    player.factors = [];
  }
}
