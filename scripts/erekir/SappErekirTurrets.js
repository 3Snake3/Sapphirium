const items = require("SappItems");
const statuses = require("SappStatuses");
const statusStat = require("serpulo/SappPayloadBlocks");
var additionally = new Stat("additionally", StatCat.function);

//topaz branch
var thrustBullet = extend(BasicBulletType, { 
    width: 0.001, 
    height: 0.001, 
    speed: 0, 
    lifetime: 0, 
    damage: 0,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
}); 

var thrustBullet2 = extend(BasicBulletType, { 
    width: 12, 
    height: 17, 
    speed: 5, 
    lifetime: 44, 
    damage: 33, 
    pierce : true, 
    pierceCap : 2, 
    pierceArmor: true, 
    hitEffect: Fx.hitBulletColor,
    despawnEffect: Fx.hitBulletColor,
    shootEffect: Fx.shootBigColor,
    backColor: Color.white, 
    frontColor: Color.valueOf("ffe18f"),
    trailColor: Color.valueOf("ffe18f"),
    hitColor: Color.valueOf("ffe18f"),
    trailWidth: 1.8,
    trailLength: 10
});

var thrustSparks = extend(ParticleEffect, {
    particles: 25,
    line: true,
    cone: 30,
    length: 56,
    lenFrom: 10,
    lenTo: 0,
    strokeFrom: 2,
    lifetime: 15,
    strokeTo: 0,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
});

var selfdam = extend(LightningBulletType, { 
    lightningColor: Color.valueOf("ffe18f"), 
    lightningLength: 6, 
    damage: 35, 
    collidesAir: true, 
    collidesGround: true, 
});

//1
const thrust = extend(ItemTurret, "thrust", {
    size: 3,
    shootSound: Sounds.pew,
    squareSprite: false,
    setStats(){
    	this.super$setStats();
        this.stats.remove(Stat.ammo);
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(items.topaz, thrustBullet2)));
        }
});
thrust.ammo(items.topaz, thrustBullet);
thrust.buildType = () => extend(ItemTurret.ItemTurretBuild, thrust, { 
    creload : 0,
    abscrl : 0,
    updateTile() { 
        this.super$updateTile();

        let cldred = (Mathf.round(this.abscrl * 0.02) > 200) ? 200 : Mathf.round(this.abscrl * 0.02);
        let cooldownShoot = 60 + cldred;

        if(!(this.hasAmmo() && this.isShooting() && this.isActive())) {
            if (this.creload > 0) this.creload--;
            if (this.abscrl > 0) this.abscrl -= 3;
            return;
        }

        this.creload++;
        if (this.creload == cooldownShoot) {
            Sounds.pulseBlast.at(this);
            multiPart.at(this.x, this.y);
            var thrustBullet2Obj = thrustBullet2.create(this, this.team, this.x, this.y, this.rotation);
            thrustBullet2Obj.damage = thrustBullet2Obj.damage + this.abscrl * 0.02 + this.creload * 0.5;
        }
        if (this.creload == cooldownShoot + 10) {
            let selfdam_obj = selfdam.create(this, Team.derelict, this.x, this.y, this.rotation);
            selfdam_obj.damage = 15 + (this.creload + this.abscrl) * 0.035;
            this.abscrl += this.creload;
            this.creload = 0;
        }
    },
    
});

var doubleSparks = extend(ParticleEffect, {
    particles: 8,
    line: true,
    length: 25,
    lifetime: 25,
    lenFrom: 8,
    lenTo: 0,
    strokeFrom: 2,
    cone: 90,
    strokeTo: 0,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
});

var mirrorSparks = extend(RadialEffect, {
    rotationSpacing: 180,
    amount: 2,
    effect: doubleSparks,
});

var greedBlade = extend(BasicBulletType, {
    width: 8,
    height: 60,
    damage: 125,
    pierceCap: 3,
    pierce: true,
    speed: 8,
    lifetime: 26.25,
    sprite: "sapphirium-diamond-shard",
    hitColor: Color.valueOf("ffe18f"),
    backColor: Color.valueOf("ffe18f"),
    frontColor: Color.white,
    hitEffect: mirrorSparks,
    despawnEffect: mirrorSparks,
    trailEffect: mirrorSparks,
    smokeEffect: Fx.shootBigSmoke,
    ammoMultiplier: 3,
    shootEffect: Fx.none,
});

var wavePart = extend(WaveEffect, {
    sides: 0,
    strokeFrom: 6,
    strokeTo: 0,
    sizeFrom: 0,
    sizeTo: 46,
    lifetime: 20,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
});

var sparksPart = extend(ParticleEffect, {
    particles: 20,
    length: 56,
    line: true,
    strokeFrom: 4,
    strokeTo: 0,
    lenFrom: 16,
    lenTo: 0,
    lifetime: 30,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
    cone: 360,
});

var multiPart = extend(MultiEffect, {
    effects: [wavePart, sparksPart]
});

//2
const greed = extend(ItemTurret, "greed", {
    squareSprite: false,
    setStats() {
        this.super$setStats();
        this.stats.remove(Stat.ammo);
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(items.topaz, greedBlade)));
    }
});
greed.ammo(items.topaz, thrustBullet);
greed.buildType = () => extend(ItemTurret.ItemTurretBuild, greed, {
    creload: 0,
    abscrl : 0,
    updateTile() {
        this.super$updateTile();
        let cldred = (Mathf.round(this.abscrl * 0.005) > 40) ? 40 : Mathf.round(this.abscrl * 0.005)
        if (this.hasAmmo() && this.isShooting() && this.isActive()) {
            this.creload++;
            if (this.abscrl < 2000) {
                if (this.creload == 65) {
                    Sounds.pulseBlast.at(this);
                    multiPart.at(this.x, this.y);
                    var greedBladeObj = greedBlade.create(this, this.team, this.x, this.y, this.rotation);
                    greedBladeObj.damage += this.abscrl * 0.018;
                }
                if (this.creload > 70) {
                    var selfdamObj = selfdam.create(this, Team.derelict, this.x, this.y, this.rotation);
                    selfdamObj.damage = 35 + (this.creload + this.abscrl) * 0.02;
                    this.abscrl += this.creload;
                    this.creload = 0;
                }
            }
            else if (this.abscrl < 4000) {
                if (this.creload == (80 - cldred) || this.creload == (90 - cldred)) {
                    Sounds.pulseBlast.at(this);
                    multiPart.at(this.x, this.y);
                    var greedBladeObj = greedBlade.create(this, this.team, this.x, this.y, this.rotation);
                    greedBladeObj.damage += 15 + this.abscrl * 0.02;
                }
                if (this.creload > (110 - cldred)) {
                    var selfdamObj = selfdam.create(this, Team.derelict, this.x, this.y, this.rotation);
                    selfdamObj.damage = 45 + this.creload * 0.01 + this.abscrl * 0.033;
                    this.abscrl += this.creload;
                    this.creload = 0;
                }
            }
            else {
                switch(this.creload) {
                    case 45 - cldred:
                        Sounds.pulseBlast.at(this);
                        multiPart.at(this.x, this.y);
                        greedBladeObj.damage += 15 + this.abscrl * 0.025;
                        break;
                    case 50 - cldred:
                        Sounds.pulseBlast.at(this);
                        multiPart.at(this.x, this.y);
                        greedBladeObj.damage += 15 + this.abscrl * 0.025;
                        break;
                    case 55 - cldred:
                        Sounds.pulseBlast.at(this);
                        multiPart.at(this.x, this.y);
                        greedBladeObj.damage += 15 + this.abscrl * 0.025;
                        break;
                }

                if (this.creload > (70 - cldred)) {
                    var selfdamObj = selfdam.create(this, Team.derelict, this.x, this.y, this.rotation);
                    selfdamObj.damage = 55 + this.creload * 0.04 + this.abscrl * 0.053;
                    this.abscrl += this.creload;
                    this.creload = 0;
                }
            }
        }
        else {
            if (this.creload > 0) this.creload--;
            if (this.abscrl > 0) this.abscrl -= 4;
        }
    }
});

var crueltyBullet = extend(BasicBulletType, {
    speed: 7,
    lifetime: 42.86,
    damage: 64,
    pierceArmor: true,
    hitColor: Color.valueOf("768a9a"),
    backColor: Color.valueOf("768a9a"),
    trailColor: Color.valueOf("768a9a"),
    frontColor: Color.white,
    pierceCap: 2,
    pierce: true,
    trailWidth: 2.4,
    trailLength: 8,
    hitEffect: Fx.hitBulletColor,
    despawnEffect: Fx.hitBulletColor,
    shootEffect: new MultiEffect(Fx.shootBigColor, Fx.colorSparkBig),
    smokeEffect: Fx.shootBigSmoke,
    lightningColor: Color.valueOf("768a9a"),
    lightningDamage: 22,
    lightningLength: 7,
});

var crueltyShootEffect = new MultiEffect(Fx.shootBigColor, Fx.colorSparkBig);

//3
const cruelty = extend(ItemTurret, "cruelty", {
    recoils: 4,
    squareSprite: false,
});
cruelty.buildType = () => extend(ItemTurret.ItemTurretBuild, cruelty, {
    creload : 0,
    abscrl : 0,
    updateTile() {
        this.super$updateTile();
        let crueltyShoot = this.isShooting() && this.hasAmmo();
        let rx = this.x + Mathf.range(7, -7);
        let ry = this.y + Mathf.range(7, -7);
        let rr = this.rotation + Mathf.range(360,0);
        let cldred = (Mathf.round(this.abscrl * 0.01) > 110) ? 110 : Mathf.round(this.abscrl * 0.01);
        let cldredo = (Mathf.round(this.abscrl * 0.01) > 165) ? 165 : Mathf.round(this.abscrl * 0.01);
        if(crueltyShoot) {
            this.creload++;
            if (this.creload == (130 - cldred)) {
                var crueltyBulletObj = crueltyBullet.create(this, this.team, rx, ry, this.rotation);
                crueltyBulletObj.damage = 54 + (this.creload + this.abscrl) * 0.038;
                Sounds.shootBig.at(this);
            }
            if (this.creload == (140 - cldred)) {
                var crueltyBulletObj2 = crueltyBullet.create(this, this.team, rx, ry, this.rotation);
                crueltyBulletObj2.damage = 54 + (this.creload + this.abscrl) * 0.038;
                Sounds.shootBig.at(this);
            }
            if (this.creload == (150 - cldred)) {
                var crueltyBulletObj3 = crueltyBullet.create(this, this.team, rx, ry, this.rotation);
                crueltyBulletObj3.damage = 54 + (this.creload + this.abscrl) * 0.038;
                Sounds.shootBig.at(this);
            }
            if (this.creload == (160 - cldred)) {
                var crueltyBulletObj4 = crueltyBullet.create(this, this.team, rx, ry, this.rotation);
                crueltyBulletObj4.damage = 54 + (this.creload + this.abscrl) * 0.038;
                Sounds.shootBig.at(this);
            }
            
            if (this.creload % (118 - cldred) == 0) { 
                let selfdam_obj = selfdam.create(this, Team.derelict, rx,ry,rr);
                selfdam_obj.damage = 45 + (this.creload + this.abscrl) * 0.02;
            } 
            if (this.creload >= (205 - cldredo)) {
            this.abscrl += this.creload;
            this.creload = 0;
            }
        }
        else {
            if (this.creload > 0) this.creload -= 2;
            if (this.abscrl > 0) this.abscrl -= 3;
        }
    }
});

//Sapphire branch
/* how many times is the charge updated per second of firing */
const scaleUpdateRate = 10;
const scaleUpdateRate2 = 1;
/* percentage of scale increase per update ( from 0 to 100 ) */
const shootingBuff = 1;
/* period of heal outburst in seconds */
const healPeriod = 2;
/* how many percent will the buff decrease for one heal outburst ( from 0 to 100 ) */
const healDebuff = 50;
const buffBarColor = Pal.heal;

/* the radius of the spread of the heal ( in tiles ) */
const healRadius = 136;
const healRadius2 = 200;
const healColor = Color.valueOf("80a8ff");
const healEffect = Fx.healWave;

/* limiting the range of values ( from 0 to 100 ) */
const minHealPercent = 4;
const maxHealPercent = 28;
const minHealPercent2 = 3;
const maxHealPercent2 = 18;

const timer1 = 1;

const blueHealWave = extend(WaveEffect, {
	sides: 0,
	sizeFrom: 0,
	sizeTo: 200,
	lifetime: 120,
	strokeFrom: 6,
	strokeTo: 0,
	sizeInterp: Interp.circleOut,
	interp: Interp.circleOut,
	colorFrom: Color.valueOf("80a8ff"),
	colorTo: Color.valueOf("80a8ff")
});

function getHealPercent(healBuff) {
	return Mathf.clamp(healBuff * maxHealPercent, minHealPercent, maxHealPercent) / 100;
};

function getHealPercent2(healBuff) {
	return Mathf.clamp(healBuff * maxHealPercent2, minHealPercent2, maxHealPercent2) / 100;
};

var minHeal = new Stat("min-heal", StatCat.function);
var maxHeal = new Stat("max-heal", StatCat.function); 

var aoePlaceholder = extend(BulletType, {
	damage: 0,
	status: statuses.shockStun,
	statusDuration: 10,
});
	
const crackle = extend(ItemTurret, "crackle", {
	squareSprite: false,
	setStats() {
		this.super$setStats();
		this.stats.add(Stat.repairSpeed, 14, StatUnit.seconds);
		this.stats.add(minHeal, 3, StatUnit.percent);
		this.stats.add(maxHeal, 18, StatUnit.percent);
		this.stats.add(additionally, StatValues.ammo(ObjectMap.of(items.carvedAlloy, aoePlaceholder)));
	},
});
crackle.buildType = () => extend(ItemTurret.ItemTurretBuild, crackle, {
	/* ticks from last heal outburst or from the last heal update */
	updateTimer: 0,
	/* current percent of heal charge ( from 0 to 1 ) */
	healBuff: 0,
	
	updateTile() {
		this.super$updateTile();
		
		/* if the turret is inactive nothing happens */
		if(!this.hasAmmo) {
			this.updateTimer = 0;
			return;
		}
		
		this.updateTimer += 1;
		
		if(this.target != null || this.isShooting()) {
			/* turret is shooting or targeting now */
			
			if(this.updateTimer > ((7 * 60) / scaleUpdateRate2)) {
				this.updateTimer = 0;
				this.healBuff = Mathf.clamp(this.healBuff + (shootingBuff / 100));
			}
		} else {
			/* turret isn't shooting or targeting now */
			
			if(this.updateTimer > ((7 * 60) * healPeriod)) {
				this.updateTimer = 0;
				
				let healPercent = getHealPercent2(this.healBuff);
				
				Vars.indexer.eachBlock(this, healRadius2, block => ( block.damaged() && !block.isHealSuppressed() ), block => {
					block.heal(block.maxHealth * healPercent);
                    block.recentlyHealed();
                    Fx.healBlockFull.at(block.x, block.y, block.block.size, healColor, block.block);
                    blueHealWave.at(this.x, this.y, this.rotation);
                });
				
				Units.nearby(this.team, this.x, this.y, healRadius2, unit => {
                    if (unit.damaged()) {
                        unit.heal(unit.maxHealth * healPercent);
                        blueHealWave.at(this.x, this.y, this.rotation);
					}
                });
				
				//healEffect.at(this.x, this.y, healRadius, healColor);
				
				this.healBuff = Mathf.clamp(this.healBuff - (healDebuff / 100));
			}
		}
	},
	handleItem(source, item){
		this.super$handleItem(source, item);
		this.updateTimer += Time.delta;
		if(this.updateTimer >= 100){
		if(item == items.carvedAlloy){
                Units.nearbyEnemies(this.team, this.x, this.y, crackle.range, other => {
                other.apply(statuses.shockStun, 10);
                Fx.shockwave.at(this.x, this.y, this.rotation);
                });
             }
             this.updateTimer = 0;
            }
            else this.updateTimer++;
            }
});

const shelter = extend(ContinuousLiquidTurret, "shelter", {
	squareSprite: false,
	
	setStats() {
		this.super$setStats();
		this.stats.add(Stat.repairSpeed, 2, StatUnit.seconds);
		this.stats.add(minHeal, 4, StatUnit.percent);
		this.stats.add(maxHeal, 28, StatUnit.percent);
	},
});

shelter.buildType = () => extend(ContinuousLiquidTurret.ContinuousLiquidTurretBuild, shelter, {
	/* ticks from last heal outburst or from the last heal update */
	updateTimer: 0,
	/* current percent of heal charge ( from 0 to 1 ) */
	healBuff: 1,
	
	updateTile() {
		this.super$updateTile();
		
		/* if the turret is inactive nothing happens */
		if(!this.hasAmmo() || this.power.status <= 0) {
			this.updateTimer = 0;
			return;
		}
		
		this.updateTimer += 1;
		
		if(this.target != null || this.isShooting()) {
			/* turret is shooting or targeting now */
			
			if(this.updateTimer > (60 / scaleUpdateRate)) {
				this.updateTimer = 0;
				this.healBuff = Mathf.clamp(this.healBuff + (shootingBuff / 100));
			}
		} else {
			/* turret isn't shooting or targeting now */
			
			if(this.updateTimer > (60 * healPeriod)) {
				this.updateTimer = 0;
				
				let healPercent = getHealPercent(this.healBuff);
				
				Vars.indexer.eachBlock(this, healRadius, block => ( block.damaged() && !block.isHealSuppressed() ), block => {
					block.heal(block.maxHealth * healPercent);
                    block.recentlyHealed();
                    Fx.healBlockFull.at(block.x, block.y, block.block.size, healColor, block.block);
                });
				
				Units.nearby(this.team, this.x, this.y, healRadius, unit => {
                    if(unit.damaged()) {
                        unit.heal(unit.maxHealth * healPercent);
					}
			});
                
				//healEffect.at(this.x, this.y, healRadius, healColor);
				
				this.healBuff = Mathf.clamp(this.healBuff - (healDebuff / 100));
			}
		}
	}
});

//amethyst branch
const devotion = extend(ItemTurret, "devotion", {
    squareSprite: false,
});

const addictionShell = extend(BasicBulletType, {
	status: StatusEffects.slow,
	statusDuration: 40,
	ammoMultiplier: 1,
	damage: 65,
});

const addictionUnmovingLaser = extend(LaserBulletType, {
    length: 190,
    damage: 95,
    status: StatusEffects.unmoving,
    statusDuration: 40,
    width: 17,
    colors: [Color.valueOf("cca6ff"), Color.valueOf("cca6ff"), Color.white]
}); 

const addiction = extend(ItemTurret, "addiction", {
    setStats() {
        this.super$setStats();
        this.stats.add(additionally, StatValues.ammo(ObjectMap.of(this, addictionUnmovingLaser)));
    },
    squareSprite: false,
});
addiction.buildType = () => extend(ItemTurret.ItemTurretBuild, addiction, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let addictionShoot = this.isShooting() && this.hasAmmo() && this.efficiency > 0;
        if(addictionShoot) {
            this.creload++;
            if(this.creload == 110) {
                addictionUnmovingLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            if(this.creload >= 120) {
                this.creload = 0;
            }
        }
    }
});

const inevitability = extend(ItemTurret, "inevitability", {
    squareSprite: false,
});

//Creostone branch
var grayRing = extend(ParticleEffect, {
    particles: 1,
    length: 0,
    sizeFrom: 15,
    sizeTo: 0,
    lifetime: 180,
    colorFrom: Pal.lightishGray,
    colorTo: Pal.lightishGray,
});

var sorrowUnmovingLaser = extend(LaserBulletType, {
    length: 104,
    damage: 44,
    status: StatusEffects.unmoving,
    statusDuration: 180,
    width: 15,
    sideLength: 0,
    sideWidth: 0,
    colors: [Pal.darkerGray, Pal.darkishGray, Pal.lightishGray],
    hitColor: Pal.lightishGray,
    hitEffect: grayRing,
    collidesTiles: false,
});

var sorrowMeltingLaser = extend(LaserBulletType, {
    length: 56,
    damage: 120,
    status: StatusEffects.melting,
    statusDuration: 120,
    width: 15,
    sideLength: 0,
    sideWidth: 0,
    colors: [Color.valueOf("f25555"), Color.valueOf("fc8e6d"), Color.white],
    hitColor: Color.valueOf("fc8e6d"),
});

var sorrowFlammableLaser = extend(LaserBulletType, {
    length: 152,
    damage: 140,
    status: statuses.flammability,
    statusDuration: 420,
    width: 15,
    sideLength: 0,
    sideWidth: 0,
    colors: [Color.valueOf("d47f6a"), Color.valueOf("ffd17d"), Color.white],
    hitColor: Color.valueOf("ffd17d"),
});

var sorrowBurningLaser = extend(LaserBulletType, {
    length: 136,
    damage: 290,
    status: StatusEffects.burning,
    statusDuration: 120,
    width: 15,
    sideLength: 0,
    sideWidth: 0,
    colors: [Pal.lightOrange, Pal.lightishOrange, Color.white],
    hitColor: Pal.lightishOrange,
});

const sorrow = extend(PowerTurret, "sorrow", {
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, sorrowUnmovingLaser)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, sorrowMeltingLaser)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, sorrowFlammableLaser)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, sorrowBurningLaser)));
    },
    squareSprite: false,
});
sorrow.buildType = () => extend(PowerTurret.PowerTurretBuild, sorrow, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let sorrowShoot = this.isShooting() && this.hasAmmo() && this.power.status > 0;

        if(sorrowShoot) {
        	this.creload++;
            if(this.creload % 72 == 0 && this.creload != 102 && this.creload != 150 && this.creload != 180) {
                sorrowBurningLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            if(this.creload == 102) {
                sorrowFlammableLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            if(this.creload == 150) {
                sorrowMeltingLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            if(this.creload == 180) {
                sorrowUnmovingLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            else if (this.creload >= 180) this.creload = 0;
        }
    }
});

//for stats only
const dublicityInterval = extend(BasicBulletType, {
	damage: 45,
    splashDamage: 22,
    splashDamageRadius: 10,
    buildingDamageMultiplier: 1.3,
    homingPower: 0.5,
    homingRange: 22,
    pierceArmor: true,
});
const dublicitySpawnBullets = extend(BasicBulletType, {
	damage: 350,
    splashDamage: 190,
    splashDamageRadius: 40,
    buildingDamageMultiplier: 2,
    intervalBullets: 2,
    bulletInterval: 16,
    intervalRandomSpread: 360,
    intervalBullet: dublicityInterval,
});

const dublicity = extend(ItemTurret, "dublicity", {
	setStats() {
        this.super$setStats();
        this.stats.add(additionally, StatValues.ammo(ObjectMap.of(items.creostone, dublicitySpawnBullets)));
    },
    squareSprite: false,
});

const radiance = extend(PowerTurret, "radiance", {
	squareSprite: false,
});

//Carved Alloy branch 
var carvedLightning = extend(LightningBulletType, {
	damage: 45,
	lightningLength: 6,
	lightningLengthRand: 8,
	lightningColor: Color.sky,
	collidesAir: true,
	lightningType: extend(BulletType, {
		damage: 0,
		speed: 0,
		lifetime: 10,
		hitColor: Color.sky,
		backColor: Color.sky,
		frontColor: Color.white,
		hitEffect: extend(WaveEffect, {
			sides: 4,
			sizeTo: 6,
			strokeFrom: 3,
			strokeTo: 0.3,
			colorFrom: Color.sky,
			colorTo: Color.sky,
		}),
		status: statuses.shockStun,
		statusDuration: 10,
	})
});

var carvedLightningChance = 0.05;

const multimortar = extend(ItemTurret, "multimortar", {
    squareSprite: false,
});
const elimination = extend(ItemTurret, "elimination", {
    squareSprite: false,
    armor: 20,
    setStats(){
    	this.super$setStats();
    	this.stats.add(Stat.lightningChance, carvedLightningChance * 100, StatUnit.percent);
        this.stats.add(Stat.lightningDamage, 45);
        }
});
elimination.buildType = () => extend(ItemTurret.ItemTurretBuild, elimination, {
	collision(bullet){
		this.super$collision(bullet);
		if(Mathf.chance(carvedLightningChance)){
			carvedLightning.create(this, this.team, this.x, this.y, bullet.rotation() + 180);
			Sounds.spark.at(this.tile, Mathf.random(0.9, 1.1));
			}
			return true;
		}
	});
const erazor = extend(ItemTurret, "erazor", {
    squareSprite: false,
    armor: 20,
    setStats(){
    	this.super$setStats();
    	this.stats.add(Stat.lightningChance, carvedLightningChance * 100, StatUnit.percent);
        this.stats.add(Stat.lightningDamage, 45);
        }
});
erazor.buildType = () => extend(ItemTurret.ItemTurretBuild, erazor, {
	collision(bullet){
		this.super$collision(bullet);
		if(Mathf.chance(carvedLightningChance)){
			carvedLightning.create(this, this.team, this.x, this.y, bullet.rotation() + 180);
			Sounds.spark.at(this.tile, Mathf.random(0.9, 1.1));
			}
			return true;
		}
	});
const dawn = extend(ItemTurret, "dawn", {
    squareSprite: false,
    armor: 25,
    setStats(){
    	this.super$setStats();
    	this.stats.add(Stat.lightningChance, 0.07 * 100, StatUnit.percent);
        this.stats.add(Stat.lightningDamage, 45);
        }
});
dawn.buildType = () => extend(ItemTurret.ItemTurretBuild, dawn, {
	collision(bullet){
		this.super$collision(bullet);
		if(Mathf.chance(0.07)){
			carvedLightning.create(this, this.team, this.x, this.y, bullet.rotation() + 180);
			Sounds.spark.at(this.tile, Mathf.random(0.9, 1.1));
			}
			return true;
		}
	});

//Vanilla ammo
var colorLerp = Color.valueOf("ea8878").lerp(Pal.redLight, 0.5);
const titanThoriumAmmo = extend(ArtilleryBulletType, 2.5, 350, "shell", {
	hitEffect: new MultiEffect(Fx.titanExplosion, Fx.titanSmoke),
	despawnEffect: Fx.none,
	knockback: 2,
	lifetime: 140,
	height: 19,
	width: 17,
	splashDamage: 350,
	splashDamageRadius: 65,
	scaledSplashDamage: true,
	backColor: colorLerp,
	hitColor: colorLerp,
    trailColor: colorLerp,
    frontColor: Color.white,
    ammoMultiplier: 1,
    hitSound: Sounds.titanExplosion,
    status: StatusEffects.blasted,
    trailLength: 32,
    trailWidth: 3.35,
    trailSinScl: 2.5,
    trailSinMag: 0.5,
    trailEffect: Fx.none,
    despawnShake: 7,
    shootEffect: Fx.shootTitan,
    smokeEffect: Fx.shootSmokeTitan,
    shrinkX: 0.2,
    shrinkY: 0.1,
    buildingDamageMultiplier: 0.2,
});
titanThoriumAmmo.trailInterp = v => Math.max(Mathf.slope(v), 0.8);

const titanOxideAmmo = extend(ArtilleryBulletType, 2.5, 300, "shell", {
	hitEffect: new MultiEffect(Fx.titanExplosion, Fx.titanSmoke),
	despawnEffect: Fx.none,
	knockback: 2,
	lifetime: 190,
	height: 19,
	width: 17,
	reloadMultiplier: 0.8,
	splashDamage: 300,
	splashDamageRadius: 110,
	rangeChange: 8,
	scaledSplashDamage: true,
	backColor: Color.valueOf("a0b380"),
	hitColor: Color.valueOf("a0b380"),
    trailColor: Color.valueOf("a0b380"),
    frontColor: Color.white,
    ammoMultiplier: 1,
    hitSound: Sounds.titanExplosion,
    status: StatusEffects.blasted,
    trailLength: 32,
    trailWidth: 3.35,
    trailSinScl: 2.5,
    trailSinMag: 0.5,
    trailInterval: 3,
    trailEffect: Fx.vapor,
    despawnShake: 7,
    shootEffect: Fx.shootTitan,
    smokeEffect: Fx.shootSmokeTitan,
    shrinkX: 0.2,
    shrinkY: 0.1,
    buildingDamageMultiplier: 0.2,
});
titanOxideAmmo.trailInterp = v => Math.max(Mathf.slope(v), 0.8);

const titanCarbideAmmo = extend(ArtilleryBulletType, 2.5, 500, "shell", {
	hitEffect: new MultiEffect(Fx.titanExplosion, Fx.titanSmoke),
	despawnEffect: Fx.none,
	knockback: 3,
	lifetime: 140,
	height: 19,
	width: 17,
	splashDamage: 650,
	splashDamageRadius: 55,
	rangeChange: 10 * Vars.tilesize,
	scaledSplashDamage: true,
	backColor: Color.valueOf("a0b380"),
	hitColor: Color.valueOf("a0b380"),
    trailColor: Color.valueOf("a0b380"),
    frontColor: Color.white,
    ammoMultiplier: 1,
    hitSound: Sounds.titanExplosion,
    status: StatusEffects.blasted,
    trailLength: 32,
    trailWidth: 3.35,
    trailSinScl: 2.5,
    trailSinMag: 0.5,
    trailInterval: 3,
    trailEffect: Fx.none,
    despawnShake: 7,
    shootEffect: Fx.shootTitan,
    smokeEffect: Fx.shootSmokeTitan,
    shrinkX: 0.2,
    shrinkY: 0.1,
    buildingDamageMultiplier: 0.2,
});
titanCarbideAmmo.trailInterp = v => Math.max(Mathf.slope(v), 0.8);

const titanCreostoneAmmo = extend(ArtilleryBulletType, 2.5, 650, "shell", {
	hitEffect: new MultiEffect(Fx.titanExplosion, Fx.titanSmoke),
	despawnEffect: Fx.none,
	knockback: 3,
	lifetime: 140,
	height: 19,
	width: 17,
	reloadMultiplier: 0.3,
	splashDamage: 800,
	splashDamageRadius: 55,
	rangeChange: 14 * Vars.tilesize,
	scaledSplashDamage: true,
	backColor: Color.valueOf("ffb380"),
	hitColor: Color.valueOf("ffb380"),
    trailColor: Color.valueOf("ffb380"),
    frontColor: Color.white,
    ammoMultiplier: 1,
    hitSound: Sounds.titanExplosion,
    status: StatusEffects.blasted,
    trailLength: 32,
    trailWidth: 3.35,
    trailSinScl: 2.5,
    trailSinMag: 0.5,
    trailInterval: 3,
    trailEffect: extend(ParticleEffect, {
         particles: 10,
         length: -28,
         cone: 15,
         sizeFrom: 6,
         sizeTo: 0,
         colorFrom: Color.valueOf("ffb380"),
         colorTo: Color.valueOf("ffb380"),
         interp: Interp.pow2Out,
         lifetime: 80,
         rotWithParent: true,
    }),
    despawnShake: 7,
    shootEffect: Fx.shootTitan,
    smokeEffect: Fx.shootSmokeTitan,
    shrinkX: 0.2,
    shrinkY: 0.1,
    buildingDamageMultiplier: 0.2,
    intervalRandomSpread: 180,
    intervalBullets: 1,
    bulletInterval: 8,
    intervalBullet: extend(BasicBulletType, 3, 60, {
    	width: 10,
        height: 10,
        lifetime: 60,
        hitColor: Color.valueOf("ffb380"),
        backColor: Color.valueOf("ffb380"),
        trailColor: Color.valueOf("ffb380"),
        frontColor: Color.white,
        hitEffect: Fx.hitBulletColor,
        despawnEffect: Fx.hitBulletColor,
        trailEffect: Fx.none,
        trailWidth: 1,
        trailLength: 10,
        homingPower: 0.045,
        status: StatusEffects.melting,
        statusDuration: 10
    }),
    fragBullets: 5,
    fragLifeMin: 0.3,
    fragBullet: extend(ArtilleryBulletType, 2.5, 70, {
    	splashDamage: 70,
        splashDamageRadius: 26,
        lifetime: 30,
        despawnShake: 7,
        knockback: 3,
        height: 17,
	width: 15,
	scaledSplashDamage: true,
	backColor: Color.valueOf("ffb380"),
	hitColor: Color.valueOf("ffb380"),
    trailColor: Color.valueOf("ffb380"),
    frontColor: Color.white,
    hitSound: Sounds.titanExplosion,
    status: StatusEffects.blasted,
    trailLength: 16,
    trailWidth: 3.33,
    trailSinScl: 2.3,
    trailSinMag: 0.3,
    trailInterval: 3,
    trailEffect: Fx.none,
    shrinkX: 0.2,
    shrinkY: 0.1,
    buildingDamageMultiplier: 0.2,
    hitEffect: new MultiEffect(Fx.titanExplosion, Fx.titanSmoke),
    })
});
titanCreostoneAmmo.trailInterp = v => Math.max(Mathf.slope(v), 0.8);

Blocks.titan.ammo(
Items.thorium, titanThoriumAmmo, 
Items.oxide, titanOxideAmmo, 
Items.carbide, titanCarbideAmmo, 
items.creostone, titanCreostoneAmmo
);

module.exports = {
	additionally: additionally
}
    