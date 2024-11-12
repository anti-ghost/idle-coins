/* eslint-disable */

var app;

function loadVue() {
  app = Vue.createApp({
    setup() {
      return {
        tab: Vue.ref(0),
        p,
        format,
        formatTime,
        save,
        exportSave,
        importSave,
        hardReset,
        achievements,
        rowCompleted,
        getCoinGain,
        getWorkerCost,
        canBuyWorker,
        buyWorker,
        getFactorCost,
        canBuyFactor,
        buyFactor,
        getFactorMult,
        getTotalFactorMult,
        inflationActive
      };
    },
  });
  app.mount("body");
}
