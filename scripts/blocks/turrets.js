const statuses = require("statuses/statuses");

const spear = extend(BasicBulletType, 8, 35, "adc-spear-bullet", {
  
    width: 15,
    height: 40,
    frontColor: Color.white,
    backColor: Color.valueOf("0096FF"),

    lifetime: 36.3,
    pierce: true,
    hittable: false,
    absorbable: false,
    reflectable: false,
    keepVelocity: false,
    hitSize: 4,
    pierceBuilding: true,
  
    lightning: 4,
    lightningLength: 10,
    lightningCone: 60,
    lightningDamage: 10,
    lightningColor: Color.valueOf("0096FF"),
  
    hitSound: Sounds.spark,
    status: statuses.weakened,
    statusDuration: 75,
    buildingDamageMultiplier: 0.7
})

const frag = extend(LightningBulletType, {
lightningColor: Color.valueOf("98ffa9"),
lightningLength: 25,
healPercent: 30,
damage: 100,
collidesAir: true,
collidesGround: true,
collidesTeam: true,
})

const laser = extend(LaserBulletType, {
colors: [Color.valueOf("98ffa9"), Color.valueOf("98FFA9"), Color.valueOf("FFFFFF")],
length: 570,
damage: 2000,
width: 60,
lifetime: 60,
lightningSpacing: 40,
lightningLength: 40,
lightningDelay: 1.1,
lightningLengthRand: 70,
lightningDamage: 200,
lightningAngleRand: 40,
largeHit: true,
lightColor: Color.valueOf("98ffa9"),
lightningColor: Color.valueOf("98ffa9"),
collidesGround: true,
collidesAir: true,
collidesTiles: true,
collidesTeam: true,
sideAngle: 15,
sideWidth: 0,
sideLength: 0,
healPercent: 50,
hitSound: Sounds.spark,
fragBullets: 5,
fragCone: 100,
fragBullet: frag,
status: statuses.stun,
statusDuration: 120,
})

const impaler = extend(PowerTurret, "impaler", {})
impaler.shootType = spear;

const executioner = extend(PowerTurret, "executioner", {
	shootType: laser,
	})

const liquids = require("liquids");

const ledoShot = extend(LiquidBulletType, liquids.ledonite, {
	knockback: 0.75,
	drag: 0.01,
	statusDuration: 40
});

const heavyLedoShot = extend(LiquidBulletType, liquids.ledonite, {
	knockback: 0.75,
	lifetime: 49,
	speed: 4,
	puddleSize: 8,
    orbSize: 4,
    drag: 0.001,
    ammoMultiplier: 0.4,
    statusDuration: 45,
    damage: 0.2
});

const srgMassShot = extend(LiquidBulletType, liquids.surgeMass, {
	knockback: 0.75,
	drag: 0.01
});

const heavySrgMassShot = extend(LiquidBulletType, liquids.surgeMass, {
	knockback: 0.75,
	lifetime: 49,
	speed: 4,
	puddleSize: 8,
    orbSize: 4,
    drag: 0.001,
    ammoMultiplier: 0.4,
    statusDuration: 240,
    damage: 0.2
});

Blocks.wave.ammo(
                Liquids.water, Bullets.waterShot,
                Liquids.slag, Bullets.slagShot,
                Liquids.cryofluid, Bullets.cryoShot,
                Liquids.oil, Bullets.oilShot,
                liquids.ledonite, ledoShot,
                liquids.surgeMass, srgMassShot
                );
                
Blocks.tsunami.ammo(
                Liquids.water, Bullets.heavyWaterShot,
                Liquids.slag, Bullets.heavySlagShot,
                Liquids.cryofluid, Bullets.heavyCryoShot,
                Liquids.oil, Bullets.heavyOilShot,
                liquids.ledonite, heavyLedoShot,
                liquids.surgeMass, heavySrgMassShot
                );
                
const contLaser = extend(ContinuousLaserBulletType, {
damage: 1,
length: 95,
shake: 0,
width: 4,
colors: [Color.valueOf("de9559"), Color.valueOf("f7c265"), Color.valueOf("ffe18f"), Color.white],
});
                
const infiniteLSA = extend(LaserTurret, "infinite-laser-array", {
health: 2000,
shootDuration: 99999,
rotateSpeed: 5,
recoilAmount: 3,
reloadTime: 0,
shootShake: 0,
range: 90,
shootEffect: Fx.none,
shootSound: Sounds.laserbig,
loopSound: Sounds.beam,
loopSoundVolume: 0.8,
shootType: contLaser,
powerUse: 3,
});
infiniteLSA.consumes.add(new ConsumeCoolant(0.3)).update = false;

const warhead = extend(ItemTurret, "warhead", {})
const needle = extend(ItemTurret, "needle", {})
const north = extend(PowerTurret, "north", {})
module.exports = {
warhead: warhead,
impaler: impaler,
needle: needle,
executioner: executioner,
north: north
}