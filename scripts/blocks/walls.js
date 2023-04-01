const statuses = require("statuses/statuses");
const items = require("items");

const denseWall = extend(Wall, "dense-wall", {
});

const denseWallLarge = extend(Wall, "dense-wall-large", {
});

const icecubeWall = extend(Wall, "ice-cube-wall", {});

const armedIceCubeWall = extend(PowerTurret, "armed-ice-cube-wall", {
});

const graphiteWall = extend(MendProjector, "graphite-wall", {});

const armedGraphiteWall = extend(PowerTurret, "armed-graphite-wall", {});

const stoneWall = extend(Wall, "stone-e-wall", {});

const armedStoneWall = extend(PowerTurret, "armed-stone-wall", {
});

const siliconWall = extend(Wall, "silicon-wall", {});

const armedSiliconWall = extend(PowerTurret, "armed-silicon-wall", {
});

const cryocubeWall = extend(PowerTurret, "cryocube-wall", {});

const armedCryocubeWall = extend(PowerTurret, "armed-cryocube-wall", {
});

const creostoneWall = extend(OverdriveProjector, "creostone-wall", {});

const armedCreostoneWall = extend(PowerTurret, "armed-creostone-wall", {
});

const creostoneWallHuge = new JavaAdapter(ForceProjector, {
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

creostoneWallHuge.consumeItem(Items.phaseFabric).boost();
creostoneWallHuge.consumePower(2);

creostoneWallHuge.buildType = () => extend(ForceProjector.ForceBuild, creostoneWallHuge, {
    drawShield(){
        if(!this.broken){
            var radius = this.realRadius();

            var flash = 10 * (this.phaseHeat - 0.46);
            flash += flash * Time.delta;

            Draw.color(this.team.color.cpy(), this.team.color.cpy().mul(1, 0.25, 0.25, 1), Mathf.absin(flash, 9, 1));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.square(this.x, this.y, radius);
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

var dischargeChance = 0.1;
var dischargeDamage = 60;
var dischargeLength = 14;
var dischargeColor = Pal.lancerLaser;
var dischargeSound = Sounds.spark;
const globiumWall = new JavaAdapter(ForceProjector, {
  drawPlace(x, y, rotation, valid){
        this.super$drawPlace(x, y, rotation, valid);

        Draw.color(Pal.lancerLaser);
        Lines.stroke(3);
        Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius);
        Draw.color(Pal.lancerLaser);
        Lines.stroke(1);
        Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius);
        Draw.color();
    },
setStats(){
        this.super$setStats();
        if(dischargeChance > 0){
            this.stats.add(Stat.lightningChance, dischargeChance * 100, StatUnit.percent);
            this.stats.add(Stat.lightningDamage, dischargeDamage, StatUnit.none);
        }
  }
}, "globium-wall");

globiumWall.consumeItem(items.globium).boost();
globiumWall.consumePower(2);

globiumWall.buildType = () => extend(ForceProjector.ForceBuild, globiumWall, {
    drawShield(){
        if(!this.broken){
            var radius = this.realRadius();

            var flash = 10 * (this.phaseHeat - 0.46);
            flash += flash * Time.delta;

            Draw.color(Pal.lancerLaser, Pal.lancerLaser, Mathf.absin(flash, 9, 1));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.square(this.x, this.y, radius);
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
    },
 collision(bullet){
            this.super$collision(bullet);
            var hit = 1;
            //create lightning if necessary
            if(dischargeChance > 0){
                if(Mathf.chance(dischargeChance)){
                    Lightning.create(this.team, dischargeColor, dischargeDamage, this.x, this.y, bullet.rotation() + 180, dischargeLength);
                    dischargeSound.at(this.tile, Mathf.random(0.9, 1.1));
                }
            }
      return true;
}
});

const globiumWallLarge = new JavaAdapter(ForceProjector, {
  drawPlace(x, y, rotation, valid){
        this.super$drawPlace(x, y, rotation, valid);

        Draw.color(Pal.lancerLaser);
        Lines.stroke(3);
        Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius);
        Draw.color(Pal.lancerLaser);
        Lines.stroke(1);
        Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius);
        Draw.color();
    },
setStats(){
        this.super$setStats();
        if(dischargeChance > 0){
            this.stats.add(Stat.lightningChance, dischargeChance * 100, StatUnit.percent);
            this.stats.add(Stat.lightningDamage, dischargeDamage, StatUnit.none);
        }
  }
}, "globium-wall-large");

globiumWallLarge.consumeItem(items.globium).boost();
globiumWallLarge.consumePower(4);

globiumWallLarge.buildType = () => extend(ForceProjector.ForceBuild, globiumWallLarge, {
    drawShield(){
        if(!this.broken){
            var radius = this.realRadius();

            var flash = 10 * (this.phaseHeat - 0.46);
            flash += flash * Time.delta;

            Draw.color(Pal.lancerLaser, Pal.lancerLaser, Mathf.absin(flash, 9, 1));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.square(this.x, this.y, radius);
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
    },
 collision(bullet){
            this.super$collision(bullet);
            var hit = 1;
            //create lightning if necessary
            if(dischargeChance > 0){
                if(Mathf.chance(dischargeChance)){
                    Lightning.create(this.team, dischargeColor, dischargeDamage, this.x, this.y, bullet.rotation() + 180, dischargeLength);
                    dischargeSound.at(this.tile, Mathf.random(0.9, 1.1));
                }
            }
      return true;
}
});

const healBullet = extend(LaserBoltBulletType, {
	speed: 4,
	damage: 0,
	homingPower: 0.1,
	homingRange: 80,
	collidesTeam: true,
	healPercent: 0.33,
	backColor: Pal.heal,
	frontColor: Color.white,
});
	
const emeraldWall = extend(Wall, "emerald-wall", {
	health: 800,
	category: Category.defense,
});
emeraldWall.buildType = () => extend(Wall.WallBuild, emeraldWall, {
	collision(bullet){
            this.super$collision(bullet);
            //create heal bullet
    	if(0.1 > 0){
    if(Mathf.chance(0.1)){
    	for(var i = 0; i < 4; i++){
            healBullet.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
            Sounds.lasershoot.at(this)
      }
      }
      }
            return true;
}
});

const emeraldWallLarge = extend(Wall, "emerald-wall-large", {
	health: 3200,
	category: Category.defense,
});
emeraldWallLarge.buildType = () => extend(Wall.WallBuild, emeraldWallLarge, {
	collision(bullet){
            this.super$collision(bullet);
            //create heal bullet
    	if(0.1 > 0){
    if(Mathf.chance(0.1)){
    	for(var i = 0; i < 4; i++){
            healBullet.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
            Sounds.lasershoot.at(this)
      }
      }
      }
            return true;
}
});

const crystalFrag = extend(BasicBulletType, {
	width: 10,
	height: 10,
	speed: 6,
	lifetime: 20,
	damage: 6,
	sprite: "sapphirium-crystal",
	backColor: Color.valueOf("8a3340"),
	frontColor: Color.valueOf("ff6e6e"),
	status: statuses.passiveBloodrage,
});

const crystal = extend(BasicBulletType, {
	width: 18,
	height: 24,
	pierce: true,
	pierceCap: 1,
	lifetime: 25,
	sprite: "sapphirium-crystal",
	backColor: Color.valueOf("8a3340"),
	frontColor: Color.valueOf("ff6e6e"),
	damage: 15,
	speed: 5,
	fragBullets: 3,
	fragCone: 75,
	fragBullet: crystalFrag,
	status: statuses.passiveBloodrage,
});

const rubyWall = extend(Wall, "ruby-wall", {
	health: 760,
});
rubyWall.buildType = () => extend(Wall.WallBuild, rubyWall, {
	collision(bullet){
            this.super$collision(bullet);
            //create crystal bullet
    if(this.health < 228){
    	if(0.05 > 0){
    if(Mathf.chance(0.05)){
    	for(var i = 0; i < 4; i++){
            crystal.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
      }
      }
      }
      }
            return true;
}
});

const rubyWallLarge = extend(Wall, "ruby-wall-large", {
	health: 2680,
});
rubyWallLarge.buildType = () => extend(Wall.WallBuild, rubyWallLarge, {
	collision(bullet){
            this.super$collision(bullet);
            //create crystal bullet
    if(this.health < 1340){
    	if(0.08 > 0){
    if(Mathf.chance(0.08)){
    	for(var i = 0; i < 4; i++){
            crystal.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
      }
      }
      }
      }
            return true;
}
});

var lLength = 13;
var lColor = Pal.surge;
var lDamage = 22;
var lSound = Sounds.spark;
var lChance = 0.05;
const lType = extend(BasicBulletType, {
	width: 8,
	height: 8,
speed: 0,
lifetime: 10,
damage: 5,
backColor: Pal.surge,
frontColor: Color.white,
status: StatusEffects.shocked,
statusDuration: 80,
});
const lLightning = extend(LightningBulletType, {
	damage: lDamage,
	lightningLength: lLength,
	lightningColor: lColor,
	lightningType: lType,
});
const surgeStoneWall = extend(Wall, "surge-stone-wall", {});
surgeStoneWall.buildType = () => extend(Wall.WallBuild, surgeStoneWall, {
	collision(bullet){
            this.super$collision(bullet);
            
            //create lightning if necessary
            if(lChance > 0){
                if(Mathf.chance(lChance)){
                	for(var i = 0; i < 4; i++){
                    lLightning.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
                    }
                    lightningSound.at(this.tile, Mathf.random(0.9, 1.1));
                }
              }
                return true;
            }
         });
const armedSurgeStoneWall = extend(PowerTurret, "armed-surge-stone-wall", {});
armedSurgeStoneWall.buildType = () => extend(PowerTurret.PowerTurretBuild, armedSurgeStoneWall, {
	collision(bullet){
            this.super$collision(bullet);
            
            //create lightning if necessary
            if(lChance > 0){
                if(Mathf.chance(lChance)){
                    for(var i = 0; i < 4; i++){
                    lLightning.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
                    }
                    lightningSound.at(this.tile, Mathf.random(0.9, 1.1));
                }
              }
                return true;
            }
         });

var lightningChance = 0.08;
var lightningDamage = 12;
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
chargedLW.buildType = () => extend(SolarGenerator.SolarGeneratorBuild, chargedLW, {
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

const reinforcedWall = extend(Wall, "reinforced-wall", {});