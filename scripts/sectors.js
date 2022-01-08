const creotitePowerStation = extendContent(SectorPreset, "creotite-power-station", Planets.serpulo, 26, {});
  creotitePowerStation.captureWave = 55;
  creotitePowerStation.difficulty = 7;
  //creotitePowerStation.alwaysUnlocked = true;

const​ ​node​ ​=​ ​(​parent​,​ ​contentType​,​ ​requirements​,​ ​objectives​)​ ​=>​ ​{ 
 ​    ​const​ ​tnode​ ​=​ ​new​ ​TechTree​.​TechNode​(​TechTree​.​get​(​parent​)​,​ ​contentType​,​ ​requirements​ ​!=​ ​null​ ? ​requirements​ : ​contentType​.​researchRequirements​(​)​)​; 
 ​    ​let​ ​used​ ​=​ ​new​ ​ObjectSet​(​)​; 
 ​     
 ​    ​if​(​objectives​ ​!=​ ​null​)​{ 
 ​        ​tnode​.​objectives​.​addAll​(​objectives​)​; 
 ​    ​}​; 
 ​}​;
 
/*function newNode(parent, content, req, objectives){
	
    var parnode = TechTree.get(parent);
    var node = new TechTree.TechNode(parnode, content, req != null ? content.researchRequirements() : req);
    var used = new ObjectSet();
  
    node.objectives.addAll(objectives != null ? null : objectives);
}*/
 
node(SectorPresets.nuclearComplex, creotitePowerStation, null, Seq.with(new Objectives.SectorComplete(SectorPresets.nuclearComplex)));

module.exports = {
creotitePowerStation: creotitePowerStation
}
