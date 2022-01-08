const creotitePowerStation = extendContent(SectorPreset, "creotite-power-station", Planets.serpulo, 26, {});
  creotitePowerStation.captureWave = 55;
  creotitePowerStation.difficulty = 7;
  //creotitePowerStation.alwaysUnlocked = true;

/*function​ ​node​ ​=​ ​(​parent​,​ ​contentType​,​ ​requirements​,​ ​objectives​)​ ​=>​ ​{ 
	var parnode = TechTree.get(parent);
 ​    ​var​ ​tnode​ ​=​ ​new​ ​TechTree​.​TechNode​(​parnode,​ ​contentType​,​ ​requirements​ ​!=​ ​null​ ? ​requirements​ : ​contentType​.​researchRequirements​(​)​)​; 
 ​    ​let​ ​used​ ​=​ ​new​ ​ObjectSet​(​)​; 
 ​     
 ​    ​if​(​objectives​ ​!=​ ​null​)​{ 
 ​        ​tnode​.​objectives​.​addAll​(​objectives​)​; 
 ​    ​}​; 
 ​}​;*/
 
function newNode(parent, content, req, objectives){
	
    var parnode = TechTree.get(parent);
    var node = new TechTree.TechNode(parnode, content, req != null ? content.researchRequirements() : req);
    var used = new ObjectSet();
  
    node.objectives.addAll(objectives = null ? null : objectives);
}
 
newNode(SectorPresets.nuclearComplex, creotitePowerStation, ItemStack.with(Items.copper, 1), Seq.with(new Objectives.SectorComplete(SectorPresets.nuclearComplex)));

module.exports = {
creotitePowerStation: creotitePowerStation
}
