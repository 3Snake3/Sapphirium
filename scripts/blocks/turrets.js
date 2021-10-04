const statuses = require("statuses/statuses")
const multiTLib = require("multiTurretType")

/**const arcBullet = extend(LightningBulletType, {
  damage: 7,
  lightningLength: 
});

const unoMount = multiTLib.newWeapon(unoBullet, "prog-mats-unoM");
unoMount.reloadTime = 15;
unoMount.ammoPerShot = 5;
unoMount.x = 2.75;
unoMount.y = 2.75;
unoMount.shootY = 13/4;
unoMount.recoilAmount = 1;
unoMount.range = 9 * 8;
unoMount.title = "Uno"

const hailBullet = extend(ArtilleryBulletType, {
  speed: 1.5,
  damage: 5,
  hitEffect: Fx.none,
  knockback: 0.5,
  lifetime: 105,
  width: 5.5,
  height: 5.5,
  splashDamageRadius: 14,
  splashDamage: 18
});

const hailMount = multiTLib.newWeapon(hailBullet, "prog-mats-hailM");
hailMount.targetAir = false;
hailMount.reloadTime = 60;
hailMount.ammoPerShot = 20;
hailMount.x = -3.75;
hailMount.y = -4;
hailMount.shootY = 18/4;
hailMount.recoilAmount = 2.5;
hailMount.range = 18 * 8;
hailMount.title = "Mini Hail"
hailMount.shootSound = Sounds.bang;

const miniSlag = extend(LiquidBulletType, {
  collidesAir: false,
  liquid: Liquids.slag,
  damage: 1,
  drag: 0.03,
  puddleSize: 2,
  orbSize: 1
});

const waveMount = multiTLib.newWeapon(miniSlag, "prog-mats-waveM");
waveMount.targetAir = false;
waveMount.reloadTime = 3;
waveMount.x = 4.25;
waveMount.y = -3.5;
waveMount.shootY = 16/4;
waveMount.recoilAmount = 1;
waveMount.range = 13 * 8;
waveMount.title = "Mini Wave";
waveMount.loop = true;
waveMount.shootSound = Sounds.none;
waveMount.loopSound = Sounds.spray;

const weapons = [unoMount, waveMount, hailMount];

const mainBullet = extend(BasicBulletType, {
  ammoMultiplier: 45,
  speed: 2.5,
  damage: 9,
  width: 5.5,
  height: 7,
  lifetime: 60,
  shootEffect: Fx.shootSmall,
  smokeEffect: Fx.shootSmallSmoke
});

//Aggregate -> Assimilation -> Amalgamation
const jumble = multiTLib.newMultiTurret("multi-i", weapons, Items.graphite, mainBullet, 80, 20, "Aggregate");
jumble.size = 2;
jumble.range = 15 * 8;
jumble.maxAmmo = 225;
jumble.ammoPerShot = 12;
jumble.recoil = 2;
jumble.reloadTime = 21;
  requirements: [
    copper/135
    lead/75
    metaglass/40
    graphite/80
    silicon/50
  ]
// jumble.requirements(Category.turret, ItemStack.with(Items.copper, 135, Items.lead, 75, Items.metaglass, 40, Items.graphite, 80, Items.silicon, 50));
jumble.requirements = ItemStack.with(Items.copper, 135, Items.lead, 75, Items.metaglass, 40, Items.graphite, 80, Items.silicon, 50);
jumble.category = Category.turret;
jumble.buildVisibility = BuildVisibility.shown;**/

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
	statusDuration: 60
});

const heavyLedoShot = extend(LiquidBulletType, liquids.ledonite, {
	knockback: 0.75,
	lifetime: 49,
	speed: 4,
	puddleSize: 8,
    orbSize: 4,
    drag: 0.001,
    ammoMultiplier: 0.4,
    statusDuration: 60,
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
    damage: 0.2,
    lightning: 3,
    lightningLength: 2,
    lightningDamage: 5
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

const warhead = extend(ItemTurret, "warhead", {})
const needle = extend(ItemTurret, "needle", {})
module.exports = {
warhead: warhead,
impaler: impaler,
needle: needle,
executioner: executioner
}