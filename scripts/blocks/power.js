const copperTransformer = extend(ConsumeGenerator, "copper-transformer", {});
const strongPowerNode = extend(PowerNode, "strong-power-node", {});

const solarPanelMedium = extend(SolarGenerator, "solar-panel-medium", {});

const hydrogenerator = extend(ThermalGenerator, "hydrogenerator", {});
/*hydrogenerator.buildType = () => extend(ThermalGenerator.ThermalGeneratorBuild, hydrogenerator, {
		drawLight(){
            Drawf.light(this.x, this.y, (40 + Mathf.absin(10, 5)) * Math.min(this.productionEfficiency, 2) * this.size, Color.valueOf("8ca4f5"), 0.4);
        }
   });*/
const sporeGenerator = extend(ThermalGenerator, "spore-generator", {});
/*sporeGenerator.buildType = () => extend(ThermalGenerator.ThermalGeneratorBuild, sporeGenerator, {
		drawLight(){
            Drawf.light(this.x, this.y, (40 + Mathf.absin(10, 5)) * Math.min(this.productionEfficiency, 2) * this.size, Color.valueOf("c093fa"), 0.4);
        }
   });*/
const oilTransformer = extend(ThermalGenerator, "oil-transformer", {});
/*oilTransformer.buildType = () => extend(ThermalGenerator.ThermalGeneratorBuild, oilTransformer, {
		drawLight(){
            Drawf.light(this.x, this.y, (40 + Mathf.absin(10, 5)) * Math.min(this.productionEfficiency, 2) * this.size, Items.plastanium.color, 0.4);
        }
   });*/

const thoriumGenerator = extend(ConsumeGenerator, "thorium-generator", {
});

const chargeReactor = extend(ImpactReactor, "charge-reactor", {});

const hiddenPowerNode = extend(PowerNode, "hidden-node", {});

const creostonePowerNode = extend(PowerNode, "creostone-power-node", {});
const creostonePowerNodeLarge = extend(PowerNode, "creostone-power-node-large", {});
const creostoneBattery = extend(Battery, "creostone-battery", {
envDisabled: Env.scorching,
});
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