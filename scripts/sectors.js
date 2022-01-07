const creotitePowerStation = extendContent(SectorPreset, "creotite-power-station", Planets.serpulo, 194, {
loadIcon() {
    if(Icon.map != null){
      this.uiIcon = Icon.map.getRegion();
      this.fullIcon = Icon.map.getRegion();
    }
  }
});
  creotitePowerStation.captureWave = 50;
  creotitePowerStation.difficulty = 9;
  creotitePowerStation.startWaveTimeMultiplier = 1;

const​ ​node​ ​=​ ​(​parent​,​ ​contentType​,​ ​requirements​,​ ​objectives​)​ ​=>​ ​{ 
 ​    ​const​ ​tnode​ ​=​ ​new​ ​TechTree​.​TechNode​(​TechTree​.​get​(​parent​)​,​ ​contentType​,​ ​requirements​ ​!=​ ​null​ ? ​requirements​ : ​contentType​.​researchRequirements​(​)​)​; 
 ​    ​let​ ​used​ ​=​ ​new​ ​ObjectSet​(​)​; 
 ​     
 ​    ​if​(​objectives​ ​!=​ ​null​)​{ 
 ​        ​tnode​.​objectives​.​addAll​(​objectives​)​; 
 ​    ​}​; 
 ​}​;
 
node(SectorPresets.nuclearComplex, creotitePowerStation, null, Seq.with(new Objectives.SectorComplete(SectorPresets.nuclearComplex)));

module.exports = {
creotitePowerStation: creotitePowerStation
}
