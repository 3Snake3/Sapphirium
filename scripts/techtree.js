const blocks = require("blocks/blocks");
const turrets = require("blocks/turrets");
const items = require("items");
const sectors = require("sectors");

function newNode(parent, content, req, objectives){
	
    var parnode = TechTree.get(parent);
    var node = new TechTree.TechNode(parnode, content, req == null ? content.researchRequirements() : req);
    var used = new ObjectSet();
  
    node.objectives.addAll(objectives == null ? null : objectives);
}


//blocks
newNode(Blocks.parallax, turrets.impaler, ItemStack.with(Items.titanium, 7500, Items.silicon, 6900, Items.plastanium, 4450, Items.phaseFabric, 2000), Seq.with(new Objectives.SectorComplete(SectorPresets.impact0078)));
newNode(Blocks.ripple, turrets.warhead, ItemStack.with(Items.lead, 8600, Items.graphite, 6400, Items.silicon, 2300, Items.thorium, 1800, Items.plastanium, 1300), Seq.with(new Objectives.SectorComplete(SectorPresets.extractionOutpost), new Objectives.Research(Blocks.spectre)));
newNode(Blocks.meltdown, turrets.needle, ItemStack.with(Items.graphite, 10000, Items.silicon, 7000, Items.plastanium, 5400, Items.titanium, 4800), Seq.with(new Objectives.SectorComplete(SectorPresets.desolateRift), new Objectives.Research(Blocks.overdriveDome)));
newNode(Blocks.cryofluidMixer, blocks.multi, ItemStack.with(Items.lead, 1800, Items.graphite, 1000, Items.silicon, 1200), Seq.with(new Objectives.SectorComplete(SectorPresets.craters)));
newNode(Blocks.thermalPump, blocks.upgPump, ItemStack.with(Items.graphite, 8500, Items.metaglass, 8000, Items.silicon, 7150, Items.titanium, 5000, Items.thorium, 4450), Seq.with(new Objectives.SectorComplete(SectorPresets.windsweptIslands)));
newNode(SectorPresets.planetaryTerminal, sectors.creotitePowerStation, ItemStack.with(Items.lead, 13), Seq.with(new Objectives.SectorComplete(SectorPresets.desolateRift), new Objectives.SectorComplete(SectorPresets.navalFortress)));
