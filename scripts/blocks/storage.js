const armoredContainer = extend(StorageBlock, "armored-container", {});

const armoredVault = extend(StorageBlock, "armored-vault", {});

//the bullet being created
const healBullet = extend(LaserBoltBulletType, {
width: 3,
height: 10,
speed: 6,
lifetime: 42.5,
collidesTeam: true,
healPercent: 1,
backColor: Pal.heal,
frontColor: Color.white,
damage: 30,
homingPower: 0.1,
homingRange: 60,
});
//chance of bullet creating
var healChance = 0.05;
//amount of bullets
var healBullets = 6;
//all bullets will be summoned around the core
var cone = 180;
//the inaccuracy of bullets
var healBulletInaccuracy = 6;
//shoot sound
var healBulletSound = Sounds.lasershoot;

//name of object, type of your content, file-name
const emeraldCore = extend(CoreBlock, "emerald-core", {
	targetable: false,
	buildCostMultiplier: 3,
//is it possible to build a core regardless of another core, true or false.
canPlaceOn(tile, team, rotation){
        return true;
    },
//can this core replace another one
    canReplace(other){
    if(other instanceof CoreBlock) return false;
    return this.super$canReplace(other);
},
//is it possible to break the core
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
	//enemy bullet hitting the block
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
creostoneStorage.envDisabled = Env.scorching;
    
const scarlet = extend(CoreBlock, "scarlet-gem", {
	health: 3400,
	size: 4,
	itemCapacity: 2000,
	unitCapModifier: 2,
	thrusterLength: 34/4,
	researchCostMultiplier: 0.05,
	targetable: false,
	buildCostMultiplier: 3,
	canPlaceOn(tile, team, rotation){
        return true;
    },
    canBreak(tile){
    	return true;
    },
    canReplace(other){
    if(other instanceof CoreBlock) return false;
    return this.super$canReplace(other);
},
    setStats(){
this.super$setStats();
if(this.canBeBuilt() && this.requirements.length > 0){
this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
        }
     }
 });

//lightning chance
 var LC = 0.05;
//damage
var LD = 80;
//length
var LL = 25;
//color
var LCO = Pal.lancerLaser;
//shoot sound
var LS = Sounds.spark;
const hoarfrostEffect = extend(ParticleEffect, {
	line: true,
	lenFrom: 6,
	lenTo: 0,
	strokeFrom: 1.6,
	lifetime: 20,
	length: 40,
	colorFrom: Pal.lancerLaser,
	colorTo: Pal.lancerLaser,
	cone: 180,
});
//lightning type
const frostBranchType = extend(BasicBulletType, {
	width: 6,
	height: 6,
	shrinkY: 0,
	damage: 0,
	collides: false,
	collidesTiles: false,
	lifetime: 1,
	hitEffect: Fx.none,
	despawnEffect: hoarfrostEffect,
	speed: 0,
});
//lightning itself
const frostBranch = extend(LightningBulletType, {
	damage: LD,
	lightningLength: LL,
	lightningColor: LCO,
	lightningType: frostBranchType,
	status: StatusEffects.freezing,
	statusDuration: 120,
});
 const snowMonolith = extend(CoreBlock, "snow-monolith", {
	health: 5000,
	size: 4,
	itemCapacity: 3000,
	unitCapModifier: 3,
	thrusterLength: 34/4,
	researchCostMultiplier: 0.07,
	targetable: false,
	buildCostMultiplier: 3,
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
snowMonolith.buildType = () => extend(CoreBlock.CoreBuild, snowMonolith, {
	collision(bullet){
            this.super$collision(bullet);
            var hitl = 1;
            //create lightning if necessary
            if(LC > 0){
                if(Mathf.chance(LC)){
                	for(var i = 0; i < 1; i++){
                    frostBranch.create(this, this.team, this.x, this.y, (360 / 1) * i + Math.random(16));
                    }
                    LS.at(this.tile, Mathf.random(0.9, 1.1));
                }
            }
      return true;
}
});

const coreOcean = extend(CoreBlock, "core-ocean", {
	targetable: false,
	buildCostMultiplier: 3,
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

const victory = extend(CoreBlock, "core-victory", {});

const triumph = extend(CoreBlock, "core-triumph", {});
triumph.envDisabled = Env.scorching;