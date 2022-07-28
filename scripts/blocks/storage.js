//the bullet being created
const healBullet = extend(LaserBoltBulletType, {
width: 3,
height: 10,
speed: 6,
lifetime: 42.5,
collidesTeam: true,
healPercent: 12.5,
backColor: Pal.heal,
frontColor: Color.white,
damage: 30,
homingPower: 0.1,
homingRange: 60,
});
//chance of bullet creating
var healChance = 0.1;
//amount of bullets
var healBullets = 10;
//all bullets will be summoned around the core
var cone = 360;
//the inaccuracy of bullets
var healBulletInaccuracy = 6;
//shoot sound
var healBulletSound = Sounds.lasershoot;

//name of object, type of your content, file-name
const emeraldCore = extend(CoreBlock, "emerald-core", {
//is it possible to build a core regardless of another core
canPlaceOn(tile, team, rotation){
        return true;
    },
//can this core replace another one.
    canReplace(other){
    if(other instanceof CoreBlock) return false;
    return this.super$canReplace(other);
},
//is it possible to disassemble the core
    canBreak(tile){
    	return true;
    },
//adding build time for the core
    setStats(){
this.super$setStats();
if(this.canBeBuilt() && this.requirements.length > 0){
this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
        }
    }
});
emeraldCore.buildType = () => extend(CoreBlock.CoreBuild, emeraldCore, {
	//the event of a bullet hitting the core
collision(bullet){
            this.super$collision(bullet);
            //bullet create chance
            if(healChance > 0){
                if(Mathf.chance(healChance)){
                //amount of bullets created
                    for(var i = 0; i < healBullets; i++){
                    	//bullet summoning
                    healBullet.create(this, this.x, this.y, (cone / healBullets) * i + Mathf.random(healBulletInaccuracy));
                    Fx.healWave.at(this.x, this.y)
                    healBulletSound.at(this)
                }
                }
            }
          //can enemy bullets hit the core
      return true;
}
});
	
//9 amount of power per tick * 60 ticks(1 sec.) = 540 units of power in the game per second
const powerProduction = 9;
//for stats
const generationType = Stat.basePowerGeneration;

const coreCage = extend(CoreBlock, "core-cage", {
	
    hasPower: true,
    outputsPower: true,
    consumesPower: false,
	
	//for stats
    setStats(){
        this.super$setStats();
        this.stats.add(generationType, powerProduction * 60, StatUnit.powerSecond);
    },
	
	//for bars
    setBars(){
    	/*
        this.super$setBars();
        if(this.hasPower && this.outputsPower && this.consPower != null){
        this.addBar("power", entity => new Bar(
	    () => Core.bundle.format("bar.poweroutput", Strings.fixed(entity.getPowerProduction() * 60 * entity.timeScale(), 1)),
	    () => Pal.powerBar, 
	    () => entity.productionEfficiency));
	}
    },*/
    this.super$setBars();
        this.addBar("poweroutput", entity => new Bar(
	    () => Core.bundle.format("bar.poweroutput", powerProduction * 60), 
	    () => Pal.powerBar, 
	    () => 1
	));
    },

    baseExplosiveness: 10,
    thrusterLength: 46/4,
});

//efficiency multiplier 
const productionEfficiency = 1.0;
coreCage.buildType = () => extend(CoreBlock.CoreBuild, coreCage, {
	//endowing the core with the ability to produce power
        getPowerProduction(){
            return powerProduction * productionEfficiency;
        }
    });

const creostoneStorage = extend(StorageBlock, "creostone-storage", {});
    
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

//lightning chance
 var LC = 0.08;
//damage
var LD = 80;
//length
var LL = 25;
//color
var LCO = Pal.lancerLaser;
//shoot sound
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
indigo.buildType = () => extend(CoreBlock.CoreBuild, indigo, {
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

var oceanWaveEffect = extend(WaveEffect, {
	sides: 0,
	sizeFrom: 50,
	sizeTo: 50,
	strokeFrom: 3,
	strokeTo: 0,
	lifetime: 20,
	colorFrom: Color.valueOf("8ca4f5"),
	colorTo: Color.valueOf("6a75c4")
});
var oceanWaveSound = Sounds.plasmadrop;
var oceanWaveChance = 0.08;
var oceanWaveRadius = 50;
var oceanWaveDamage = 25;
const oceanWave = extend(BasicBulletType, {
	width: 0.001,
	height: 0.001,
	sprite: "circle-bullet",
	damage: 0,
	collides: false,
	speed: 0,
	lifetime: 1,
	splashDamage: oceanWaveDamage,
	splashDamageRadius: oceanWaveRadius,
	hitEffect: Fx.none,
	despawnEffect: oceanWaveEffect,
	status: StatusEffects.wet,
	statusDuration: 180,
});
	
const coreOcean = extend(CoreBlock, "core-ocean", {
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
    }
 });
coreOcean.buildType = () => extend(CoreBlock.CoreBuild, coreOcean, {
	collision(bullet){
            this.super$collision(bullet);
            //create water wave if necessary
            if(oceanWaveChance > 0){
    if(Mathf.chance(oceanWaveChance)){
            oceanWaveSound.at(this);
            for(var i = 0; i < 1; i++){
                    oceanWave.create(this, this.x, this.y, (360 / 1) * i + Mathf.random(0));
                }
      }
  }
            return true;
}
});

const victory = extend(CoreBlock, "core-victory", {});

const triumph = extend(CoreBlock, "core-triumph", {});