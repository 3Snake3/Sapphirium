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

const impaler = extend(PowerTurret, "impaler", {})
impaler.shootType = spear;

const warhead = extend(ItemTurret, "warhead", {})
const needle = extend(ItemTurret, "needle", {})
module.exports = {
warhead: warhead,
impaler: impaler,
needle: needle
}