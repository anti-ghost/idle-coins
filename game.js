/* eslint-disable */
const VERSION = 0;

const D = (x) => new Decimal(x);
const p = Vue.ref({});
const player = p.value;

function format(
  value,
  places = 0,
  placesUnder1000 = 0,
  placesExponent = places
) {
  if (typeof value === "number" && !Number.isFinite(value)) {
    return "Infinite";
  }

  var decimal = Decimal.fromValue_noAlloc(value);

  if (decimal.sign() < 0)
    return "-".concat(
      format(decimal.abs(), places, placesUnder1000, placesExponent)
    );

  if (decimal.exponent < 3) {
    var number = decimal.toNumber();
    return number.toFixed(placesUnder1000);
  }

  if (!Number.isFinite(decimal.exponent)) {
    return "Infinite";
  }

  let m = format(decimal.mantissa, places, places);
  let e = decimal.exponent;
  if (m == format(10, places, places)) {
    e++;
    m = format(1, places, places);
  }
  return m + "e" + e;
}

function formatTime(time, places = 0) {
  if (time >= 31536e6) return format(time / 31536000, places) + " years";
  const parts = [];
  function addCheckedComponent(value, name) {
    if (value === 0) {
      return;
    }
    addComponent(value, name);
  }
  function addComponent(value, name) {
    parts.push(
      value === 1 ? `${format(value)} ${name}` : `${format(value)} ${name}s`
    );
  }
  addCheckedComponent(Math.floor(time / 31536000), "year");
  addCheckedComponent(Math.floor((time / 86400) % 365), "day");
  addCheckedComponent(Math.floor((time / 3600) % 24), "hour");
  addCheckedComponent(Math.floor((time / 60) % 60), "minute");
  addCheckedComponent(Math.floor(time % 60), "second");
  // Join with commas and 'and' in the end.
  if (parts.length === 0) return "0 seconds";
  return [parts.slice(0, -1).join(", "), parts.slice(-1)[0]].join(
    parts.length < 2 ? "" : " and "
  );
}

function increaseCoins(time) {
  const gain = getCoinGain(time);
  player.coins = player.coins.plus(gain);
  player.totalCoins = player.totalCoins.plus(gain);
  if (player.coins.gt(player.bestCoins)) player.bestCoins = player.coins;
}

function simulateTime(diff) {
  const time = diff / 1000;
  gameLoop(time);
}

function gameLoop(time) {
  if (player.gameStarted) player.timePlayed += time;
  increaseCoins(time);
  checkAchievements();
}

let interval;
function init() {
  console.log("init");
  load();
  interval = setInterval(function () {
    let diff = Date.now() - player.lastUpdate;
    simulateTime(diff);
    player.lastUpdate = Date.now();
  });
  setInterval(function () {
    save();
  }, 5000);
  loadVue();
}
