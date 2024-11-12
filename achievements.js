/* eslint-disable */

const achievements = [
  [
    {
      id: 0,
      name: "I've been multiplied!",
      tooltip: "Buy a Factor 1.",
      requirement: () => player.factors[0] > 0,
    },
    {
      id: 1,
      name: "100 coins is a lot",
      tooltip: "Buy a Factor 2.",
      requirement: () => player.factors[1] > 0,
    },
    {
      id: 2,
      name: "Half Life 3 CONFIRMED",
      tooltip: "Buy a Factor 3.",
      requirement: () => player.factors[2] > 0,
    },
    {
      id: 3,
      name: "Left and Right 3 Factors",
      tooltip: "Buy a Factor 4.",
      requirement: () => player.factors[3] > 0,
    },
    {
      id: 4,
      name: "5 Factor Coin Punch",
      tooltip: "Buy a Factor 5.",
      requirement: () => player.factors[4] > 0,
    },
    {
      id: 5,
      name: "We couldn't afford 9",
      tooltip: "Buy a Factor 6.",
      requirement: () => player.factors[5] > 0,
    },
    {
      id: 6,
      name: "Not a luck related achievement",
      tooltip: "Buy a Factor 7.",
      requirement: () => player.factors[6] > 0,
    },
    {
      id: 7,
      name: "90 degrees to infinity",
      tooltip: "Buy a Factor 8.",
      requirement: () => player.factors[7] > 0,
    },
  ],
];

function giveAchievement(r, c) {
  if (player.achievements.includes(8 * r + c)) return;
  player.achievements.push(8 * r + c);
  $.notify("Achievement: " + achievements[r][c].name, "success");
}

function checkAchievements() {
  for (let r = 0; r < achievements.length; r++) {
    for (let c = 0; c < 8; c++) {
      if (achievements[r][c].requirement && achievements[r][c].requirement())
        giveAchievement(r, c);
    }
  }
}

function rowCompleted(row) {
  for (let i = 0; i < 8; i++) {
    if (!player.achievements.includes(row[i].id)) return false;
  }
  return true;
}
