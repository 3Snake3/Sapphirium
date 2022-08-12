const statuses = require("statuses/statuses");
const items = require("items");

const icecubeWall = extend(Wall, "ice-cube-wall", {});

const icecubeWT = extend(PowerTurret, "ice-cube-wall-turret", {
});

const leadedCopperWall = extend(Wall, "leaded-copper-wall", {
});

const leadedCopperWallLarge = extend(Wall, "leaded-copper-wall-large", {
});

const strongStorage = extend(StorageBlock, "strong-storage", {});

const graphiteWall = extend(MendProjector, "graphite-wall", {});

const graphiteWT = extend(PowerTurret, "graphite-wall-turret", {});

const siliconWall = extend(Wall, "silicon-wall", {});

const siliconWT = extend(PowerTurret, "silicon-wall-turret", {
});

const stoneWall = extend(Wall, "stone-e-wall", {});

const stoneWT = extend(PowerTurret, "stone-wall-turret", {
});

const cryocubeWall = extend(PowerTurret, "cryocube-wall", {});

const cryocubeWT = extend(PowerTurret, "cryocube-wall-turret", {
});

const creostoneWall = extend(OverdriveProjector, "creostone-wall", {});

const creostoneWT = extend(PowerTurret, "creostone-wall-turret", {
});

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

creostoneProjector.consumeItem(Items.phaseFabric).boost();
creostoneProjector.consumePower(2);

creostoneProjector.buildType = () => extend(ForceProjector.ForceBuild, creostoneProjector, {
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

var dischargeChance = 0.3;
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

var waveRadius = 60;
var waveDamage = 60;
var waveEffect = Fx.sapExplosion;
var waveSound = Sounds.plasmadrop;
var waveChance = 0.3;
var waveStatus = StatusEffects.sapped;
var waveStatusDuration = 180;
var waveBullet = extend(BasicBulletType, {
	width: 12,
	height: 12,
	damage: 5,
	speed: 4,
	lifetime: 30,
	spin: 3,
	status: waveStatus,
	statusDuration: waveStatusDuration,
	lightOpacity: 0,
	hitSound: Sounds.explosion,
	sprite: "adc-tinorium-shard"
});
var sapEffect = extend(WaveEffect, {
	sides: 0,
	sizeFrom: 0,
	sizeTo: 75,
	strokeFrom: 3,
	strokeTo: 0,
	lifetime: 20,
	colorFrom: Color.valueOf("bf92f9"),
	colorTo: Color.valueOf("6d56bf"),
});
var sapEffectLarge = extend(WaveEffect, {
	sides: 0,
	sizeFrom: 0,
	sizeTo: 85,
	strokeFrom: 4,
	strokeTo: 0,
	lifetime: 24,
	colorFrom: Color.valueOf("bf92f9"),
	colorTo: Color.valueOf("6d56bf"),
});
const tinorWall = extend(Wall, "tinorium-wall", {});
tinorWall.buildType = () => extend(Wall.WallBuild, tinorWall, {
	collision(bullet){
            this.super$collision(bullet);
            //create shockwave and sapping bullet
    if(waveChance > 0){
    if(Mathf.chance(waveChance)){
            waveSound.at(this);
            Damage.damage(this.x, this.y, waveRadius * Vars.tilesize, waveDamage * 1);
            waveEffect.at(this.x, this.y);
            //create a wall piece 
           for(var i = 0; i < 2; i++){
                    waveBullet.create(this, this.x, this.y, (360 / 2) * i + Mathf.random(10));
                }
      }
  }
            return true;
}
});
const tinorWallLarge = extend(Wall, "tinorium-wall-large", {});
tinorWallLarge.buildType = () => extend(Wall.WallBuild, tinorWallLarge, {
	collision(bullet){
            this.super$collision(bullet);
            //create shockwave and sapping bullet
    if(waveChance > 0){
    if(Mathf.chance(waveChance)){
            waveSound.at(this);
            Damage.damage(this.x, this.y, 70 * Vars.tilesize, 70 * 1);
            sapEffect.at(this.x, this.y);
            //create a wall piece when enemies hit wall
           for(var i = 0; i < 3; i++){
                    waveBullet.create(this, this.x, this.y, (360 / 3) * i + Mathf.random(16));
                }
      }
  }
            return true;
}
});
const armedTinoriumWall = extend(PowerTurret, "armed-tinorium-wall", {});
armedTinoriumWall.buildType = () => extend(PowerTurret.PowerTurretBuild, armedTinoriumWall, {
	collision(bullet){
            this.super$collision(bullet);
            //create shockwave and sapping bullet
    if(waveChance > 0){
    if(Mathf.chance(waveChance)){
            waveSound.at(this);
            Damage.damage(this.x, this.y, 80 * Vars.tilesize, 80 * 1);
            sapEffectLarge.at(this.x, this.y);
            //create a wall piece when enemies hit wall
           /*for(var i = 0; i < 4; i++){
                    waveBullet.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
                }*/
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
	sprite: "adc-crystal",
	backColor: Color.valueOf("8a3340"),
	frontColor: Color.valueOf("ff6e6e"),
});

const crystal = extend(BasicBulletType, {
	width: 18,
	height: 24,
	pierce: true,
	pierceCap: 1,
	lifetime: 25,
	sprite: "adc-crystal",
	backColor: Color.valueOf("8a3340"),
	frontColor: Color.valueOf("ff6e6e"),
	damage: 15,
	speed: 5,
	fragBullets: 3,
	fragCone: 75,
	fragBullet: crystalFrag
});
	

const granateWall = extend(Wall, "granate-wall", {
	health: 760,
});
granateWall.buildType = () => extend(Wall.WallBuild, granateWall, {
	collision(bullet){
            this.super$collision(bullet);
            //create crystal bullet
    if(this.health < 228){
    	if(1.2 > 0){
    if(Mathf.chance(1.2)){
    	for(var i = 0; i < 4; i++){
            crystal.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
      }
      }
      }
      }
            return true;
}
});

const granateWallLarge = extend(Wall, "granate-wall-large", {
	health: 2680,
});
granateWallLarge.buildType = () => extend(Wall.WallBuild, granateWallLarge, {
	collision(bullet){
            this.super$collision(bullet);
            //create crystal bullet
    if(this.health < 1340){
    	if(1.5 > 0){
    if(Mathf.chance(1.5)){
    	for(var i = 0; i < 4; i++){
            crystal.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
      }
      }
      }
      }
            return true;
}
});

const healBullet = extend(LaserBoltBulletType, {
	speed: 5.3,
	damage: 10,
	homingPower: 0.1,
	homingRange: 80,
	collidesTeam: true,
	healPercent: 5,
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
    	if(0.5 > 0){
    if(Mathf.chance(0.5)){
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
    	if(0.5 > 0){
    if(Mathf.chance(0.5)){
    	for(var i = 0; i < 6; i++){
            healBullet.create(this, this.x, this.y, (360 / 6) * i + Mathf.random(16));
            Sounds.lasershoot.at(this)
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
var lChance = 0.15;
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
                	for(var i = 0; i < 6; i++){
                    lLightning.create(this, this.x, this.y, (360 / 6) * i + Mathf.random(16));
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
                    for(var i = 0; i < 6; i++){
                    lLightning.create(this, this.x, this.y, (360 / 6) * i + Mathf.random(16));
                    }
                    lightningSound.at(this.tile, Mathf.random(0.9, 1.1));
                }
              }
                return true;
            }
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