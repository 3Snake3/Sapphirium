const creotitePowerStation = extendContent(SectorPreset, "creotite-power-station", Planets.serpulo, 140, {
     localizedName: "Creotite Power Station",
     description: "A power plant destroyed by an explosion of an overheated creotite reactor. [red]Don't repeat the mistakes of the past!",
     difficulty: 4,
     alwaysUnlocked: false,
     captureWave: 20,
});

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
