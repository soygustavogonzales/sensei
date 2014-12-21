senseiApp.config(['chargeObjectsProvider','chargeEffectsProvider',function (co,ce) {
  co.oCharge.chargeAll()
  ce.oCharge.chargeAll()
}])