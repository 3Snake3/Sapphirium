const creotitePowerStation = extendContent(SectorPreset, "creotite-power-station", Planets.serpulo, 14, {
  
  localizedName: "Creotite Power Station",
  description: "A power plant destroyed by an explosion of an overheated creotite reactor. [red]Don't repeat the mistakes of the past!",
  captureWave: 45,
  difficulty: 10,

  //for debug
  alwaysUnlocked: true,
  
  loadIcon() {
    if(Icon.map != null){
      this.uiIcon = Icon.map.getRegion();
      this.fullIcon = Icon.map.getRegion();
    }
  }
  
});
