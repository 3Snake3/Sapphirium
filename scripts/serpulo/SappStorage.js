const items = require("SappItems");

const armoredContainer = extend(StorageBlock, "armored-container", {});
const armoredVault = extend(StorageBlock, "armored-vault", {});
const creostoneStorage = extend(StorageBlock, "creostone-storage", {
    envDisabled: Env.scorching
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
    setStats() {
        this.super$setStats();
        this.stats.add(generationType, powerProduction * 60, StatUnit.powerSecond);
    },
	
	//for bars
    setBars() {
        this.super$setBars();
        this.addBar("poweroutput", entity => new Bar(
            () => Core.bundle.format("bar.poweroutput", powerProduction * 60), 
            () => Pal.powerBar, 
            () => 1
        ));
    },
    baseExplosiveness: 10,
    thrusterLength: 46 / 4,
});

//efficiency multiplier 
const productionEfficiency = 1.0;
coreCage.buildType = () => extend(CoreBlock.CoreBuild, coreCage, {
	//endowing the core with the ability to produce power
    getPowerProduction() {
        return powerProduction * productionEfficiency;
    }
});

//the bullet being created
const healBullet = extend(LaserBoltBulletType, {
    width: 3,
    height: 10,
    speed: 6,
    lifetime: 42.5,
    collidesTeam: true,
    healPercent: 1.25,
    displayAmmoMultiplier: false,
    backColor: Pal.heal,
    frontColor: Color.white,
    damage: 30,
    homingPower: 0.1,
    homingRange: 60,
});
//chance of bullet creating
var healChance = 0.01;
//amount of bullets
var healBullets = 10;
//all bullets will be summoned around the core
var cone = 360;
//the inaccuracy of bullets
var healBulletInaccuracy = 6;
//shoot sound
var healBulletSound = Sounds.lasershoot;


var emerald = items.emerald;
var laserBolt = new Stat("laserbolt", StatCat.function);
var laserBoltChance = new Stat("laserboltchance", StatCat.function);
var laserBoltsAmount = new Stat("laserboltsamount", StatCat.function);


//name of object, type of your content, file-name
const emeraldCore = extend(CoreBlock, "emerald-core", {
    targetable: false,
    buildCostMultiplier: 3,
    //is it possible to build a core regardless of another core
    canPlaceOn(tile, team, rotation) {
        return true;
    },
    //can this core replace another one
    canReplace(other) {
        if(other instanceof CoreBlock) return false;
        return this.super$canReplace(other);
    },
    //is it possible to break the core
    canBreak(tile) {
        return true;
    },
    //adding build time for the core
    setStats() {
        this.super$setStats();
        if(this.canBeBuilt() && this.requirements.length > 0) {
            this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
        }
        this.stats.add(laserBoltChance, (healChance * 100), StatUnit.percent);
        this.stats.add(laserBoltsAmount, healBullets, StatUnit.none);
        this.stats.add(laserBolt, StatValues.ammo(ObjectMap.of(this, healBullet)));
    }
});
emeraldCore.buildType = () => extend(CoreBlock.CoreBuild, emeraldCore, {
	//contact with enemy bullets event
    collision(bullet) {
        this.super$collision(bullet);
        //bullet create chance
        if(Mathf.chance(healChance)) {
        //amount of bullets created
            for(var i = 0; i < healBullets; i++) {
                //bullet summoning
                healBullet.create(this, this.x, this.y, (cone / healBullets) * i + Mathf.random(healBulletInaccuracy));
                Fx.healWave.at(this.x, this.y)
                healBulletSound.at(this)
            }
        }
        //can enemy bullets hit the core
        return true;
    }
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
	canPlaceOn(tile, team, rotation) {
        return true;
    },
    canReplace(other) {
        if(other instanceof CoreBlock) return false;
        return this.super$canReplace(other);
    },
    canBreak(tile) {
    	return true;
    },
    setStats() {
        this.super$setStats();
        if(this.canBeBuilt() && this.requirements.length > 0){
            this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
        }
    }
});

const coreOcean = extend(CoreBlock, "core-ocean", {
	targetable: false,
	buildCostMultiplier: 3,
	canPlaceOn(tile, team, rotation){
        return true;
    },
    canReplace(other) {
        if(other instanceof CoreBlock) return false;
        return this.super$canReplace(other);
    },
    canBreak(tile) {
    	return true;
    },
    setStats() {
        this.super$setStats();
        if(this.canBeBuilt() && this.requirements.length > 0) {
            this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
        }
    }
});

const scarletGem = extend(CoreBlock, "scarlet-gem", {
	health: 3400,
	size: 4,
	itemCapacity: 2000,
	unitCapModifier: 2,
	thrusterLength: 34/4,
	researchCostMultiplier: 0.05,
	targetable: false,
	buildCostMultiplier: 3,
	canPlaceOn(tile, team, rotation) {
        return true;
    },
    canBreak(tile) {
    	return true;
    },
    canReplace(other) {
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

const victory = extend(CoreBlock, "core-victory", {});
const triumph = extend(CoreBlock, "core-triumph", {
    envDisabled: Env.scorching
});

module.exports = {
	laserBolt: laserBolt,
	laserBoltChance: laserBoltChance,
	laserBoltsAmount: laserBoltsAmount
}