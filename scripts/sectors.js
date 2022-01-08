const creotitePowerStation = extendContent(SectorPreset, "creotite-power-station1", Planets.serpulo, 140, {});
  creotitePowerStation.captureWave = 55;
  creotitePowerStation.difficulty = 9;
  creotitePowerStation.alwaysUnlocked = false;
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
