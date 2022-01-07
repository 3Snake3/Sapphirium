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

const multishock = extend(PowerTurret, "multishocker", {});

const north = extend(PowerTurret, "north", {});

const impaler = extend(PowerTurret, "impaler", {});
impaler.shootType = spear;

const arrow = extend(PowerTurret, "arrow", {});

const glow = extend(PowerTurret, "glow", {});

const melinite = extend(PowerTurret, "melinite", {});

const toxin = extend(PowerTurret, "toxin", {});

const reagent = extend(PowerTurret, "reagent", {});

const endoxin = extend(PowerTurret, "endoxin", {});

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
                
const shock = extend(ItemTurret, "beam-IT", {});

const discharge = extend(PowerTurret, "beam-LT", {});

const pierce = extend(PowerTurret, "beam-LS", {});
                
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

const sawHit = extend(ExplosionEffect, {
waveColor: Color.valueOf("9497ff"),
smokeColor: Color.valueOf("5c5e9e"),
sparkColor: Color.valueOf("9497ff"),
waveRad: 35,
waveStroke: 4,
waveLife: 25,
sparkStroke: 3,
sparkRad: 40,
sparkLen: 20,
smokeSize: 5,
smokeRad: 25,
smokes: 5,
sparks: 5
});

const sawDesp = extend(ExplosionEffect, {
smokeColor: Color.valueOf("5c5e9e"),
sparkColor: Color.valueOf("9497ff"),
waveRad: 0,
waveStroke: 0,
waveLife: 0,
smokeSize: 5,
smokeRad: 25,
smokes: 5,
sparks: 0
});

const sawHitSnd = loadSound("sawblade-hit");

const sawBack = extend(BasicBulletType, {
    width: 24,
    height: 24,

    damage: 160,
    speed: 6,
    lifetime: 60,
    pierce: true,
    sprite: "adc-spinner",
    spin: -20,
    status: StatusEffects.sapped,
    statusDuration: 180,

    hitSound: sawHitSnd,
    hitEffect: sawHit,
    despawnEffect: sawDesp,
    frontColor: Color.valueOf("ffffff"),
    backColor: Color.valueOf("bd99ff"),
    hitSoundVolume: 0.4,

});

const saw = extend(BasicBulletType, {
    width: 24,
    height: 24,

    damage: 80,
    speed: 6,
    lifetime: 60,
    pierce: true,
    sprite: "adc-spinner",
    spin: 20,
    
    status: StatusEffects.sapped,
    statusDuration: 180,

    hitSound: sawHitSnd,
    hitEffect: sawHit,
    despawnEffect: sawDesp,
    frontColor: Color.valueOf("ffffff"),
    backColor: Color.valueOf("bd99ff"),
    hitSoundVolume: 0.4,

    despawned(b){
        sawBack.create(b, b.x, b.y, b.rotation() - 180, 1, 1);
    }
});

const sandT = extend(ItemTurret, "sand-turret", {});

const sandTh = extend(ItemTurret, "sand-thrower", {});

const dune = extend(ItemTurret, "dune", {});

const cast = extend(ItemTurret, "cast", {});

const thrower = extend(ItemTurret, "thrower", {});

const launch = extend(ItemTurret, "launch", {});

const sparrow = extend(PowerTurret, "sparrow", {});

const hawk = extend(PowerTurret, "hawk", {});

const scrStar = extend(PowerTurret, "scarlet-star", {});

const gold = extend(PowerTurret, "gold-horn", {});

const brazier = extend(PowerTurret, "brazier", {});

const hiddenTesla = extend(PowerTurret, "hidden-tesla", {});

const teslaCoil = extend(PowerTurret, "tesla-coil", {});

const cloudRip = extend(ItemTurret, "cloud-breaker", {});

const photon = extend(ItemTurret, "photon", {});

const impulse = extend(PowerTurret, "impulse-turret", {});

const torpedo = extend(PowerTurret, "torpedo", {});

const warhead = extend(ItemTurret, "warhead", {});

const shotgun = extend(ItemTurret, "shotgun", {});

const blade = extend(PowerTurret, "blade", {
shootType: saw
});

const mineDep = extend(ItemTurret, "mine-deployer", {});

const needle = extend(ItemTurret, "needle", {});

const mortar = extend(ItemTurret, "mortar", {});

const neutron = extend(PowerTurret, "neutron", {});
module.exports = {
warhead: warhead,
impaler: impaler,
needle: needle,
executioner: executioner,
north: north
}