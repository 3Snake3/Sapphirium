const creotitePowerStation = extendContent(SectorPreset, "creotite-power-station", Planets.serpulo, 194, {
  localizedName: "Creotite Power Station",
  captureWave: 50,
  difficulty: 9,
  startWaveTimeMultiplier: 1,
  
  //for debug
  alwaysUnlocked: true,
  
  loadIcon() {
    this.super$loadIcon();
    //may be custom icon
    if(Icon.map != null){
      this.uiIcon = Icon.map.getRegion();
      this.fullIcon = Icon.map.getRegion();
    }
  }
});
