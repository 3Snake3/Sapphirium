const statuses = require("statuses/statuses");
const items = require("items");

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

globiumWall.consumes.item(items.globium).boost();
globiumWall.consumes.power(2);

globiumWall.buildType = () => extendContent(ForceProjector.ForceBuild, globiumWall, {
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

globiumWallLarge.consumes.item(items.globium).boost();
globiumWallLarge.consumes.power(4);

globiumWallLarge.buildType = () => extendContent(ForceProjector.ForceBuild, globiumWallLarge, {
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
tinorWall.buildType = () => extendContent(Wall.WallBuild, tinorWall, {
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
tinorWallLarge.buildType = () => extendContent(Wall.WallBuild, tinorWallLarge, {
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
armedTinoriumWall.buildType = () => extendContent(PowerTurret.PowerTurretBuild, armedTinoriumWall, {
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
granateWall.buildType = () => extendContent(Wall.WallBuild, granateWall, {
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
granateWallLarge.buildType = () => extendContent(Wall.WallBuild, granateWallLarge, {
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

/**var lLength = 13;
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
const armedSurgeStoneWall = extend(PowerTurret, "armed-surge-stone-wall", {
	collision(bullet){
            this.super$collision(bullet);
            
            //create lightning if necessary
            if(lChance > 0){
                if(Mathf.chance(lChance)){
                    ILightning.create(this.team, lColor, lDamage, this.x, this.y, bullet.rotation() + 180, lLength);
                    lightningSound.at(tile, Mathf.random(0.9f, 1.1f));
                }
            }**/
	

const graphiteWall = extend(MendProjector, "graphite-wall", {});

const graphiteWT = extend(PowerTurret, "graphite-wall-turret", {});

const siliconWall = extend(Wall, "silicon-wall", {});

const siliconWT = extend(PowerTurret, "silicon-wall-turret", {
});

const cryocubeWall = extend(PowerTurret, "cryocube-wall", {});

const cryocubeWT = extend(PowerTurret, "cryocube-wall-turret", {
});

const icecubeWall = extend(Wall, "ice-cube-wall", {});

const icecubeWT = extend(PowerTurret, "ice-cube-wall-turret", {
});

const cinderblockWall = extend(Wall, "cinderblock-wall", {});

const cinderblockWT = extend(PowerTurret, "cinderblock-wall-turret", {
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

const strongStorage = extend(StorageBlock, "strong-storage", {});

const superWall = extend(Wall, "super-wall", {});