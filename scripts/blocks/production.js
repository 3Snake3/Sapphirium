const multiLib = require("multi-lib");
const sectors = require("sectors");

const multi = multiLib.MultiCrafter(GenericCrafter, GenericCrafter.GenericCrafterBuild, "freezer", [
    {
      input: {
        liquids: ["water/3"],
        power: 0.3
      },
      output: {
        items: ["adc-ice-cube/3"]
      },
      craftTime: 80
    },
    {
          input: {
            liquids: ["cryofluid/3"],
            power: 0.4
          },
          output: {
            items: ["adc-cryocube/3"]
          },
          craftTime: 95
        },
        {
          input: {
            liquids: ["water/3", "slag/3"],
            power: 0.6
          },
          output: {
            items: ["adc-cinderblock/3"]
          },
          craftTime: 120
        },
        {
          input: {
            liquids: ["oil/10"]
          },
          output: {
            items: ["coal/2"],
            power: 3
          },
          craftTime: 160
        },
        {
        input: {
            liquids: ["adc-surge-mass/6"]
          },
          output: {
            items: ["adc-surge-stone/1"]
          },
          craftTime: 110
        },
], {
  },
  function Extra() {
    this.draw=function(){
      let region1 = Core.atlas.find("adc-freezer-top")
      Draw.rect(region1, this.x, this.y);
      let region2 = Core.atlas.find("adc-freezer")
      Draw.rect(region2, this.x, this.y);
}
});

const creoMixer = extend(LiquidConverter, "creotite-mixer", {});

const creostoneSmelter = extend(GenericSmelter, "creostone-smelter", {});

const creotiteConverter = extend(AttributeCrafter, "creotite-converter", {});

const ledoniteMixer = extend(LiquidConverter, "ledonite-mixer", {});

const cryofluidMegamixer = extend(LiquidConverter, "cryofluid-megamixer", {});

const globiumSmelter = extend(AttributeCrafter, "globium-smelter", {});

const tinoriumSmelter = extend(AttributeCrafter, "tinorium-smelter", {});

const plastaniumSmelter = extend(AttributeCrafter, "plastanium-smelter", {});

const clothingPhaseFactory = extend(GenericCrafter, "clothing-phase-factory", {});

const impulseKineticSmelter = extend(AttributeCrafter, "impulse-kinetic-smelter", {});

const electromixer = extend(LiquidConverter, "electromixer", {});

const leadCharger = extend(GenericSmelter, "lead-charger", {});

const stickCharger = extend(GenericSmelter, "stick-charger", {});

const ingotCharger = extend(GenericSmelter, "ingot-charger", {});

const cylinderCharger = extend(AttributeCrafter, "cylinder-charger", {});

function newNode(parent, content, req, objectives){
	
    var parnode = TechTree.get(parent);
    var node = new TechTree.TechNode(parnode, content, req = null ? content.researchRequirements() : req);
    var used = new ObjectSet();
  
    node.objectives.addAll(objectives = null ? null : objectives);
}
 
newNode(Blocks.cryofluidMixer, creoMixer, ItemStack.with(Items.copper, 6500, Items.lead, 4500, Items.silicon, 3000, Items.thorium, 2250), Seq.with(new Objectives.SectorComplete(sectors.creotitePowerStation)));
     
module.exports = {
  multi: multi,
}
