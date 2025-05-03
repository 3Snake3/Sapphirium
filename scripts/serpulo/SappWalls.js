const statuses = require("SappStatuses");
const items = require("SappItems");
const stats = require("serpulo/SappStorage");


const icecubeWall = extend(Wall, "ice-cube-wall", {});
const armedIceCubeWall = extend(PowerTurret, "armed-ice-cube-wall", {});
const graphiteWall = extend(MendProjector, "graphite-wall", {});
const armedGraphiteWall = extend(PowerTurret, "armed-graphite-wall", {});
const denseWall = extend(Wall, "dense-wall", {});
const denseWallLarge = extend(Wall, "dense-wall-large", {});
const siliconWall = extend(Wall, "silicon-wall", {});
const armedSiliconWall = extend(PowerTurret, "armed-silicon-wall", {});
const stoneWall = extend(Wall, "stone-e-wall", {
armor: 7,
});
const armedStoneWall = extend(PowerTurret, "armed-stone-wall", {
armor: 7,
});

var freezingWave = extend(WaveEffect, {
	sizeFrom: 40,
	sizeTo: 40,
	lifetime: 5,
	strokeTo: 0,
	colorFrom: Color.sky,
    colorTo: Color.sky,
});

var freezingSquares = extend(ParticleEffect, {
	particles: 10,
	lifetime: 120,
	length: 40,
	interp: Interp.circleOut,
	sizeInterp: Interp.circleOut,
	sizeFrom: 5,
	sizeTo: 0,
	colorFrom: Color.sky,
    colorTo: Color.sky,
    cone: 360,
});

var freezingWave2 = extend(WaveEffect, {
	sizeFrom: 130,
	sizeTo: 130,
	lifetime: 5,
	strokeTo: 0,
	colorFrom: Color.sky,
    colorTo: Color.sky,
});

var freezingSquares2 = extend(ParticleEffect, {
	particles: 10,
	lifetime: 120,
	length: 130,
	interp: Interp.circleOut,
	sizeInterp: Interp.circleOut,
	sizeFrom: 5,
	sizeTo: 0,
	colorFrom: Color.sky,
    colorTo: Color.sky,
    cone: 360,
});

var freezingAbility = extend(Ability, {
	addStats(t){
		t.add("[lightgray]" + Stat.range.localized() + ": [white]" + Strings.autoFixed(40 / Vars.tilesize, 2) + StatUnit.perSecond.localized());
	},
	localized(){
		return Core.bundle.get("ability." + "freezingfield");
		}
	});
	
var freezingSeq = new Seq();
var freezingValue = freezingSeq.add(freezingAbility);
var abilitiesFunction = new Stat("abilities", StatCat.function);
		
const cryocubeWall = extend(PowerTurret, "cryocube-wall", {
setStats(){
	this.super$setStats();
	this.stats.remove(Stat.ammo);
	this.stats.remove(Stat.reload);
	this.stats.remove(Stat.inaccuracy);
	this.stats.remove(Stat.shootRange);
	this.stats.add(abilitiesFunction, StatValues.abilities(freezingValue));
	}
});
cryocubeWall.buildType = () => extend(PowerTurret.PowerTurretBuild, cryocubeWall, {
	creload: 0,
	updateTile(){
		this.super$updateTile();
		this.creload++;
		if(this.creload == 1){
		Units.nearbyEnemies(this.team, this.x, this.y, 40, other => {
			if((other.type.targetable || other.type.hittable) && this.power.status >= 1){
			other.apply(statuses.overfreezing, 180);
		}
	});
	}
	else if(this.creload >= 1){
		this.creload = 0;
		}
}
});

const armedCryocubeWall = extend(PowerTurret, "armed-cryocube-wall", {
setStats(){
	this.super$setStats();
	this.stats.add(abilitiesFunction, StatValues.abilities(freezingValue));
	}
});
armedCryocubeWall.buildType = () => extend(PowerTurret.PowerTurretBuild, armedCryocubeWall, {
	creload: 0,
	updateTile(){
		this.super$updateTile();
		this.creload++;
		if(this.creload == 1){
		Units.nearbyEnemies(this.team, this.x, this.y, 40, other => {
			if((other.type.targetable || other.type.hittable) && this.power.status >= 1){
			other.apply(statuses.overfreezing, 180);
		}
	});
	}
	else if(this.creload >= 1){
		this.creload = 0;
		}
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
	health: 645,
	category: Category.defense,
	setStats() {
		this.super$setStats();
		this.stats.add(stats.laserBoltChance, (0.05 * 100), StatUnit.percent);
		this.stats.add(stats.laserBoltsAmount, 4, StatUnit.none);
		this.stats.add(stats.laserBolt, StatValues.ammo(ObjectMap.of(items.emerald, healBullet)));
	}
});
emeraldWall.buildType = () => extend(Wall.WallBuild, emeraldWall, {
	collision(bullet) {
        this.super$collision(bullet);
        //create heal bullet
        if(Mathf.chance(0.05)) {
            for(var i = 0; i < 4; i++) {
                healBullet.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
                Sounds.lasershoot.at(this);
            }
        }
        return true;
    }
});

const emeraldWallLarge = extend(Wall, "emerald-wall-large", {
	health: 2450,
	category: Category.defense,
	setStats() {
		this.super$setStats();
		this.stats.add(stats.laserBoltChance, (0.05 * 100), StatUnit.percent);
		this.stats.add(stats.laserBoltsAmount, 4, StatUnit.none);
		this.stats.add(stats.laserBolt, StatValues.ammo(ObjectMap.of(items.emerald, healBullet)));
	}
});
emeraldWallLarge.buildType = () => extend(Wall.WallBuild, emeraldWallLarge, {
    collision(bullet) {
        this.super$collision(bullet);
        //create heal bullet
        if(Mathf.chance(0.05)) {
            for(var i = 0; i < 4; i++) {
                healBullet.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
                Sounds.lasershoot.at(this);
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
	status: statuses.activeBloodrage,
});

var rubyShard = new Stat("rubyshard", StatCat.function);
var rubyShardChance = new Stat("rubyshardchance", StatCat.function);
var rubyShardAmount = new Stat("rubyshardamount", StatCat.function);

const rubyWall = extend(Wall, "ruby-wall", {
	health: 760,
	setStats(){
		this.super$setStats();
		this.stats.add(rubyShard, StatValues.ammo(ObjectMap.of(items.ruby, crystal)));
		this.stats.add(rubyShardChance, 0.05 * 100, StatUnit.percent);
		this.stats.add(rubyShardAmount, 4);
		}
});
rubyWall.buildType = () => extend(Wall.WallBuild, rubyWall, {
    collision(bullet) {
        this.super$collision(bullet);
        //create crystal bullet
        if(this.health < 228) {
            if(Mathf.chance(0.05)) {
                for(var i = 0; i < 4; i++) {
                    crystal.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
                }
            }
        }
        return true;
    }
});

const rubyWallLarge = extend(Wall, "ruby-wall-large", {
	health: 2680,
	setStats(){
		this.super$setStats();
		this.stats.add(rubyShard, StatValues.ammo(ObjectMap.of(items.ruby, crystal)));
		this.stats.add(rubyShardChance, 0.05 * 100, StatUnit.percent);
		this.stats.add(rubyShardAmount, 4);
		}
});
rubyWallLarge.buildType = () => extend(Wall.WallBuild, rubyWallLarge, {
    collision(bullet) {
        this.super$collision(bullet);
        //create crystal bullet
        if(this.health < 1340) {
            if(Mathf.chance(0.08)) {
                for(var i = 0; i < 4; i++) {
                    crystal.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
                }
            }
        }
        return true;
    }
});
const creostoneWall = extend(OverdriveProjector, "creostone-wall", {});
const armedCreostoneWall = extend(PowerTurret, "armed-creostone-wall", {});

const creostoneWallHuge = new JavaAdapter(ForceProjector, {
    drawPlace(x, y, rotation, valid) {
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
    drawShield() {
        if(!this.broken) {
            var radius = this.realRadius();

            var flash = 10 * (this.phaseHeat - 0.46);
            flash += flash * Time.delta;

            Draw.color(this.team.color.cpy(), this.team.color.cpy().mul(1, 0.25, 0.25, 1), Mathf.absin(flash, 9, 1));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")) {
                Fill.square(this.x, this.y, radius);
            }
            else {
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
const globiumWall = extend(ForceProjector, "globium-wall", {
	consumeCoolant: false,
    drawPlace(x, y, rotation, valid) {
        this.super$drawPlace(x, y, rotation, valid);

        Draw.color(Pal.lancerLaser);
        Lines.stroke(3);
        Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius);
        Draw.color(Pal.lancerLaser);
        Lines.stroke(1);
        Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius);
        Draw.color();
    },
    setStats() {
        this.super$setStats();
        if(dischargeChance > 0){
            this.stats.add(Stat.lightningChance, dischargeChance * 100, StatUnit.percent);
            this.stats.add(Stat.lightningDamage, dischargeDamage, StatUnit.none);
        }
    }
});
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
        //create lightning if necessary
        if(dischargeChance > 0) {
            if(Mathf.chance(dischargeChance)){
                Lightning.create(this.team, dischargeColor, dischargeDamage, this.x, this.y, bullet.rotation() + 180, dischargeLength);
                dischargeSound.at(this.tile, Mathf.random(0.9, 1.1));
            }
        }
        return true;
    }
});

const globiumWallLarge = extend(ForceProjector, "globium-wall-large", {
	consumeCoolant: false,
    drawPlace(x, y, rotation, valid) {
        this.super$drawPlace(x, y, rotation, valid);

        Draw.color(Pal.lancerLaser);
        Lines.stroke(3);
        Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius);
        Draw.color(Pal.lancerLaser);
        Lines.stroke(1);
        Lines.square(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.radius);
        Draw.color();
    },
    setStats() {
        this.super$setStats();
        if(dischargeChance > 0) {
            this.stats.add(Stat.lightningChance, dischargeChance * 100, StatUnit.percent);
            this.stats.add(Stat.lightningDamage, dischargeDamage, StatUnit.none);
        }
    }
});
globiumWallLarge.consumePower(4);
globiumWallLarge.buildType = () => extend(ForceProjector.ForceBuild, globiumWallLarge, {
    drawShield() {
        if(!this.broken) {
            var radius = this.realRadius();

            var flash = 10 * (this.phaseHeat - 0.46);
            flash += flash * Time.delta;

            Draw.color(Pal.lancerLaser, Pal.lancerLaser, Mathf.absin(flash, 9, 1));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")) {
                Fill.square(this.x, this.y, radius);
            }
            else {
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
    collision(bullet) {
        this.super$collision(bullet);
        //create lightning if necessary
        if(dischargeChance > 0) {
            if(Mathf.chance(dischargeChance)) {
                Lightning.create(this.team, dischargeColor, dischargeDamage, this.x, this.y, bullet.rotation() + 180, dischargeLength);
                dischargeSound.at(this.tile, Mathf.random(0.9, 1.1));
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
    setStats() {
        this.super$setStats();
        if(lightningChance > 0) {
            this.stats.add(Stat.lightningChance, lightningChance * 100, StatUnit.percent);
            this.stats.add(Stat.lightningDamage, lightningDamage, StatUnit.none);
        }
    }
});
chargedLW.buildType = () => extend(SolarGenerator.SolarGeneratorBuild, chargedLW, { 
	collision(bullet) {
            this.super$collision(bullet);
            var hit = 1;
            //create lightning if necessary
            if(lightningChance > 0) {
                if(Mathf.chance(lightningChance)) {
                    Lightning.create(this.team, lightningColor, lightningDamage, this.x, this.y, bullet.rotation() + 180, lightningLength);
                    lightningSound.at(this.tile, Mathf.random(0.9, 1.1));
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
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    status: StatusEffects.shocked,
    statusDuration: 80,
});
const lLightning = extend(LightningBulletType, {
	damage: lDamage,
	lightningLength: lLength,
	lightningColor: lColor,
	lightningType: lType,
});

const surgeExplosion = extend(ExplosionEffect, {
	waveRad: 16,
	waveColor: Pal.surge,
	sparks: 8,
	sparkRad: 18,
	sparkColor: Pal.surge,
});

const surgeEmpSpark = new Effect(40, e => {
        Draw.color(Pal.surge);
        Lines.stroke(e.fout() * 1.6);

        Angles.randLenVectors(e.id, 18, e.finpow() * 27, e.rotation, 360, (x, y) => {
            let ang = Mathf.angle(x, y);
            Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 6 + 1);
        });
    });

const surgeBullet = extend(ExplosionBulletType, {
	splashDamage: 50,
	splashDamageRadius: 16,
	buildingDamageMultiplier: 1.6,
	shootEffect: Fx.none,
	hitEffect: Fx.none,
	despawnEffect: surgeExplosion,
	status: statuses.shockStun,
	statusDuration: 30,
	removed(b){
		this.super$removed(b);
		Vars.indexer.allBuildings(b.x, b.y, 16, other => {
			if(other.team == b.team){
               other.applyBoost(1.18, 300);
               surgeEmpSpark.at(other.x, other.y, b.angleTo(other), Pal.surge);
               Fx.chainEmp.at(b.x, b.y, 0, Pal.surge, other);
               }
        });
       }
       });

const powerProduction = 0.8;
const productionEfficiency = 1.0;

const surgeStoneWall = extend(Wall, "surge-stone-wall", {
	destroyBullet: surgeBullet,
	destroyBulletSameTeam: true,
	baseExplosiveness: 4,
	hasPower: true,
    outputsPower: true,
    consumesPower: false,
    setStats() {
        this.super$setStats();
        if(lChance > 0) {
            this.stats.add(Stat.lightningChance, lChance * 100, StatUnit.percent);
            this.stats.add(Stat.lightningDamage, lDamage, StatUnit.none);
        }
        this.stats.add(Stat.basePowerGeneration, powerProduction * 60, StatUnit.powerSecond);
    },
    setBars() {
        this.super$setBars();
        this.addBar("poweroutput", entity => new Bar(
            () => Core.bundle.format("bar.poweroutput", powerProduction * 60), 
            () => Pal.powerBar, 
            () => 1
        ));
    },
});
surgeStoneWall.buildType = () => extend(Wall.WallBuild, surgeStoneWall, {
	collision(bullet) {
        this.super$collision(bullet);
        
        //create lightning if necessary
        if(lChance > 0) {
            if(Mathf.chance(lChance)) {
                for(var i = 0; i < 4; i++) {
                    lLightning.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
                }
                lightningSound.at(this.tile, Mathf.random(0.9, 1.1));
            }
        }
        return true;
    },
    getPowerProduction(){
    	return powerProduction * productionEfficiency;
     }
});
const armedSurgeStoneWall = extend(PowerTurret, "armed-surge-stone-wall", {
	destroyBullet: surgeBullet,
	destroyBulletSameTeam: true,
setStats() {
        this.super$setStats();
        if(lChance > 0) {
            this.stats.add(Stat.lightningChance, lChance * 100, StatUnit.percent);
            this.stats.add(Stat.lightningDamage, lDamage, StatUnit.none);
        }
    }
});
armedSurgeStoneWall.buildType = () => extend(PowerTurret.PowerTurretBuild, armedSurgeStoneWall, {
	collision(bullet) {
        this.super$collision(bullet);
        
        //create lightning if necessary
        if(lChance > 0) {
            if(Mathf.chance(lChance)) {
                for(var i = 0; i < 4; i++) {
                    lLightning.create(this, this.x, this.y, (360 / 4) * i + Mathf.random(16));
                }
                lightningSound.at(this.tile, Mathf.random(0.9, 1.1));
            }
        }
        return true;
    }
});

var laserChance = new Stat("laserchance");
var laserDamage = new Stat("laserdamage");
var laser = extend(LaserBulletType, {
	length: 11 * Vars.tilesize,
	colors: [Color.valueOf("f3e97960"), Pal.surge, Color.white],
	damage: 100,
	pierceCap: 2,
	drawSize: 400,
	hitSize: 4,
	status: StatusEffects.shocked,
	sideWidth: 0
});
const reinforcedWall = extend(Wall, "reinforced-wall", {
setStats(){
	this.super$setStats();
	this.stats.add(laserChance, 0.01 * 100, StatUnit.percent);
	this.stats.add(laserDamage, 100);
	}
});
reinforcedWall.buildType = () => extend(Wall.WallBuild, reinforcedWall, {
	collision(bullet){
		this.super$collision(bullet);
		if(Mathf.chance(0.01)){
			laser.create(this, this.team, this.x, this.y, bullet.rotation() + 180);
			Sounds.laser.at(this);
		}
		return true;
	}
});
