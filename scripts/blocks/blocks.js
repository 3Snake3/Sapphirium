const multiLib = require("multi-lib");

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

/**This is not my code, its belongs to sharlotte-mobile/ExampleMod*/
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

const statuses = require("statuses/statuses");

/*const cold = Attribute.add("cold");
Blocks.snow.attributes.set(cold, 0.2);
Blocks.iceSnow.attributes.set(cold, 0.45);
Blocks.ice.attributes.set(cold, 0.7);*/

const powerProduction = 7.5;
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
        this.bars.add("power", entity => new Bar(() => Core.bundle.format("bar.poweroutput", Strings.fixed(entity.getPowerProduction() * 60 * entity.timeScale(), 1)), () => Pal.powerBar, () => entity.productionEfficiency));
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

module.exports = {
  multi: multi,
  upgPump: upgPump
}