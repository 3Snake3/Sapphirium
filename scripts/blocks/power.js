const sandGenerator = extend(ConsumeGenerator, "sand-generator", {});
const copperTransformer = extend(ConsumeGenerator, "copper-transformer", {});
const strongPowerNode = extend(PowerNode, "strong-power-node", {});

const solarPanelMedium = extend(SolarGenerator, "solar-panel-medium", {});

const hydrogenerator = extend(ThermalGenerator, "hydrogenerator", {});
const sporeGenerator = extend(ThermalGenerator, "spore-generator", {});
const oilTransformer = extend(ThermalGenerator, "oil-transformer", {});

const ChargeGenerator = extend(ConsumeGenerator, "electrogenerator", {
hasItems: true,
hasLiquids: false,
envEnabled: Env.any,
});
ChargeGenerator.consume(new ConsumeItemCharged);

const thoriumGenerator = extend(ConsumeGenerator, "thorium-generator", {
});

const chargeReactor = extend(ImpactReactor, "charge-reactor", {});

const creostonePowerNode = extend(PowerNode, "creostone-power-node", {});
const creostonePowerNodeLarge = extend(PowerNode, "creostone-power-node-large", {});
const creostoneBattery = extend(Battery, "creostone-battery", {});
const creostonePowerTower = extend(PowerNode, "creostone-power-tower", {});

const creostoneReactor = extend(NuclearReactor, "creostone-reactor", {});

var drawSpinSprite = true;
const creostoneSP = extend(SolarGenerator, "creostone-solar-panel", {
load(){
this.super$load();
this.region = Core.atlas.find(this.name);
this.sliderRegion1 = Core.atlas.find(this.name + "-slider1");
},
icons(){
    return [
      this.region,
      this.sliderRegion1
      ]
  }
});

creostoneSP.buildType = () => extend(SolarGenerator.SolarGeneratorBuild, creostoneSP, {
draw(){
      var b = creostoneSP;
      var rotatorSpeed = 3;
      Draw.rect(b.region, this.x, this.y);
      if(drawSpinSprite){
      Drawf.spinSprite(b.sliderRegion1, this.x, this.y, -Time.time * rotatorSpeed);
      }
    }
  })