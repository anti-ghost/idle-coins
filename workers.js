/* eslint-disable */

const FACTOR_COST_EXPONENTS = [
  1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 20, 24, 30, 36, 40, 47, 48, 58, 59, 60,
  70, 72, 88, 90, 108, 118, 120, 140, 160, 168, 180, 210, 232, 240, 270, 280,
];

function getCoinGain(time = 1) {
  return getTotalFactorMult().times(player.workers * time);
}

function getWorkerCost(x = player.workers) {
  return Decimal.pow(2, x);
}

function canBuyWorker() {
  return player.coins.gte(getWorkerCost());
}

function buyWorker() {
  if (canBuyWorker()) {
    if (player.workers == 0) player.factors.push(0);
    player.coins = player.coins.sub(getWorkerCost());
    player.workers++;
  }
  player.gameStarted = true;
}

function getFactorCost(x, y = player.factors[x]) {
  let cost = Decimal.pow(10, FACTOR_COST_EXPONENTS[x] * (y + 1));
  const inflationStart = Math.ceil(12 / FACTOR_COST_EXPONENTS[x]) - 1;
  if (y > inflationStart)
    cost = cost.times(
      Decimal.pow(2, ((y - inflationStart) * (y + 1 - inflationStart)) / 2)
    );
  return cost;
}

function canBuyFactor(x) {
  return player.coins.gte(getFactorCost(x));
}

function buyFactor(x) {
  if (canBuyFactor(x)) {
    if (player.factors.length < 8 && player.factors[x] == 0)
      player.factors.push(0);
    player.coins = player.coins.sub(getFactorCost(x));
    player.factors[x]++;
  }
}

function getFactorMult(x) {
  return Decimal.pow(2, player.factors[x]);
}

function getTotalFactorMult() {
  let mult = D(1);
  for (let i = 0; i < player.factors.length; i++) {
    mult = mult.times(getFactorMult(i));
  }
  return mult;
}

function inflationActive() {
  for (let i = 0; i < player.factors.length; i++) {
    if (player.factors[i] >= Math.ceil(12 / FACTOR_COST_EXPONENTS[i]))
      return true;
  }
  return false;
}
