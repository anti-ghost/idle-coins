/* eslint-disable */

function getStartPlayer() {
  return {
    version: VERSION,
    lastUpdate: Date.now(),
    gameStarted: false,
    coins: D(1),
    bestCoins: D(1),
    totalCoins: D(0),
    timePlayed: 0,
    achievements: [],
    workers: 0,
    factors: [],
  };
}

function load() {
  let save = localStorage.getItem("IdleCoinsSave");
  if (save == null) save = btoa(JSON.stringify(getStartPlayer()));
  loadGame(JSON.parse(atob(save)));
}

function loadGame(loadgame) {
  reset();
  for (const i in loadgame) player[i] = loadgame[i];
  transformSaveToDecimal();
  let diff = Date.now() - player.lastUpdate;
  console.log(diff);
  simulateTime(diff);
  player.lastUpdate = Date.now();
}

function save(manual) {
  localStorage.setItem("IdleCoinsSave", btoa(JSON.stringify(player)));
  if (manual) $.notify("Game saved!", "info");
}

function reset() {
  const startPlayer = getStartPlayer();
  for (const i in startPlayer) player[i] = startPlayer[i];
}

function exportSave() {
  let str = btoa(JSON.stringify(player));
  let el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(el);
  $.notify("Exported current savefile to your clipboard", "info");
}

function importSave() {
  try {
    let save_data = prompt(
      "Input your save. (your current save file will be overwritten!)"
    );
    clearInterval(interval);
    loadGame(JSON.parse(atob(save_data)));
    save();
    location.reload();
  } catch (e) {}
}

function hardReset() {
  if (confirm("Do you really want to erase all your progress?")) {
    clearInterval(interval);
    reset();
    save();
    location.reload();
  }
}

function transformSaveToDecimal() {
  player.coins = D(player.coins);
  player.bestCoins = D(player.bestCoins);
  player.totalCoins = D(player.totalCoins);
}
