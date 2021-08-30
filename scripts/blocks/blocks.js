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
            liquids: ["slag/3"],
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
            items: ["coal/7"],
            power: 3
          },
          craftTime: 160
        },
], {
  },
  function Extra() {
    this.draw=function(){
      let region1 = Core.atlas.find("adc-freezer-top")
      Draw.rect(region1, this.x, this.y);
      let region2 = Core.atlas.find("adc-freezer")
      Draw.rect(region2, this.x, this.y)
};
});
exports.multi = multi;

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
    updateTile(){
        const customConsumer = trait => {
            if(trait.team != this.paramEntity.team && trait.type.absorbable && Mathf.dst(this.paramEntity.x, this.paramEntity.y, trait.x, trait.y) <= this.realRadius()){
                trait.absorb();
                Fx.absorb.at(trait);
                this.paramEntity.hit = 1;
                this.paramEntity.buildup += trait.damage * this.paramEntity.warmup;
            }
        };
        var phaseValid = creostoneProjector.consumes.get(ConsumeType.item).valid(this);
        this.phaseHeat = Mathf.lerpDelta(this.phaseHeat, Mathf.num(phaseValid), 0.1);
        if(phaseValid && !this.broken && this.timer.get(creostoneProjector.timerUse, creostoneProjector.phaseUseTime) && this.efficiency() > 0){
            this.consume();
        }

        this.radscl = Mathf.lerpDelta(this.radscl, this.broken ? 0 : this.warmup, 0.05);

        if(Mathf.chanceDelta(this.buildup / this.shieldHealth * 0.1)){
            Fx.reactorsmoke.at(this.x + Mathf.range(Vars.tilesize / 2), this.y + Mathf.range(Vars.tilesize / 2));
        }

        this.warmup = Mathf.lerpDelta(this.warmup, this.efficiency(), 0.1);

        if(this.buildup > 0){
            var scale = !this.broken ? creostoneProjector.cooldownNormal : creostoneProjector.cooldownBrokenBase;
            var cons = creostoneProjector.consumes.get(ConsumeType.liquid);
            if(cons.valid(this)){
                cons.update(this);
                scale *= (creostoneProjector.cooldownLiquid * (1 + (this.liquids.current().temperature - 0.4) * 0.9));
            }

            this.buildup -= this.delta() * scale;
        }

        if(this.broken && this.buildup <= 0){
            this.broken = false;
        }

        if(this.buildup >= creostoneProjector.shieldHealth + creostoneProjector.phaseShieldBoost && !this.broken){
            this.broken = true;
            this.buildup = creostoneProjector.shieldHealth;
            Fx.shieldBreak.at(this.x, this.y, this.realRadius(), this.team.color.cpy());
        }

        if(this.hit > 0){
            this.hit -= 1 / 5 * Time.delta;
        }

        var realRadius = this.realRadius();

        if(realRadius > 0 && !this.broken){
            this.paramEntity = this;
            Groups.bullet.intersect(this.x - realRadius, this.y - realRadius, realRadius * 2, realRadius * 2, customConsumer);
        }
    },
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

const graphiteW = extendContent(MendProjector, "graphite-wall", {});
exports.graphiteW = graphiteW;

const graphiteWT = extendContent(PowerTurret, "graphite-wall-turret", {});
exports.graphiteWT = graphiteWT;

const coalW = extendContent(Wall, "coal-wall", {});
exports.coalW = coalW;

const coalWT = extendContent(PowerTurret, "coal-wall-turret", {});
exports.coalWT = coalWT;

const siliconW = extendContent(Wall, "silicon-wall", {});
exports.siliconW = siliconW;

const siliconWT = extendContent(PowerTurret, "silicon-wall-turret", {});
exports.siliconWT = siliconWT;

const statuses = require("statuses/statuses");

const freezeWave = extend(BasicBulletType, 10, 0.9, "adc-none-bullet", {
    status: statuses.superFreezing,
    lifetime: 20,
    pierce: true,
    pierceBuilding: true,
    buildingDamageMultiplier: 0,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    absorbable: true,
    reflectable: false,
    hittable: false,
});

const fp = extendContent(PowerTurret, "freeze-projector", {});
fp.shootType = freezeWave;
exports.fp = fp;

const creostoneSP = extendContent(SolarGenerator, "creostone-solar-panel", {
    load(){	
        this.super$load()
        this.teamRegion = Core.atlas.find("adc-" + this.name + "-team")
    }
});
