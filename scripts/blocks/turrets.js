const statuses = require("statuses/statuses");

const spear = extend(BasicBulletType, 8, 35, "adc-spear-bullet", {
  
    width: 15,
    height: 60,
    frontColor: Color.white,
    backColor: Pal.lancerLaser,

    lifetime: 36.3,
    pierce: true,
    hittable: false,
    absorbable: false,
    reflectable: false,
    keepVelocity: false,
    hitSize: 4,
    pierceBuilding: true,
  
    status: StatusEffects.freezing,
    statusDuration: 180,
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

const frostbite = extend(ItemTurret, "frostbite", {});

const reproduction = extend(ItemTurret, "reproduction", {});

//bullet being created
const iceShard = extend(BasicBulletType, {
	speed: 7, 
    damage: 9, 
    sprite: "adc-ice-shard",
	lifetime: 18,
	width: 9,
	height: 9,
	status: StatusEffects.freezing,
	statusDuration: 80,
	backColor: Color.valueOf("c1befa"),
	frontColor: Color.white
});
const icicle = extend(PowerTurret, "icicle", {
	//additional ammo stats
setStats(){
        this.super$setStats();
this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, iceShard)));
}
});
icicle.buildType = () => extend(PowerTurret.PowerTurretBuild, icicle, {
	//reload of attack
creload : 0,
    updateTile(){
        this.super$updateTile();
        
        if(this.isShooting() && this.isActive() && this.hasAmmo() && this.power.status > 0.5 && this.creload >= 9){
            this.creload = 0
            //bullet creating
            iceShard.create(this, this.team, this.x, this.y + 2, this.rotation)
            //shoot effect
            Fx.shootSmall.at(this.x, this.y + 2)
            //shoot sound
            Sounds.shoot.at(this)
            
        }
        else{
            if(this.creload < 9){this.creload += 1} 
        }
    },
});

const multishock = extend(PowerTurret, "multishocker", {});

const north = extend(PowerTurret, "north", {});

const impaler = extend(PowerTurret, "impaler", {});
impaler.shootType = spear;

const bow = extend(PowerTurret, "bow", {});

const glow = extend(PowerTurret, "glow", {});

const melinite = extend(PowerTurret, "melinite", {});

const toxin = extend(PowerTurret, "toxin", {});

const reagent = extend(ItemTurret, "reagent", {});

const endoxin = extend(ItemTurret, "endoxin", {});

const acidWave = extend(WaveEffect, {
sides: 0,
lifetime: 25,
sizeFrom: 0,
sizeTo: 18,
strokeTo: 0,
colorFrom: Color.valueOf("84f591"),
colorTo: Color.valueOf("84f591"),
});

const acidSmoke = extend(ParticleEffect, {
particles: 6,
length: 65,
cone: 360,
lifetime: 30,
sizeFrom: 8,
sizeTo: 0,
colorFrom: Color.valueOf("84f591"),
colorTo: Color.valueOf("84f59170"),
});

const acidSparks = extend(ParticleEffect, {
particles: 6,
length: 65,
cone: 360,
lifetime: 30,
sizeFrom: 8,
sizeTo: 0,
line: true,
strokeFrom: 2,
strokeTo: 0,
colorFrom: Color.valueOf("84f591"),
colorTo: Color.valueOf("84f591"),
});

const acidShell = extend(BasicBulletType, {
width: 13,
height: 20,
speed: 9,
lifetime: 40,
damage: 30,
sprite: "adc-acid-bullet",
pierce: true,
backColor: Color.valueOf("84f591"),
frontColor: Color.white,
trailColor: Color.valueOf("84f591"),
trailChance: 0.9,
shrinkY: 0,
buildingDamageMultiplier: 0.75,
hitEffect: new MultiEffect(acidWave, acidSmoke, acidSparks),
despawnEffect: new MultiEffect(acidWave, acidSmoke),
weaveScale: 5,
weaveMag: 5
});

const acidShell2 = extend(BasicBulletType, {
width: 13,
height: 20,
speed: 9,
lifetime: 40,
damage: 30,
sprite: "adc-acid-bullet",
pierce: true,
backColor: Color.valueOf("84f591"),
frontColor: Color.white,
trailColor: Color.valueOf("84f591"),
trailChance: 0.9,
shrinkY: 0,
buildingDamageMultiplier: 0.75,
hitEffect: new MultiEffect(acidWave, acidSmoke, acidSparks),
despawnEffect: new MultiEffect(acidWave, acidSmoke),
weaveScale: 5,
weaveMag: 5
});

const corroding = extend(ItemTurret, "corroding", {
shootLength: 1,
setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, acidShell)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, acidShell2)));
    }
});
corroding.buildType = () => extend(ItemTurret.ItemTurretBuild, corroding, {
	creload : 0,
    updateTile(){
        this.super$updateTile();
        
        if(this.isShooting() && this.isActive() && this.hasAmmo() && this.power.status > 0.5 && this.creload >= 60){
            this.creload = 0
            acidShell.create(this, this.team, this.x, this.y + 1, this.rotation)
            acidShell2.create(this, this.team, this.x, this.y + 1, this.rotation)
            Fx.none.at(this.x, this.y + 1)
            
        }
        else{
            if(this.creload < 60){this.creload += 1} 
        }
    },
});

const greenLaser = extend(LaserBulletType, {
	damage: 100,
	colors: [Pal.heal, Pal.heal, Color.white],
	drawSize: 200,
	width: 25,
	length: 560,
shake: 1,
despawnEffect: Fx.smokeCloud,
smokeEffect: Fx.none,
healPercent: 5,
collidesTeam: true,
});

const executioner = extend(LaserTurret, "executioner", {
setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, greenLaser)));
    }
});
executioner.consumes.add(new ConsumeCoolant(2)).update = false;
executioner.buildType = () => extend(LaserTurret.LaserTurretBuild, executioner, {
	creload : 0,
    updateTile(){
        this.super$updateTile();
        //bullet summoning x/y coordinates
        let wx = this.x + Mathf.range(14.25, -14.25)
        let wy = this.y + Mathf.range(22, -22)

        if(this.isShooting() && this.isActive() && this.hasAmmo() && this.power.status > 0.5 && this.creload >= 60){
            this.creload = 0
            greenLaser.create(this, this.team, wx, wy, this.rotation)
            Fx.shootBigSmoke2.at(wx, wy)
            Sounds.laserblast.at(this)
            
        }
        else{
            if(this.creload < 60){this.creload += 1} 
        }
    },
});

const liquids = require("liquids");
                
const contLaser = extend(ContinuousLaserBulletType, {
damage: 1,
length: 95,
shake: 0,
width: 4,
colors: [Pal.surge, Pal.surge, Pal.surge, Color.white],
});
                
const shock = extend(ItemTurret, "shock", {});

const discharge = extend(PowerTurret, "discharge", {
});

const pierce = extend(PowerTurret, "pierce", {});

const electron = extend(TractorBeamTurret, "electron", {});
                
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
    sprite: "adc-circular-saw-bullet",
    spin: -20,
    status: StatusEffects.sapped,
    statusDuration: 180,

    hitSound: sawHitSnd,
    hitEffect: sawHit,
    despawnEffect: sawDesp,
    frontColor: Color.valueOf("ffffff"),
    backColor: Color.valueOf("bd99ff"),
    hitSoundVolume: 0.4,
    shrinkY: 0,

});

const saw = extend(BasicBulletType, {
    width: 24,
    height: 24,

    damage: 80,
    speed: 6,
    lifetime: 60,
    pierce: true,
    sprite: "adc-circular-saw-bullet",
    spin: 20,
    
    status: StatusEffects.sapped,
    statusDuration: 180,

    hitSound: sawHitSnd,
    hitEffect: sawHit,
    despawnEffect: sawDesp,
    frontColor: Color.valueOf("ffffff"),
    backColor: Color.valueOf("bd99ff"),
    hitSoundVolume: 0.4,
    shrinkY: 0,

    despawned(b){
        sawBack.create(b, b.x, b.y, b.rotation() - 180, 1, 1);
    }
});

const sandT = extend(ItemTurret, "sand-turret", {});

const sandTh = extend(ItemTurret, "sand-thrower", {});

const dune = extend(ItemTurret, "dune", {});

const pyramid = extend(ItemTurret, "pyramid", {});

const cast = extend(ItemTurret, "cast", {});

const thrower = extend(ItemTurret, "thrower", {});

const speed = extend(ItemTurret, "speed", {});

//So far in development. MultiTurret lib It was taken from the old Progressed Materials
/*const multiTLib = require("multiTurretType");

const unoBullet = extend(BasicBulletType, {
  speed: 2,
  damage: 7,
  width: 3.5,
  height: 4.5,
  homingPower: 0.02,
  lifetime: 50,
  
});

const unoMount = multiTLib.newWeapon(unoBullet, "adc-unoM");
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
  knockback: 0.5,
  lifetime: 105,
  width: 5.5,
  height: 5.5,
  splashDamageRadius: 14,
  splashDamage: 18
});

const hailMount = multiTLib.newWeapon(hailBullet, "adc-hailM");
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

const waveMount = multiTLib.newWeapon(miniSlag, "adc-waveM");
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
jumble.requirements = ItemStack.with(Items.copper, 135, Items.lead, 75, Items.metaglass, 40, Items.graphite, 80, Items.silicon, 50);
jumble.category = Category.turret;
jumble.buildVisibility = BuildVisibility.shown;*/

const launch = extend(ItemTurret, "launch", {});

const missileFrag = extend(BasicBulletType, {
	width: 10,
	height: 10,
	splashDamage: 20,
	splashDamageRadius: 65,
	speed: 5,
	lifetime: 30,
	spin: 6,
	collidesTiles: false,
	backColor: Pal.missileYellowBack,
	frontColor: Pal.missileYellow,
	hitEffect: Fx.blastExplosion,
	despawnEffect: Fx.blastExplosion,
});

const additionalRocket = extend(MissileBulletType, {
	width: 16,
	height: 20,
	speed: 8,
	lifetime: 63,
	collidesTiles: false,
	sprite: "adc-rocket",
	damage: 60,
	splashDamage: 80,
	splashDamageRadius: 125,
	status: StatusEffects.blasted,
	statusDuration: 180,
	hittable: false,
	reflectable: false,
	buildingDamageMultiplier: 2,
	hitEffect: Fx.blastExplosion,
	despawnEffect: Fx.blastExplosion,
	fragBullets: 4,
	fragBullet: missileFrag
});

const flight = extend(ItemTurret, "flight", {
	setStats(){
        this.super$setStats();
this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, additionalRocket)));
}
});
flight.buildType = () => extend(ItemTurret.ItemTurretBuild, flight, {
	creload : 0,
    updateTile(){
        this.super$updateTile();
        
        if(this.isShooting() && this.isActive() && this.hasAmmo() && this.creload >= 150){
            this.creload = 0
            additionalRocket.create(this, this.team, this.x, this.y + 3.75, this.rotation)
            Fx.shootBig.at(this.x, this.y + 3.75)
            Sounds.shootBig.at(this)
            
        }
        else{
            if(this.creload < 150){this.creload += 1} 
        }
    },
});

const sparrow = extend(PowerTurret, "sparrow", {});

const hawk = extend(PowerTurret, "hawk", {});

const scrStar = extend(PowerTurret, "scarlet-star", {});

const bloodsap = extend(SapBulletType, {
	sapStrength: 0.95,
	damage: 80,
	lifetime: 20,
	length: 400,
	color: Color.valueOf("ff6e6e"),
	hitColor: Color.valueOf("ff6e6e"),
	status: statuses.bleeding,
	statusDuration: 280,
	width: 0.9
});

const bloodlust = extend(PowerTurret, "bloodlust", {
setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, bloodsap)));
    }
});
bloodlust.buildType = () => extend(PowerTurret.PowerTurretBuild, bloodlust, {
	creload : 0,
    updateTile(){
        this.super$updateTile();
        let sx = this.x + Mathf.range(9.75, -9.75)
        let sy = this.y + Mathf.range(10.5, -10.5)

        if(this.isShooting() && this.hasAmmo() && this.power.status > 0.5 && this.creload >= 20){
            this.creload = 0
            bloodsap.create(this, this.team, sx, sy, this.rotation)
            Fx.none.at(sx, sy)
            Sounds.sap.at(this)
        }
        else{
            if(this.creload < 20){this.creload += 1} 
        }
    },
});

const lightningFrag = extend(BasicBulletType, {
	width: 7,
	height: 7,
	despawnEffect: Fx.none,
	hitEffect: Fx.none,
	speed: 0,
	lifetime: 10,
	damage: 10,
	backColor: Color.valueOf("8a3340"),
	frontColor: Color.valueOf("ff6e6e"),
});

const sharpLaser = extend(LaserBulletType, {
	width: 25,
	length: 400,
	sideWidth: 2.5,
	sideAngle: 70,
	colors: [Color.valueOf("8a3340"), Color.valueOf("ff6e6e"), Color.valueOf("ff6e6e")], 
	damage: 300,
	lightningSpacing: 15,
	lightningDelay: 1,
	lightningLength: 12,
	lightningDamage: 30,
	lightColor: Color.valueOf("ff6e6e"),
	lightningColor: Color.valueOf("ff6e6e"),
	lightningType: lightningFrag,
	status: statuses.bleeding,
	statusDuration: 240
});

const injection = extend(ItemTurret, "injection", {
setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, sharpLaser)));
    }
});
/*injection.consumes.powerCond(3, TurretBuild.isActive);*/
injection.buildType = () => extend(ItemTurret.ItemTurretBuild, injection, {
	creload : 0,
    updateTile(){
        this.super$updateTile();
        let ty = this.y + Mathf.range(8.5)

        if(this.isShooting() && this.hasAmmo() && this.creload >= 320){
            this.creload = 0
            sharpLaser.create(this, this.team, this.x, ty, this.rotation)
            Fx.none.at(this.x, ty)
            Sounds.laser.at(this)
            Effect.shake(4, 4, this)
            this.recoil = 4
        }
        else{
            if(this.creload < 320){this.creload += 1} 
        }
    },
});

const artery = extend(ItemTurret, "artery", {});

const goldenPollination = extend(StatusEffect, "golden-pollination", {
	healthMultiplier: 1.4,
	speedMultiplier: 0.3,
	reloadMultiplier: 0.3
});

const goldenHit = extend(ParticleEffect, {
	particles: 6,
	sizeFrom: 4,
	sizeTo: 0,
	lifetime: 25,
	length: 15,
	cone: 360,
	colorFrom: Pal.surge,
	colorTo: Pal.surge
});

const goldenFire = extend(ParticleEffect, {
particles: 30,
sizeFrom: 3.5,
sizeTo: 0,
lifetime: 20,
length: 230,
//interp: Interp.circleOut,
cone: 5,
colorFrom: Pal.surge,
colorTo: Color.valueOf("d99e6a")
});

const goldenFireBullet = extend(BasicBulletType, {
	width: 0.01,
	height: 0.01,
	damage: 20,
	lifetime: 14,
	sprite: "circle-bullet",
	status: goldenPollination,
	statusDuration: 370,
	hitEffect: goldenHit,
	despawnEffect: Fx.none,
	frontColor: Color.white,
	backColor: Pal.surge,
	speed: 9,
});
	

const enlight = extend(PowerTurret, "enlightenment", {
setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, goldenFireBullet)));
    }
});
enlight.buildType = () => extend(PowerTurret.PowerTurretBuild, enlight, {
    creload : 0,
    updateTile(){
        this.super$updateTile();
        let fx = this.x + Mathf.range(-2.5, 2.5)
        let fy = this.y + Mathf.range(-6.5, 6.5)

        if(this.isShooting() && this.power.status > 0.1 && this.hasAmmo() && this.creload >= 5){
            this.creload = 0
            goldenFireBullet.create(this, this.team, fx, fy, this.rotation)
            goldenFire.at(fx, fy, this.rotation)
            Sounds.flame.at(this)
        }
        else{
            if(this.creload < 5){this.creload += 1} 
        }
    },
});

const gold = extend(PowerTurret, "gold-horn", {});

const brazier = extend(PowerTurret, "brazier", {});

const hiddenTesla = extend(PowerTurret, "hidden-tesla", {});

const teslaCoil = extend(PowerTurret, "tesla-coil", {});

const phaseLightning = extend(LightningBulletType, {
	lightningColor: Pal.surge,
	damage: 35,
	lightningLength: 55,
});
const phaseLightning2 = extend(LightningBulletType, {
	lightningColor: Pal.surge,
	damage: 35,
	lightningLength: 55,
});
const phaseLightning3 = extend(LightningBulletType, {
	lightningColor: Pal.surge,
	damage: 35,
	lightningLength: 55,
});
const phaseLaser = extend(LaserBulletType, {
	colors: [Pal.surge, Pal.surge, Color.white],
	damage: 80,
	length: 220,
	width: 17,
	lightningColor: Pal.surge,
	lightningDamage: 35,
	lightningSpacing: 30,
	lightningLength: 10,
	reloadMultiplier: 1.5
});
const shockFrag = extend(BasicBulletType, {
	width: 8,
	height: 8,
	damage: 15,
	speed: 7,
	lifetime: 60,
	backColor: Pal.surge,
	frontColor: Color.white,
	lightningColor: Pal.surge,
	lightning: 1,
	lightningCone: 360,
	lightningLength: 5,
	pierceBuilding: true,
	pierce: true
});
const phaseShockBullet = extend(BasicBulletType, {
	width: 18,
	height: 22,
	damage: 35,
	speed: 7,
	lifetime: 60,
	backColor: Pal.surge,
	frontColor: Color.white,
	lightningColor: Pal.surge,
	lightning: 4,
	lightningCone: 45,
	lightningLength: 8,
	fragBullets: 6,
	fragBullet: shockFrag
});

const phase = extend(ItemTurret, "phase", {
	setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, phaseLightning)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, phaseLaser)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, phaseShockBullet)));
    }
});
phase.buildType = () => extend(ItemTurret.ItemTurretBuild, phase, {
    creload : 0,
    updateTile(){
        this.super$updateTile();

        if(this.isShooting() && this.power.status > 0.1 && this.hasAmmo() && this.creload >= 140){
            this.creload = 0
            phaseLightning.create(this, this.team, this.x, this.y, this.rotation)
            Sounds.spark.at(this)
            phaseLightning2.create(this, this.team, this.x, this.y, this.rotation)
            Sounds.spark.at(this)
            phaseLightning3.create(this, this.team, this.x, this.y, this.rotation)
            Sounds.spark.at(this)
            phaseLaser.create(this, this.team, this.x, this.y, this.rotation)
            Sounds.laser.at(this)
            phaseShockBullet.create(this, this.team, this.x, this.y, this.rotation)
            Sounds.shootBig.at(this)
        }
        else{
            if(this.creload < 140){this.creload += 1} 
        }
    },
});

const equalizer = extend(ItemTurret, "equalizer", {});

const photon = extend(ItemTurret, "photon", {});

const impulse = extend(PowerTurret, "impulse-turret", {});

const torpedo = extend(PowerTurret, "torpedo", {});

const warhead = extend(ItemTurret, "warhead", {});

const hammer = extend(ItemTurret, "hammer", {});

const shotgun = extend(ItemTurret, "shotgun", {});

const energySparkLightning = extend(LightningBulletType, {
	lifetime: 70,
	lightningColor: Pal.surge,
	lightningLength: 14,
	damage: 12,
	collidesGround: false,
	collidesAir: true,
});

const energySpark = extend(FlakBulletType, {
	width: 7,
	height: 7,
	speed: 6,
	lifetime: 45,
	hitEffect: Fx.flakExplosion,
	despawnEffect: Fx.flakExplosion,
	damage: 20,
	splashDamage: 40,
	splashDamageRadius: 45,
	explodeRange: 45,
	fragBullets: 2,
	fragCone: 360,
	fragBullet: energySparkLightning,
	collidesGround: false
});

const energyExplode = extend(ExplosionEffect, {
	waveRad: 185,
	waveColor: Pal.bulletYellow,
	waveLife: 25,
	smokeRad: 195,
	smokeSize: 4,
	smokeColor: Pal.darkerMetal,
	smokes: 6,
	sparkRad: 195,
	sparkLen: 5,
	sparks: 6,
	sparkColor: Pal.unitFront,
});

const energyBall = extend(BasicBulletType, {
	sprite: "circle-bullet",
	width: 15,
	height: 15,
	shrinkX: 2,
	shrinkY: 2,
	speed: 0,
	lifetime: 185,
	damage: 0,
	collides: false,
	collidesGround: false,
	collidesAir: true,
	collidesTiles: false,
	splashDamage: 225,
	splashDamageRadius: 185,
	backColor: Pal.bulletYellowBack,
	frontColor: Pal.bulletYellow,
	despawnEffect: energyExplode,
	hitEffect: Fx.none,
	fragBullets: 8,
	fragCone: 360,
	fragLifeMin: 0.3,
	fragBullet: energySpark,
	hitSound: Sounds.explosion
});

const trembling = extend(PowerTurret, "trembling", {
setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, energyBall)));
    }
});
trembling.buildType = () => extend(PowerTurret.PowerTurretBuild, trembling, {
    creload : 0,
    updateTile(){
        this.super$updateTile();

        if(this.isShooting() && this.power.status > 0.1 && this.hasAmmo() && this.creload >= 180){
            this.creload = 0
            energyBall.create(this, this.team, this.x, this.y, this.rotation)
            Sounds.artillery.at(this)
        }
        else{
            if(this.creload < 180){this.creload += 1} 
        }
    },
});

const decay = extend(ItemTurret, "decay", {});

const blade = extend(PowerTurret, "blade", {
shootType: saw
});

const punch = extend(ItemTurret, "punch", {});

const shadowSplashEffect = extend(WaveEffect, {
	sides: 0,
	lifetime: 25,
	sizeFrom: 100,
	sizeTo: 110,
	strokeTo: 0,
	colorFrom: Pal.sapBullet,
	colorTo: Pal.sapBulletBack
});

const shadowEmpSparks = extend(WaveEffect, {
	particles: 6,
	lifetime: 35,
	sizeFrom: 6,
	sizeTo: 0,
	strokeTo: 0,
	line: true,
	length: 35,
	cone: 360,
	colorFrom: Pal.sapBullet,
	colorTo: Pal.sapBulletBack
});

const shadowEmp = extend(BasicBulletType, {
	width: 12,
	height: 12,
	speed: 5,
	lifetime: 80,
	splashDamage: 70,
	splashDamageRadius: 100,
	sprite: "circle-bullet",
	hitColor: Pal.sap,
	lightColor: Pal.sap,
	lightRadius: 80,
	hitSound: Sounds.plasmaboom,
	lightOpacity: 0.7,
	backColor: Pal.sapBulletBack,
	frontColor: Pal.sapBullet,
	damage: 60,
	hitEffect: shadowSplashEffect,
	shootEffect: shadowEmpSparks,
	smokeEffect: Fx.shootBigSmoke2,
	hitShake: 5,
	trailLength: 22,
	trailWidth: 6,
	trailColor: Pal.sapBulletBack,
	status: StatusEffects.sapped
});
	
const shadow = extend(ItemTurret, "shadow", {
setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, shadowEmp)));
    },
    shootLength: -2.75
});
shadow.buildType = () => extend(ItemTurret.ItemTurretBuild, shadow, {
    creload : 0,
    updateTile(){
        this.super$updateTile();
        let shX = this.x + Mathf.range(-10, 10)
        let shY = this.y + 6.25
        if(this.isShooting() && this.hasAmmo() && this.power.status >= 0.3 && this.creload >= 80){
            this.creload = 0
            shadowEmp.create(this, this.team, shX, shY, this.rotation)
            Sounds.laser.at(this)
            Effect.shake(5, 5, this)
        }
        else{
            if(this.creload < 80){this.creload += 1} 
        }
    },
});

const cloudRip = extend(ItemTurret, "cloud-breaker", {});

const bombThrower = extend(ItemTurret, "bomb-thrower", {});

const bayonetFireball = extend(BasicBulletType, {
	width: 12,
	height: 12,
	sprite: "circle-bullet",
	speed: 4,
	lifetime: 100,
	pierce: true,
	pierceBuilding: true,
	absorbable: false,
	reflectable: false,
	hittable: false,
	trailColor: Pal.lightOrange,
	backColor: Pal.lightOrange,
	frontColor: Pal.lightishOrange,
	trailEffect: Fx.fireHit,
	damage: 40,
	splashDamage: 60,
	splashDamageRadius: 60,
	status: StatusEffects.burning,
	statusDuration: 180,
	homingPower: 0.1,
	homingRange: 60
});
	
const bayonet = extend(ItemTurret, "bayonet", {
setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, bayonetFireball)));
    },
    shootLength: 7.25
});
bayonet.buildType = () => extend(ItemTurret.ItemTurretBuild, bayonet, {
    creload : 0,
    updateTile(){
        this.super$updateTile();

        if(this.isShooting() && this.hasAmmo() && this.creload >= 180){
            this.creload = 0
            bayonetFireball.create(this, this.team, this.x, this.y + 7.25, this.rotation)
            Sounds.flame.at(this)
        }
        else{
            if(this.creload < 180){this.creload += 1} 
        }
    },
});

const hearth = extend(ItemTurret, "hearth", {
    shootLength: 7.25
});

const fireBullet = extend(BasicBulletType, {
width: 12,
height: 17,
speed: 10,
lifetime: 44,
damage: 20,
hitEffect: new MultiEffect(Fx.hitBulletSmall, Fx.fireHit),
despawnEffect: new MultiEffect(Fx.hitBulletSmall, Fx.fireHit),
backColor: Pal.lightishOrange,
frontColor: Pal.lighterOrange,
trailColor: Pal.lightishOrange,
trailChance: 0.9
});

const flame = extend(ItemTurret, "flame", {
setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, fireBullet)));
    }
});
flame.buildType = () => extend(ItemTurret.ItemTurretBuild, flame, {
    creload : 0,
    updateTile(){
        this.super$updateTile();

        if(this.isShooting() && this.hasAmmo() && this.creload >= 8){
            this.creload = 0
            fireBullet.create(this, this.team, this.x, this.y, this.rotation)
            Sounds.shoot.at(this)
        }
        else{
            if(this.creload < 14){this.creload += 1} 
        }
    },
});

const needle = extend(ItemTurret, "needle", {});

const mortar = extend(ItemTurret, "mortar", {});

const skull = extend(ItemTurret, "skull", {});

const pulse = extend(PowerTurret, "pulse", {});

const pressure = extend(PowerTurret, "pressure", {});

const revival = extend(ItemTurret, "revival", {});

const recovery = extend(ItemTurret, "recovery", {});

const emeraldEmpCannon = extend(ItemTurret, "emerald-emp-cannon", {});

const regen = extend(ParticleEffect, {
	region: "adc-rhombus",
	length: 0,
	sizeFrom: 4,
	sizeTo: 0,
	lifetime: 35,
	colorFrom: Pal.heal,
	colorTo: Pal.heal,
	particles: 1
});

const regeneration = extend(StatusEffect, "regeneration", {
	speedMultiplier: 1.5,
	damageMultiplier: 1.5,
	relooadMultiplier: 1.5,
	healthMultiplier: 0.7,
	damage: -0.2,
	effect: regen,
	effectChance: 0.07,
	color: Pal.heal,
});

const GainTurret = extend(RepairPoint, "gain-turret", {});
GainTurret.buildType = () => extendContent(RepairPoint.RepairPointBuild, GainTurret, {
	updateTile() { 
 let multiplier = 1; 
   
 if(this.acceptCoolant) { 
 let liq = this.consumes.get(ConsumeType.liquid); 
 multiplier = liq.valid(this) ? 1 + this.liquids.current().heatCapacity * this.coolantMultiplier : 1; 
 } 
 
 if(this.target != null && (this.target.dead || this.target.dst(this) - this.target.hitSize/2 > this.block.repairRadius)){ 
 this.target = null; 
 } 
 
 if(this.target == null){ 
 this.offset.setZero(); 
 } 
 
 let gained = false; 
 
 if( this.target != null && this.consValid() ){ 
 let angle = Angles.angle( this.x, this.y, this.target.x + this.offset.x, this.target.y + this.offset.y ); 
 
 if(Angles.angleDist(angle, this.rotation) < 30){ 
 gained = true; 
 //status effect apply
 this.target.apply(regeneration, 600) 
 } 
 this.rotation = Mathf.slerpDelta(this.rotation, angle, 0.5 * this.efficiency() * this.timeScale); 
 } 
 
 this.strength = Mathf.lerpDelta(this.strength, gained ? 1 : 0, 0.08 * Time.delta); 
 
 let rect = new Rect();
 
 if(this.block.timerTarget, 20){ 
 rect.setSize(this.block.repairRadius * 2).setCenter(this.x, this.y); 
 this.target = Units.closest(this.team, this.x, this.y, this.block.repairRadius, (u) => u.damaged() ); 
 } 
},
});

//temporarily not working
/*function newNode(parent, content, req, objectives){
	
    var parnode = TechTree.get(parent);
    var node = new TechTree.TechNode(parnode, content, req = null ? content.researchRequirements() : req);
    var used = new ObjectSet();
  
    node.objectives.addAll(objectives = null ? null : objectives);
}
 
newNode(Blocks.ripple, torpedo, ItemStack.with(Items.copper, 6500, Items.lead, 4500, Items.silicon, 3000, Items.thorium, 2250), Seq.with(new Objectives.SectorComplete(sectors.creotitePowerStation)));*/

module.exports = {
warhead: warhead,
impaler: impaler,
needle: needle,
executioner: executioner,
north: north
}