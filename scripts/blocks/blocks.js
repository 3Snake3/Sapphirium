const multiLib = require("multi-lib");

const smallDrill = extend(Drill, "smalldrill", {
	setStats(){
		this.super$setStats();
		this.stats.remove(Stat.boostEffect);
	},
	setBars(){
		this.super$setBars();
		this.bars.remove("liquid");
		}
});

const multi = multiLib.MultiCrafter(GenericCrafter, GenericCrafter.GenericCrafterBuild, "freezer", [
    {
      input: {
        liquids: ["water/2"],
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
            items: ["adc-cryocube/5"]
          },
          craftTime: 95
        },
        {
          input: {
            liquids: ["water/6", "slag/3"],
            power: 0.6
          },
          output: {
            items: ["adc-cinderblock/4"]
          },
          craftTime: 120
        },
        {
          input: {
            liquids: ["oil/10"]
          },
          output: {
            items: ["coal/4"],
            power: 3
          },
          craftTime: 160
        },
        {
        input: {
            liquids: ["adc-surge-mass/12"]
          },
          output: {
            items: ["adc-surge-stone/2"]
          },
          craftTime: 125
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

const creostoneProjector = new JavaAdapter(ForceProjector, {
  drawPlace(x, y, rotation, valid){
    Draw.color(Vars.player.team().color.cpy().mul(1, 0.75, 0.25, 1));
    Lines.stroke(1);
    Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius);

    Draw.color(Vars.player.team().color.cpy().mul(1, 0.25, 0.25, 1));
    Lines.stroke(1);
    Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius + this.phaseRadiusBoost);
    Draw.color();
  }
}, "creostone-wall-huge");

creostoneProjector.consumes.item(Items.phaseFabric).boost();
creostoneProjector.consumes.power(2);

creostoneProjector.buildType = () => extendContent(ForceProjector.ForceBuild, creostoneProjector, {
    drawShield(){
        if(!this.broken){
            var radius = this.realRadius();

            var flash = 10 * (this.phaseHeat - 0.46);
            flash += flash * Time.delta;

            Draw.color(this.team.color.cpy(), this.team.color.cpy().mul(1, 0.25, 0.25, 1), Mathf.absin(flash, 9, 1));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.poly(this.x, this.y, 4, radius);
            }else{
                Lines.stroke(1.5);
                Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
                Fill.square(this.x, this.y, radius);
                Draw.alpha(1);
                Lines.square(this.x, this.y, radius);
                Draw.reset();
            }
        }
        Draw.reset();
    }
});

const items = require("items");

const indBar = extendContent(ForceProjector, "indigo-barrier", {
  drawPlace(x, y, rotation, valid){
        this.drawPotentialLinks(x, y);

        Draw.color(Pal.lancerLaser);
        Lines.stroke(3);
        Lines.poly(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, 8, this.radius);
        Draw.color(Pal.lancerLaser);
        Lines.stroke(1);
        Lines.poly(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, 8, this.radius);
        Draw.color();
    }
});

indBar.consumes.item(items.globium).boost();
indBar.consumes.power(8);

indBar.buildType = () => extendContent(ForceProjector.ForceBuild, indBar, {
    drawShield(){
        if(!this.broken){
            var radius = this.realRadius();

            var flash = 10 * (this.phaseHeat - 0.46);
            flash += flash * Time.delta;

            Draw.color(Pal.lancerLaser, Pal.lancerLaser, Mathf.absin(flash, 9, 1));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.poly(this.x, this.y, 8, radius);
            }else{
                Lines.stroke(1.5);
                Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
                Fill.poly(this.x, this.y, 8, radius);
                Draw.alpha(1);
                Lines.poly(this.x, this.y, 8, radius);
                Draw.reset();
            }
        }
        Draw.reset();
    }
});

const massDriver = extendContent(MassDriver, "compact-driver", {});
massDriver.bullet = extend(MassDriverBolt, {});

const graphiteWT = extend(PowerTurret, "graphite-wall-turret", {
flags: EnumSet.of(BlockFlag.turret),
});

const coalWT = extend(PowerTurret, "coal-wall-turret", {
flags: EnumSet.of(BlockFlag.turret),
});

const siliconWT = extend(PowerTurret, "silicon-wall-turret", {
flags: EnumSet.of(BlockFlag.turret),
});

const cryocubeWT = extend(PowerTurret, "cryocube-wall-turret", {
flags: EnumSet.of(BlockFlag.extinguisher, BlockFlag.turret),
});

const icecubeWT = extend(PowerTurret, "ice-cube-wall-turret", {
flags: EnumSet.of(BlockFlag.turret),
});

const creostoneWT = extend(PowerTurret, "creotite-wall-turret", {
flags: EnumSet.of(BlockFlag.turret),
});

const cinderblockWT = extend(PowerTurret, "cinderblock-wall-turret", {
flags: EnumSet.of(BlockFlag.turret),
});

var lightningChance = 0.08;
var lightningDamage = 60;
var lightningLength = 16;
var lightningColor = Pal.surge;
var lightningSound = Sounds.spark;
const chargedLW = extend(SolarGenerator, "charged-lead-wall", {
setStats(){
        this.super$setStats();
        if(lightningChance > 0){
            this.stats.add(Stat.lightningChance, lightningChance * 100, StatUnit.percent);
            this.stats.add(Stat.lightningDamage, lightningDamage, StatUnit.none);
        }
    }
});
chargedLW.buildType = () => extendContent(SolarGenerator.SolarGeneratorBuild, chargedLW, {
	collision(bullet){
            this.super$collision(bullet);
            var hit = 1;
            //create lightning if necessary
            if(lightningChance > 0){
                if(Mathf.chance(lightningChance)){
                    Lightning.create(this.team, lightningColor, lightningDamage, this.x, this.y, bullet.rotation() + 180, lightningLength);
                    lightningSound.at(this.tile, Mathf.random(0.9, 1.1));
                }
            }
      return true;
}
});

const statuses = require("statuses/statuses");

/*const cold = Attribute.add("cold");
Blocks.snow.attributes.set(cold, 0.2);
Blocks.iceSnow.attributes.set(cold, 0.45);
Blocks.ice.attributes.set(cold, 0.7);*/

const powerProduction = 9;
const generationType = Stat.basePowerGeneration;

const coreCage = extend(CoreBlock, "core-cage", {
	
    hasPower: true,
    outputsPower: true,
    consumesPower: false,
	
    setStats(){
        this.super$setStats();
        this.stats.add(generationType, powerProduction * 60, StatUnit.powerSecond);
    },
	
    setBars(){
        this.super$setBars();
        this.bars.add("poweroutput", entity => new Bar(
	    () => Core.bundle.format("bar.poweroutput", powerProduction * 60), 
	    () => Pal.powerBar, 
	    () => 1
	));
    },

    baseExplosiveness: 10,
    thrusterLength: 46/4,
    flags: EnumSet.of(BlockFlag.core, BlockFlag.generator),
});

const productionEfficiency = 1.0;
coreCage.buildType = () => extendContent(CoreBlock.CoreBuild, coreCage, {
        getPowerProduction(){
            return powerProduction * productionEfficiency;
        }
    });
	
	
const ledoniteLiquid = extendContent(Floor, "ledonite", {
	isLiquid: true,
	status: statuses.superFreezing,
	statusDuration: 240,
	drownTime: 150,
	speedMultiplier: 0.19,
	lightColor: Color.valueOf("c1f4ff"),
	});
	
const upgPump = extend(Pump, "upgraded-pump", {});

const slagExtractor = extend(Fracker, "slag-extractor", {
	outputsPower: true
});

const sofcm = extend(Separator, "s-of-c-m", {
	load(){
	this.super$load();
	this.region = Core.atlas.find(this.name);
    this.liquidRegion = Core.atlas.find(this.name + "-liquid");
    this.spinnerRegion = Core.atlas.find(this.name + "-spinner");
    /*this.spinnerRegion2 = Core.atlas.find(this.name + "-spinner2");*/
    this.topRegion = Core.atlas.find(this.name + "-top");
    },
    icons(){
    return [
      this.region,
      this.spinnerRegion,
      /*this.spinnerRegion2,*/
      this.topRegion,
      ]
  }
});

sofcm.buildType = () => extendContent(Separator.SeparatorBuild, sofcm, {
	draw(){
      var b = sofcm;
      /*var spinSpeed = 5;*/
      Draw.rect(b.region, this.x, this.y);
      Drawf.liquid(b.liquidRegion, this.x, this.y, this.liquids.total() / b.liquidCapacity, this.liquids.current().color);
      Draw.rect(b.spinnerRegion, this.x, this.y, this.totalProgress * b.spinnerSpeed);
      /*Draw.rect(b.spinnerRegion2, this.x, this.y, -this.totalProgress * spinSpeed);*/
      Draw.rect(b.topRegion, this.x, this.y);
    }
  })
  
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

creostoneSP.buildType = () => extendContent(SolarGenerator.SolarGeneratorBuild, creostoneSP, {
draw(){
      var b = creostoneSP;
      var rotatorSpeed = 3;
      Draw.rect(b.region, this.x, this.y);
      if(drawSpinSprite){
      Drawf.spinSprite(b.sliderRegion1, this.x, this.y, -Time.time * rotatorSpeed);
      }
    }
  })

const scarlet = extend(CoreBlock, "scarlet-gem", {
	health: 3400,
	size: 4,
	itemCapacity: 2000,
	unitCapModifier: 2,
	thrusterLength: 34/4,
	researchCostMultiplier: 0.05,
	canPlaceOn(tile, team, rotation){
        return true;
    },
    canBreak(tile){
    	return true;
    },
    setStats(){
this.super$setStats();
if(this.canBeBuilt() && this.requirements.length > 0){
this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
        }
     }
 });
 
 var LC = 0.08;
var LD = 80;
var LL = 25;
var LCO = Pal.lancerLaser;
var LS = Sounds.spark;
 const indigo = extend(CoreBlock, "indigo", {
	health: 5000,
	size: 4,
	itemCapacity: 3000,
	unitCapModifier: 3,
	thrusterLength: 34/4,
	researchCostMultiplier: 0.07,
	canPlaceOn(tile, team, rotation){
        return true;
    },
    canReplace(other){
    if(other instanceof CoreBlock) return false;
    return this.super$canReplace(other);
},
    canBreak(tile){
    	return true;
    },
    setStats(){
this.super$setStats();
if(this.canBeBuilt() && this.requirements.length > 0){
this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
        }
if(LC > 0){
            this.stats.add(Stat.lightningChance, LC * 100, StatUnit.percent);
            this.stats.add(Stat.lightningDamage, LD, StatUnit.none);
        }
    }
 });
indigo.buildType = () => extendContent(CoreBlock.CoreBuild, indigo, {
	collision(bullet){
            this.super$collision(bullet);
            var hitl = 1;
            //create lightning if necessary
            if(LC > 0){
                if(Mathf.chance(LC)){
                    Lightning.create(this.team, LCO, LD, this.x, this.y, bullet.rotation() + 180, LL);
                    LS.at(this.tile, Mathf.random(0.9, 1.1));
                }
            }
      return true;
}
});

const tm = extend(AttributeCrafter, "thorium-mine", {
	load(){
this.super$load();
this.region = Core.atlas.find(this.name);
this.liquidRegion = Core.atlas.find(this.name + "-liquid");
this.bottomGlow = Core.atlas.find(this.name + "-bottom-glow");
this.rotatorRegion = Core.atlas.find(this.name + "-rotator");
this.rotatorRegion2 = Core.atlas.find(this.name + "-rotator2");
this.topRegion = Core.atlas.find(this.name + "-top");
},
icons(){
    return [
      this.region,
      this.rotatorRegion,
      this.rotatorRegion2,
      this.topRegion
      ]
  }
});

tm.buildType = () => extendContent(AttributeCrafter.AttributeCrafterBuild, tm, {
draw(){
      var rotateSpeed = 5;
      var rotateSpeed2 = 7;
      var glowAmount = 0.9;
      var glowScale = 3;
      Draw.rect(tm.region, this.x, this.y);
      Drawf.liquid(tm.liquidRegion, this.x, this.y, this.liquids.total() / tm.liquidCapacity, this.liquids.current().color);
      Draw.alpha(Mathf.absin(this.totalProgress, glowScale, glowAmount) * this.warmup);
      Draw.rect(tm.bottomGlow, this.x, this.y);
      Draw.reset();
      if(drawSpinSprite){
      Drawf.spinSprite(tm.rotatorRegion, this.x, this.y, this.totalProgress * rotateSpeed);
      Drawf.spinSprite(tm.rotatorRegion2, this.x, this.y, -this.totalProgress * rotateSpeed2);
      }else{
      Draw.rect(tm.rotatorRegion, this.x, this.y, this.totalProgress * rotateSpeed);
      Draw.rect(tm.rotatorRegion2, this.x, this.y, -this.totalProgress * rotateSpeed2);
      }
      Draw.rect(tm.topRegion, this.x, this.y);
    }
  });
  
const glStack = extend(StackConveyor, "gl-stack-conveyor", {
	speed: 6 / 60
});

const sectors = require("sectors");

function newNode(parent, content, req, objectives){
	
    var parnode = TechTree.get(parent);
    var node = new TechTree.TechNode(parnode, content, req = null ? content.researchRequirements() : req);
    var used = new ObjectSet();
  
    node.objectives.addAll(objectives = null ? null : objectives);
}
 
newNode(Blocks.cryofluidMixer, creoMixer, ItemStack.with(Items.copper, 6500, Items.lead, 4500, Items.silicon, 3000, Items.thorium, 2250), Seq.with(new Objectives.SectorComplete(sectors.creotitePowerStation)));
     
module.exports = {
  multi: multi,
  upgPump: upgPump
}
