const statuses = require("statuses/statuses")

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

const god = extend(PowerTurret, "god-eater", {
	shootType: laser,
	})

const warhead = extend(ItemTurret, "warhead", {})
const needle = extend(ItemTurret, "needle", {})
module.exports = {
warhead: warhead,
impaler: impaler,
needle: needle
}