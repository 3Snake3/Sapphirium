const statuses = require("SappStatuses");

//Hunters faction
const houndDeath = new MultiEffect(
           extend(ExplosionEffect, {
           	lifetime: 30,
               waveLife: 8,
               waveRad: 16,
               waveStroke: 2.5,
               waveColor: Color.valueOf("ffe18f"),
               sparks: 8,
               sparkRad: 20,
               sparkLen: 4,
               sparkStroke: 2,
               sparkColor: Color.valueOf("ffe18f"),
               smokes: 8,
               smokeRad: 20,
               smokeSize: 4,
               smokeColor: Color.valueOf("ffe18f70"),
               }),
           extend(ParticleEffect, {
           	particles: 1,
           	region: "sapphirium-rhombus",
               sizeInterp: Interp.slope,
               length: 0,
               lifetime: 60,
               sizeFrom: 8,
               sizeTo: 0,
               colorFrom: Color.valueOf("ffe18f"),
               colorTo: Color.valueOf("ffe18f"),
               }),
               extend(ParticleEffect, {
           	particles: 1,
           	region: "sapphirium-rhombus",
               length: 0,
               lifetime: 120,
               sizeFrom: 8,
               sizeTo: 0,
               colorFrom: Color.valueOf("ffe18f"),
               colorTo: Color.valueOf("ffe18f"),
               })
          );
const houndWeapon = extend(Weapon, "sapphirium-hound-weapon", {
	top: false,
	x: 4,
	y: 0,
	ejectEffect: Fx.casing1,
	reload: 60,
	bullet: extend(BasicBulletType, 4, 44, {
		width: 8,
		height: 10,
		trailWidth: 2,
		trailLength: 5,
		buildingDamageMultiplier: 2,
		shootEffect: Fx.shootBigColor,
		smokeEffect: Fx.shootBigSmoke,
		backColor: Color.valueOf("ffe18f"),
		frontColor: Color.white,
		trailColor: Color.valueOf("ffe18f"),
		hitColor: Color.valueOf("ffe18f"),
		despawnEffect: new MultiEffect(
              extend(WaveEffect, {
              	sizeTo: 8,
                  strokeFrom: 1,
                  lifetime: 24,
                  colorFrom: Color.valueOf("ffe18f"),
                  colorTo: Color.valueOf("ffe18f"),
        }),
              extend(ParticleEffect, {
              	particles: 1,
                  cone: 360,
                  length: 0,
                  sizeFrom: 2,
                  sizeTo: 0,
                  lifetime: 30,
                  colorFrom: Color.valueOf("ffe18f"),
                  colorTo: Color.valueOf("574F00"),
                  region: "sapphirium-rhombus",
                  }),
              extend(ParticleEffect, {
              	startDelay: 12,
                  particles: 1,
                  cone: 360,
                  length: 0,
                  sizeFrom: 3,
                  sizeTo: 0,
                  lifetime: 15,
                  colorFrom: Color.white,
                  colorTo: Color.valueOf("EBD700"),
                  region: "sapphirium-rhombus",
                  })
                  ),
        hitEffect: new MultiEffect(
              extend(WaveEffect, {
              	sizeTo: 6,
                  strokeFrom: 1,
                  lifetime: 30,
                  colorFrom: Color.valueOf("ffe18f"),
                  colorTo: Color.valueOf("ffe18f"),
                  }),
              extend(ParticleEffect, {
              	particles: 1,
                  cone: 360,
                  length: 0,
                  sizeFrom: 4,
                  sizeTo: 0,
                  lifetime: 60,
                  colorFrom: Color.valueOf("ffe18f"),
                  colorTo: Color.valueOf("ffe18f"),
                  region: "sapphirium-rhombus",
                  }),
              extend(ParticleEffect, {
              	startDelay: 25,
                  particles: 1,
                  cone: 360,
                  length: 0,
                  sizeFrom: 3,
                  sizeTo: 0,
                  lifetime: 30,
                  colorFrom: Color.white,
                  colorTo: Color.white,
                  region: "sapphirium-rhombus",
                  })
                  ),
        status: StatusEffects.slow,
        statusDuration: 90,
        lifetime: 40
        })
        });
const hound = extend(ErekirUnitType, "hound", {
deathExplosionEffect: houndDeath,
});
hound.constructor = () => extend(MechUnit, {});
hound.weapons.add(houndWeapon);

const rampageDeath = new MultiEffect(
           extend(ExplosionEffect, {
           	lifetime: 30,
               waveLife: 8,
               waveRad: 24,
               waveStroke: 2.5,
               waveColor: Color.valueOf("ffe18f"),
               sparks: 14,
               sparkRad: 28,
               sparkLen: 4,
               sparkStroke: 2,
               sparkColor: Color.valueOf("ffe18f"),
               smokes: 14,
               smokeRad: 28,
               smokeSize: 4,
               smokeColor: Color.valueOf("ffe18f70"),
               }),
           extend(ParticleEffect, {
           	particles: 1,
           	region: "sapphirium-rhombus",
               length: 0,
               lifetime: 180,
               sizeFrom: 16,
               sizeTo: 0,
               colorFrom: Color.valueOf("ffe18f"),
               colorTo: Color.valueOf("ffe18f"),
               }),
           extend(SeqEffect, {
           	effects: [
               extend(WaveEffect, {
               	interp: Interp.slope,
                   sizeFrom: 20,
                   sizeTo: 25,
                   lifetime: 90,
                   colorFrom: Color.valueOf("ffe18f"),
                   colorTo: Color.valueOf("ffe18f00"),
                   }),
               extend(WaveEffect, {
               	interp: Interp.slope,
                   sizeFrom: 25,
                   sizeTo: 20,
                   lifetime: 90,
                   colorFrom: Color.valueOf("ffe18f"),
                   colorTo: Color.valueOf("ffe18f00"),
                   })
                   ]
               })
          );
const rampage = extend(ErekirUnitType, "rampage", {
deathExplosionEffect: rampageDeath
});
rampage.constructor = () => extend(LegsUnit, {});

const hunt = extend(ErekirUnitType, "hunt", {});
hunt.constructor = () => extend(MechUnit, {});

const houndSpawnerBullet = extend(BasicBulletType, {
    width: 16,
    height: 16,
    sprite: "large-orb",
    speed: 0,
    damage: 0,
    lifetime: 10,
    shrinkX: -0.7,
    shrinkY: -0.7,
    collides: false,
    collidesTiles: false,
    hittable: false,
    absorbable: false,
    reflectable: false,
    hitEffect: Fx.none,
    despawnEffect: Fx.spawn,
    despawnSound: Sounds.unitCreate,
    despawnUnit: hound,
    despawnUnitCount: 2,
    despawnUnitRadius: 8,
    shootEffect: Fx.none,
    smokeEffect: Fx.none
});

var despawnUnit = new Stat("despawnunit", StatCat.function);
/*var amount = new Stat("amount");*/
const houndSpawner = extend(Weapon, "hound-spawner", {
	x: 0,
	y: -12.5,
	reload: 1200,
	recoil: 0,
    mirror: false,
    alternate: false,
    ejectEffect: Fx.none,
    shootSound: Sounds.none,
    alwaysShooting: true,
    bullet: houndSpawnerBullet,
    addStats(u, t) {
        this.super$addStats(u, t);
        t.add("[accent]" + despawnUnit.localized() + ":" + " " + "[white]" + 2 + " " + hound.localizedName);
        t.row();
        t.image(hound.uiIcon).size(40).left().scaling(Scaling.fit);
	}
});

const waveEffect = extend(WaveEffect, {
    sizeTo: 12,
    strokeFrom: 1,
    lifetime: 24,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
});

const particleEffect = extend(ParticleEffect, {
    particles: 1,
    cone: 360,
    length: 0,
    sizeFrom: 6,
    sizeTo: 0,
    lifetime: 30,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("574F00"),
    region: "sapphirium-rhombus"
});

const particleEffect2 = extend(ParticleEffect, {
    startDelay: 12,
    particles: 1,
    cone: 360,
    length: 0,
    sizeFrom: 4,
    sizeTo: 0,
    lifetime: 15,
    colorFrom: Color.white,
    colorTo: Color.valueOf("EBD700"),
    region: "sapphirium-rhombus"
});

const waveEffect2 = extend(WaveEffect, {
    sizeTo: 8,
    strokeFrom: 1,
    lifetime: 30,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
});

const particleEffect3 = extend(ParticleEffect, {
    particles: 1,
    cone: 360,
    length: 0,
    sizeFrom: 7,
    sizeTo: 0,
    lifetime: 60,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("574F00"),
    region: "sapphirium-rhombus"
});

const particleEffect4 = extend(ParticleEffect, {
    startDelay: 25,
    particles: 1,
    cone: 360,
    length: 0,
    sizeFrom: 5,
    sizeTo: 0,
    lifetime: 30,
    colorFrom: Color.white,
    colorTo: Color.white,
    region: "sapphirium-rhombus"
});

const raptorShotgunBullet = extend(BasicBulletType, 8, 66, "sapphirium-laser-bullet", {
    width: 14,
    height: 20,
    lifetime: 24,
    homingPower: 0.05,
    homingRange: 46,
    backColor: Color.valueOf("ffe18f"),
    hitColor: Color.valueOf("ffe18f"),
    frontColor: Color.white,
    trailColor: Color.valueOf("ffe18f"),
    trailWidth: 2,
    trailLength: 4,
    shootEffect: Fx.shootBigColor,
    status: statuses.deepWounds,
    statusDuration: 120,
    smokeEffect: Fx.shootSmokeSquareSparse,
    despawnEffect: new MultiEffect(waveEffect, particleEffect, particleEffect2),
    hitEffect: new MultiEffect(waveEffect2, particleEffect3, particleEffect4),
});

const raptorShotgun = extend(Weapon, "sapphirium-raptor-shotgun", {
    x: -15.75,
    y: 0.75,
    top: false,
    mirror: false,
    shootSound: Sounds.shootBreachCarbide,
    ejectEffect: Fx.casing3,
    recoil: 6,
    reload: 120,
    velocityRnd: 0.7,
    xRand: 3,
    shoot: new ShootSpread(10, 2),
    bullet: raptorShotgunBullet
});

const wave = extend(WaveEffect, {
    sides: 0,
    sizeFrom: 0,
    sizeTo: 56,
    strokeFrom: 3,
    strokeTo: 0,
    lifetime: 30,
    colorFrom: Color.valueOf("eb6550"),
    colorTo: Color.valueOf("eb6550"),
});

const emp = extend(EmpBulletType, {
    width: 14,
    height: 14,
    radius: 56,
    damage: 0,
    speed: 0,
    sprite: "circle-bullet",
    backColor: Color.valueOf("eb6550"),
    frontColor: Color.valueOf("eb8778"),
    hitColor: Color.valueOf("eb6550"),
    hitEffect: wave,
    despawnEffect: wave,
    hitPowerEffect: Fx.none,
    collidesAir: true,
    collidesGround: true,
    shrinkX: 0,
    shrinkY: 0,

    removed(b) {
        this.super$removed(b);
        Damage.status(Team.derelict, b.x, b.y, 56, statuses.unleash, 420, this.collidesAir, this.collidesGround);
    }
});

//for stats only
const empP = extend(EmpBulletType, {
    width: 14,
    height: 14,
    radius: 56,
    damage: 0,
    speed: 0,
    collidesAir: true,
    collidesGround: true,
    status: statuses.unleash,
    statusDuration: 420
});

const raptorArtilleryBullet = extend(ArtilleryBulletType, {
    width: 28,
    height: 28,
    lifetime: 110,
    speed: 1.3,
    damage: 220,
    sprite: "shell",
    splashDamage: 220,
    splashDamageRadius: 56,
    backColor: Color.valueOf("ffe18f"),
    hitColor: Color.valueOf("ffe18f"),
    trailColor: Color.valueOf("ffe18f"),
    frontColor: Color.white,
    trailLength: 27,
    trailWidth: 3,
    hitEffect: Fx.blastExplosion,
    despawnEffect: Fx.blastExplosion,
    despawnUnit: rampage,
    fragBullets: 1,
    fragBullet: emp,
    fragRandomSpread: 0,
});

const raptorArtillery = extend(Weapon, "sapphirium-raptor-artillery", {
    x: 15,
    y: 0.75,
    top: false,
    mirror: false,
    shootSound: Sounds.shootArtillerySapBig,
    ejectEffect: Fx.casing3,
    recoil: 5,
    reload: 1200,
    recoilTime: 800,
    cooldownTime: 1200,
    bullet: raptorArtilleryBullet,
    addStats(u, t) {
        this.super$addStats(u, t);
        StatValues.ammo(ObjectMap.of(u, empP)).display(t);
        t.row();
        t.add("[accent]" + despawnUnit.localized() + ":" + " " + "[white]" + 1 + " " + rampage.localizedName);
        t.row();
        t.image(rampage.uiIcon).size(40).left().scaling(Scaling.fit);
    }
});


const raptor = extend(ErekirUnitType, "raptor", {});
raptor.constructor = () => extend(MechUnit, {});
raptor.weapons.addAll(houndSpawner, raptorShotgun, raptorArtillery);

const punchSparks = extend(ParticleEffect, {
	particles: 28,
	cone: 15,
	length: 36,
	lifetime: 30,
	interp: Interp.pow2Out,
	sizeInterp: Interp.pow2Out,
	line: true,
	lenFrom: 24,
	lenTo: 0,
	strokeFrom: 2,
	strokeTo: 0,
	colorFrom: Pal.accent,
	colorTo: Pal.accent,
});

const punch = extend(ShrapnelBulletType, {
	length: 25,
	width: 20,
	fromColor: Color.valueOf("00000000"),
	toColor: Color.valueOf("00000000"),
	serrations: 0,
	damage: 1,
	knockback: -10,
	status: StatusEffects.slow,
	statusDuration: 60,
	hitSound: Sounds.shootMalign,
	hitEffect: punchSparks,
	shootEffect: Fx.none,
	smokeEffect: Fx.none,
	hitShake: 6,
	maxRange: 30,
	range: 30,
	rangeOverride: 30,
});

let mySound = Vars.tree.loadSound("claws-wave");
let glowLeft = new RegionPart("-glow");
	glowLeft.progress = DrawPart.PartProgress.warmup;
	glowLeft.mirror = false;
	glowLeft.blending = Blending.additive;
	glowLeft.color = Color.valueOf("ffd37f70");
	glowLeft.outline = false;
const mawLeftWeapon = extend(Weapon, "sapphirium-maw-weapon-left", {
	mirror: false,
	alternate: false,
	top: false,
	shootSound: mySound,
	reload: 60,
	y: 5 / 4,
	x: -122 / 4,
	shootY: 106 / 4,
	shootX: 17 / 4,
	recoil: -30,
	bullet: punch,
	shootCone: 200,
});

mawLeftWeapon.parts.add(glowLeft);

const punch2 = extend(ShrapnelBulletType, {
	length: 40,
	width: 20,
	fromColor: Color.valueOf("00000000"),
	toColor: Color.valueOf("00000000"),
	serrations: 0,
	damage: 140,
	status: StatusEffects.unmoving,
	statusDuration: 84,
	hitSound: Sounds.shootMalign,
	hitEffect: punchSparks,
	shootEffect: Fx.none,
	smokeEffect: Fx.none,
	hitShake: 6,
	fragOnHit: false,
	fragBullets: 1,
    fragBullet: emp,
    fragRandomSpread: 0,
    maxRange: 30,
	range: 30,
	rangeOverride: 30,
});

const shotDelay = extend(ShootPattern, {
	firstShotDelay: 60,
});

var glowRight = new RegionPart("-glow");
	glowRight.progress = DrawPart.PartProgress.warmup;
	glowRight.mirror = false;
	glowRight.blending = Blending.additive;
	glowRight.color = Color.valueOf("ffd37f70");
	glowRight.outline = false;
	
const mawRightWeapon = extend(Weapon, "sapphirium-maw-weapon-right", {
	mirror: false,
	alternate: false,
	top: false,
	shootSound: mySound,
	reload: 90,
	shoot: shotDelay,
	y: 7 / 4,
	x: 120 / 4,
	shootY: 78 / 4,
	rotate: true,
	rotateSpeed: 2,
	rotationLimit: 5,
	shootCone: 200,
	shootX: 0,
	recoil: -30,
	bullet: punch2,
	addStats(u, t){
		this.super$addStats(u, t);
		StatValues.ammo(ObjectMap.of(u, empP)).display(t);
		}
});

mawRightWeapon.parts.add(glowRight);

const frags = extend(BasicBulletType, {
	width: 8,
	height: 10,
	damage: 45,
	speed: 8,
	lifetime: 15,
	hitEffect: Fx.hitBulletColor,
	despawnEffect: Fx.hitBulletColor,
	status: StatusEffects.slow,
	statusDuration: 60,
	backColor: Color.valueOf("eb6550"),
    frontColor: Color.valueOf("eb8778"),
    hitColor: Color.valueOf("eb6550"),
});

const bite = extend(ShrapnelBulletType, {
	length: 18,
	width: 0,
	serrations: 0,
	damage: 140,
	status: StatusEffects.unmoving,
	statusDuration: 84,
	hitSound: Sounds.shootMalign,
	hitEffect: punchSparks,
	shootEffect: Fx.none,
	smokeEffect: Fx.none,
	hitShake: 6,
	fragBullets: 7,
    fragBullet: frags,
    fragRandomSpread: 180,
});

let part = new RegionPart("-fangs");
part.mirror = true;
part.under = true;
part.rotation = -35;
part.moveRot = 35;
part.progress = DrawPart.PartProgress.recoil;

let fangsGlow = new RegionPart("-fangs-glow");
fangsGlow.rotation = -35;
fangsGlow.moveRot = 35;
fangsGlow.progress = DrawPart.PartProgress.recoil;
fangsGlow.mirror = true;
fangsGlow.under = true;
fangsGlow.outline = false;
fangsGlow.blending = Blending.additive;
fangsGlow.color = Color.valueOf("ffb37f70");

let mySound2 = Vars.tree.loadSound("bladehit");
const mawJaw = extend(Weapon, "sapphirium-maw-jaw-weapon", {
	x: 0,
	y: 0,
	shootX: 0,
	shootY: 40 / 4,
	reload: 180,
	recoil: 0,
	mirror: false,
	alternate: false,
	top: false,
	shootSound: mySound2,
	bullet: bite,
});
mawJaw.parts.add(part, fangsGlow);

var spitEffect = new MultiEffect(
         extend(WaveEffect, {
			sizeFrom: 8,
			sizeTo: 24,
			strokeFrom: 2,
			strokeTo: 0,
			colorFrom: Color.valueOf("ffe18f"),
            colorTo: Color.valueOf("ffe18f"),
            lifetime: 15,
            }),
         extend(ParticleEffect, {
        	particles: 12,
            lifetime: 30,
            sizeFrom: 5,
            sizeTo: 0,
            colorFrom: Color.valueOf("ffe18f"),
            colorTo: Color.valueOf("ffe18f"),
            interp: Interp.circleOut,
            sizeInterp: Interp.circleOut,
            cone: 360,
            length: 24,
            region: "sapphirium-rhombus"
            }),
         );

const spitBall = extend(BasicBulletType, 3, 124, "circle-bullet", {
		width: 12,
		height: 12,
		trailWidth: 3,
		trailLength: 8,
		lifetime: 40,
		collidesAir: false,
		splashDamage: 130,
		splashDamageRadius: 24,
		backColor: Color.valueOf("ffe18f"),
		hitColor: Color.valueOf("ffe18f"),
		trailColor: Color.valueOf("ffe18f"),
		shootEffect: extend(WaveEffect, {
			sizeFrom: 8,
			sizeTo: 24,
			strokeFrom: 2,
			strokeTo: 0,
			colorFrom: Color.valueOf("ffe18f"),
            colorTo: Color.valueOf("ffe18f"),
            lifetime: 15,
            }),
        smokeEffect: extend(ParticleEffect, {
        	particles: 12,
            lifetime: 30,
            sizeFrom: 5,
            sizeTo: 0,
            colorFrom: Color.valueOf("ffe18f"),
            colorTo: Color.valueOf("ffe18f"),
            interp: Interp.pow2Out,
            sizeInterp: Interp.pow2Out,
            cone: 30,
            length: 24,
            region: "sapphirium-rhombus"
            }),
         hitEffect: spitEffect,
         despawnEffect: spitEffect,
         despawnUnit: hound,
         despawnUnitCount: 4,
         despawnUnitRadius: 24,
         fragBullets: 3,
         fragRandomSpread: 0,
         fragSpread: 24,
         fragBullet: extend(BasicBulletType, 4, 0, {
         	lifetime: 6,
             width: 0,
             height: 0,
             hitEffect: Fx.none,
             despawnEffect: Fx.spawn,
         despawnUnit: rampage,
         despawnUnitCount: 1,
         despawnUnitRadius: 0,
         }),
         });
spitBall.spawnBullets.add(extend(BasicBulletType, 3, 0, "sapphirium-none-bullet", {
		lifetime: 40,
		collidesAir: false,
         hitEffect: Fx.none,
         despawnEffect: Fx.none,
         fragBullets: 1,
         fragRandomSpread: 0,
         fragBullet: emp
         }));

const mawSpit = extend(Weapon, "sapphirium-maw-spit", {
	x: 0,
	y: 40 / 4,
	shootY: 0,
	reload: 600,
	recoil: 0,
	mirror: false,
	alternate: false,
	top: false,
	shootSound: Sounds.shootNavanax,
	bullet: spitBall,
         addStats(u, t){
         	this.super$addStats(u, t);
             StatValues.ammo(ObjectMap.of(u, empP)).display(t);
             t.row();
             t.add("[accent]" + despawnUnit.localized() + ":" + " " + "[white]" + 4 + " " + hound.localizedName + " " + 3 + " " + rampage.localizedName);
        t.row();
        t.image(hound.uiIcon).size(40).left().scaling(Scaling.fit);
        t.row();
        t.image(rampage.uiIcon).size(40).left().scaling(Scaling.fit);
        }
         });

var mawBullEffect = new MultiEffect(
                    extend(WaveEffect, {
                    	sizeTo: 8,
                        strokeFrom: 1,
                        lifetime: 24,
                        colorFrom: Color.valueOf("ffe18f"),
                        colorTo: Color.valueOf("ffe18f"),
                        }),
                     extend(ParticleEffect, {
                     	particles: 1,
                         length: 0,
                         sizeFrom: 2,
                         sizeTo: 0,
                         lifetime: 30,
                         colorFrom: Color.valueOf("ffe18f"),
                         colorTo: Color.valueOf("574F00"),
                         region: "sapphirium-rhombus",
                      }),
                      extend(ParticleEffect, {
                      	startDelay: 12,
                     	particles: 1,
                         length: 0,
                         sizeFrom: 3,
                         sizeTo: 0,
                         lifetime: 15,
                         colorFrom: Color.valueOf("ffffff"),
                         colorTo: Color.valueOf("EBD700"),
                         region: "sapphirium-rhombus",
                      }),
                    );

const mawBulletWeapon = extend(Weapon, "sapphirium-maw-bullet-weapon", {
	x: 48 / 4,
	y: -10,
	reload: 60,
	shoot: extend(ShootPattern, {
		shots: 4,
		shotDelay: 4,
		}),
	recoil: 3,
	rotate: true,
	mirror: true,
	rotateSpeed: 2.5,
	rotationLimit: 180,
	ejectEffect: Fx.casing1,
	shootSound: Sounds.shootLocus,
	bullet: extend(BasicBulletType, {
		speed: 4,
		lifetime: 30,
		damage: 88,
		width: 8,
		height: 10,
		trailWidth: 2,
		trailLength: 5,
		buildingDamageMultiplier: 3,
		shootEffect: Fx.shootBigColor,
		smokeEffect: Fx.shootBigSmoke,
		backColor: Color.valueOf("ffe18f"),
		trailColor: Color.valueOf("ffe18f"),
		hitColor: Color.valueOf("ffe18f"),
		frontColor: Color.white,
		hitEffect: mawBullEffect,
        despawnEffect: mawBullEffect,
        status: statuses.weakened,
        statusDuration: 90,
        maxRange: 120,
        rangeOverride: 120,
        }),
      });
                      
const mawRegenAbility = extend(RegenAbility, {
	amount: 350 / 60,
	localized() {
   	return Core.bundle.get("ability.regen");
   },
   addStats(t){
   	this.super$addStats(t);
       t.row();
       t.add(Core.bundle.get("ability.regen.description")).wrap().width(350);
   }
});

var mawGlow = new RegionPart("-glow");
	mawGlow.progress = DrawPart.PartProgress.warmup;
	mawGlow.mirror = false;
	mawGlow.blending = Blending.additive;
	mawGlow.color = Color.valueOf("ffd37f70");

const maw = extend(ErekirUnitType, "maw", {
healColor: Pal.accent
});
maw.constructor = () => extend(MechUnit, {});
maw.weapons.addAll(mawLeftWeapon, mawRightWeapon, mawSpit, mawBulletWeapon, mawJaw);
maw.abilities.addAll(mawRegenAbility);
maw.parts.add(mawGlow);

//Faith faction
const phenomenon = extend(ErekirUnitType, "phenomenon", {});
phenomenon.constructor = () => extend(LegsUnit, {});

const loyalty = extend(ErekirUnitType, "loyalty", {});
loyalty.constructor = () => extend(LegsUnit, {});

const cult = extend(ErekirUnitType, "cult", {});
cult.constructor = () => extend(LegsUnit, {});

const penance = extend(ErekirUnitType, "penance", {});
penance.constructor = () => extend(LegsUnit, {});

const milestone = extend(ErekirUnitType, "milestone", {});
milestone.constructor = () => extend(LegsUnit, {});

//Ghosts
var slowdown = new Stat("slowdown");
var powerBuildings = new Stat("powerbuildings");

const presenceMainWeapon = extend(Weapon, "presence-main-weapon", {
    x: 0,
    y: 0,
    shootY: 0.5,
    reload: 38,
    recoil: 0,
    ejectEffect: Fx.none,
    mirror: false,
    shootSound: Sounds.shootMissile,
    bullet: extend(MissileBulletType, 4, 22, "large-orb", {
    	width: 7,
        height: 7,
        lifetime: 20,
        status: statuses.weakened,
        statusDuration: 67,
        splashDamage: 26,
        splashDamageRadius: 16,
        backColor: Color.valueOf("80808080"),
        frontColor: Color.valueOf("80808080"),
        trailColor: Color.valueOf("80808080"),
        trailEffect: extend(ParticleEffect, {
        	particles: 4,
            cone: 5,
            sizeFrom: 4,
            sizeTo: 0,
            colorFrom: Color.valueOf("80808080"),
            colorTo: Color.valueOf("80808080"),
            length: -40,
            lifetime: 45,
            interp: Interp.pow2Out,
            }),
        hitEffect: extend(ParticleEffect, {
        	particles: 6,
            cone: 360,
            sizeFrom: 4,
            sizeTo: 0,
            colorFrom: Color.valueOf("80808080"),
            colorTo: Color.valueOf("80808080"),
            length: 16,
            lifetime: 45,
            interp: Interp.pow2Out,
            sizeInterp: Interp.pow2Out
            }),
         despawnEffect: extend(ParticleEffect, {
        	particles: 6,
            cone: 360,
            sizeFrom: 4,
            sizeTo: 0,
            colorFrom: Color.valueOf("80808080"),
            colorTo: Color.valueOf("80808080"),
            length: 16,
            lifetime: 45,
            interp: Interp.pow2Out,
            sizeInterp: Interp.pow2Out
            }),
            hittable: false,
            absorbable: false,
            reflectable: false,
            homingPower: 0.08,
            removed(b){
            	this.super$removed(b);
            Units.nearbyBuildings(b.x, b.y, 2 * Vars.tilesize, other => {
			if(other.team != b.team && !other.block.insulated && !other.block.absorbLasers && other.block.targetable){
				if(other.block.hasItems || other.block.hasLiquids || other.block.hasPower){
                        other.applySlowdown(0.8, 67);
                    }
                    }
                    });
                    }
        })
});

const blurWeaponBullet = extend(BasicBulletType, {
    width: 0,
    height: 0,
    speed: 8,
    damage: 0,
    lifetime: 10,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    collides: false,
    collidesGround: false,
    collidesAir: false,
    collidesTiles: false,
    scaleLife: true,
});

const blurWeapon = extend(Weapon, "blur-weapon", {
    x: 0,
    y: 0,
    mirror: false,
    reload: 20,
    recoil: 0,
    ejectEffect: Fx.none,
    shootSound: Sounds.none,
    shootStatus: statuses.blur,
    shootStatusDuration: 999999,
    display: false,
    bullet: blurWeaponBullet,
    alwaysShooting: true,
    controllable: false,
    autoTarget: true,
});

const wraithWeaponBullet = extend(BasicBulletType, {
    width: 8,
    height: 8,
    speed: 5,
    damage: 0,
    lifetime: 6,
    sprite: "sapphirium-none-bullet",
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    maxRange: 30
});

const presenceWraithWeapon = extend(Weapon, "presence-wraith-weapon", {
    x: 0,
    y: 0,
    mirror: false,
    rotate: true,
    reload: 15,
    recoil: 0,
    ejectEffect: Fx.none,
    shootSound: Sounds.shootMissile,
    shootStatus: statuses.wraith,
    shootStatusDuration: 999999,
    display: false,
    bullet: wraithWeaponBullet,
    controllable: false,
    autoTarget: true,
});

const presenceMoveEffect = extend(MoveEffectAbility, {
	x: 20 / 4,
	y: -19 / 4,
	effect: extend(ParticleEffect, {
		particles: 5,
		cone: 360,
		sizeFrom: 4,
		sizeTo: 0,
		colorFrom: Color.gray,
		colorTo: Color.gray,
		lifetime: 36,
		interp: Interp.circleOut,
		length: 8,
		sizeInterp: Interp.circleOut,
		}),
	rotateEffect: true,
	interval: 3,
	});
	
const presenceMoveEffect2 = extend(MoveEffectAbility, {
	x: -20 / 4,
	y: -19 / 4,
	effect: extend(ParticleEffect, {
		particles: 5,
		cone: 360,
		sizeFrom: 4,
		sizeTo: 0,
		colorFrom: Color.gray,
		colorTo: Color.gray,
		lifetime: 36,
		interp: Interp.circleOut,
		length: 8,
		sizeInterp: Interp.circleOut,
		}),
	rotateEffect: true,
	interval: 3,
	});
	
const presence = extend(ErekirUnitType, "presence", {
    health: 0.9,
    armor: 6,
    speed: 2,
    rotateSpeed: 6,
    flying: true,
    drag: 0.07,
    accel: 0.09,
    hitSize: 9,
    engineSize: 0,
    trailLength: 10,
    lowAltitude: true,
    range: 72
});
presence.constructor = () => extend(UnitEntity, {});
presence.weapons.addAll(presenceMainWeapon, blurWeapon, presenceWraithWeapon);
presence.abilities.addAll(presenceMoveEffect, presenceMoveEffect2);
presence.setEnginesMirror(
    UnitType.UnitEngine(20 / 4, -19 / 4, 2.5, 315)
);

const apparitionWraithWeaponBullet = extend(BasicBulletType, {
    width: 8,
    height: 8,
    speed: 4.75,
    damage: 0,
    lifetime: 8,
    sprite: "sapphirium-none-bullet",
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    maxRange: 38
});

const apparitonWraithWeapon = extend(Weapon, "apparition-wraith-weapon", {
    x: 0,
    y: 0,
    mirror: false,
    rotate: true,
    reload: 15,
    recoil: 0,
    ejectEffect: Fx.none,
    shootSound: Sounds.none,
    shootStatus: statuses.wraith,
    shootStatusDuration: 999999,
    display: false,
    bullet: apparitionWraithWeaponBullet,
    controllable: false,
    autoTarget: true,
});

const apparitionWeapon = extend(Weapon, "apparition-weapon", {
    x: 0,
    y: 0,
    shootY: 0,
    reload: 38,
    recoil: 0,
    mirror: false,
    ejectEffect: Fx.none,
    shootSound: Sounds.shootMissile,
    shoot: extend(ShootPattern, {
    	shots: 3,
    }),
    inaccuracy: 3,
    bullet: extend(MissileBulletType, 4, 30, "large-orb", {
    	width: 7,
        height: 7,
        lifetime: 28,
        status: statuses.weakened,
        statusDuration: 67,
        splashDamage: 36,
        splashDamageRadius: 20,
        weaveScale: 3,
        weaveMag: 2,
        backColor: Color.valueOf("80808080"),
        frontColor: Color.valueOf("80808080"),
        trailColor: Color.valueOf("80808080"),
        trailRotation: true,
        trailEffect: extend(ParticleEffect, {
        	particles: 4,
            cone: 5,
            sizeFrom: 4,
            sizeTo: 0,
            colorFrom: Color.valueOf("80808080"),
            colorTo: Color.valueOf("80808080"),
            length: -40,
            lifetime: 45,
            interp: Interp.pow2Out,
            }),
        hitEffect: extend(ParticleEffect, {
        	particles: 6,
            cone: 360,
            sizeFrom: 4,
            sizeTo: 0,
            colorFrom: Color.valueOf("80808080"),
            colorTo: Color.valueOf("80808080"),
            length: 16,
            lifetime: 45,
            interp: Interp.pow2Out,
            sizeInterp: Interp.pow2Out
            }),
         despawnEffect: extend(ParticleEffect, {
        	particles: 6,
            cone: 360,
            sizeFrom: 4,
            sizeTo: 0,
            colorFrom: Color.valueOf("80808080"),
            colorTo: Color.valueOf("80808080"),
            length: 16,
            lifetime: 45,
            interp: Interp.pow2Out,
            sizeInterp: Interp.pow2Out
            }),
            hittable: false,
            absorbable: false,
            reflectable: false,
            homingPower: 0.08,
            removed(b){
            	this.super$removed(b);
            Units.nearbyBuildings(b.x, b.y, 20, other => {
			if(other.team != b.team && !other.block.insulated && !other.block.absorbLasers && other.block.targetable){
				if(other.block.hasItems || other.block.hasLiquids || other.block.hasPower){
                        other.applySlowdown(0.8, 67);
                    }
                    }
                    });
                    }
        })
});

const apparitionMoveEffect = extend(MoveEffectAbility, {
	x: 0,
	y: -8.75,
	effect: extend(ParticleEffect, {
		particles: 5,
		cone: 360,
		sizeFrom: 4,
		sizeTo: 0,
		colorFrom: Color.gray,
		colorTo: Color.gray,
		lifetime: 36,
		interp: Interp.circleOut,
		length: 8,
		sizeInterp: Interp.circleOut,
		}),
	rotateEffect: true,
	interval: 3,
	});

const apparition = extend(ErekirUnitType, "apparition", {
    health: 1.4,
    armor: 7,
    speed: 2.3,
    lowAltitude: true,
    rotateSpeed: 4,
    flying: true,
    drag: 0.07,
    accel: 0.09,
    hitSize: 14,
    engineOffset: 8.75,
    engineLayer: 89.8,
    engineSize: 3.5,
    range: 112
});
apparition.constructor = () => extend(UnitEntity, {});
apparition.immunities.add(statuses.unleash);
apparition.abilities.add(apparitionMoveEffect);
apparition.weapons.addAll(apparitionWeapon, blurWeapon, apparitonWraithWeapon);

const gripperWeapon = extend(Weapon, "sapphirium-gripper-weapon", {
    x: 40 / 4,
    y: -12 / 4,
    shootY: 0,
    reload: 30,
    recoil: 3,
    mirror: true,
    rotate: true,
    rotateSpeed: 5,
    shoot: extend(ShootSpread, {
    	shots: 3,
        spread: 5,
        }),
    bullet: extend(BasicBulletType, {
    	speed: 5.3,
    width: 9,
    height: 16,
    knockback: 3.5,
    shrinkY: 0,
    shrinkX: 0,
    trailWidth: 1.8,
    trailLength: 50,
    weaveMag:  1,
    weaveScale: 4,
    damage: 65,
    buildingDamageMultiplier: 1.5,
    backColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    hitColor: Color.valueOf("ff6e6e"),
    trailColor: Color.valueOf("ff6e6e"),
    hitEffect: Fx.hitBulletColor,
    despawnEffect: Fx.hitBulletColor,
    lifetime: 28.68,
    status: StatusEffects.slow,
    statusDuration: 120,
    
    removed(b){
    	this.super$removed(b);
    	Units.nearbyBuildings(b.x, b.y, 3 * Vars.tilesize, other => {
			if(other.team != b.team && !other.block.insulated && !other.block.absorbLasers && other.block.targetable){
				if(other.block.hasItems || other.block.hasLiquids || other.block.hasPower){
					var absorber = Damage.findAbsorber(b.team, b.x, b.y, other.x, other.y);
                    if(absorber != null){
                        other = absorber;
                    }
                        other.applySlowdown(0.75, 60);
                        if(other.power != null && other.block.hasPower){
                        	other.damage(this.damage * 2);
                        }
                        Fx.hitBulletColor.at(other.x, other.y, b.angleTo(other), this.hitColor);
                        Fx.chainEmp.at(b.x, b.y, 0, Color.valueOf("ff6e6e"), other);
                    }
                  }
            });
      }
      }),
    shootSound: Sounds.shootLocus,
    addStats(u, t){
    	this.super$addStats(u, t);
    t.add("[accent]" + 25 + "[lightgray]" + "%" + " [lightgray]" + slowdown.localized() + " ~ " + "[accent]" + 4 + "[lightgray] " + StatUnit.blocks.localized());
    t.row();
    t.add("[accent]" + "+" + 100 + "[lightgray]" + "% " + powerBuildings.localized());
    }
});

const gripperCenterWeapon = extend(Weapon, "gripper-center-weapon", {
    x: 0,
    y: 12 / 4,
    shootY: 0,
    recoil: 0,
    mirror: false,
    alternate: false,
    ejectEffect: Fx.none,
    continuous: true,
    alwaysContinuous: true,
    bullet: extend(ContinuousFlameBulletType, {
        length: 85,
        lifetime: 60,
        maxRange: 85,
        rangeOverride: 85,
        damage: 5,
        colors: [Color.valueOf("ff6e6e55"), Color.valueOf("ff6e6e70"), Color.valueOf("ff6e6e80"), Color.valueOf("ff6e6e"), Color.white],
        knockback: 2,
        pierceCap: 2,
        flareColor: Color.valueOf("ff6e6e"),
        hitColor: Color.valueOf("ff6e6e")
        }),
    shootSound: Sounds.shootSublimate
});

const gripperWraithBullet = extend(BasicBulletType, {
    width: 8,
    height: 8,
    speed: 8,
    damage: 0,
    sprite: "sapphirium-none-bullet",
    lifetime: 12.75,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    maxRange: 102
});

const gripperWraithWeapon = extend(Weapon, "gripper-wraith-weapon", {
    x: 0,
    y: 0,
    mirror: false,
    rotate: true,
    reload: 15,
    recoil: 0,
    ejectEffect: Fx.none,
    shootSound: Sounds.none,
    shootStatus: statuses.wraith,
    shootStatusDuration: 999999,
    display: false,
    bullet: gripperWraithBullet,
    controllable: false,
    autoTarget: true,
});

const gripperMoveEffect = extend(MoveEffectAbility, {
	x: 0,
	y: -50 / 4,
	effect: extend(ParticleEffect, {
		particles: 5,
		cone: 360,
		sizeFrom: 4,
		sizeTo: 0,
		colorFrom: Color.gray,
		colorTo: Color.gray,
		lifetime: 36,
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut,
		length: 8,
		}),
	rotateEffect: true,
	interval: 3,
	});
	
const gripperMoveEffectRight = extend(MoveEffectAbility, {
	x: 35 / 4,
	y: -47 / 4,
	effect: extend(ParticleEffect, {
		particles: 5,
		cone: 360,
		sizeFrom: 4,
		sizeTo: 0,
		colorFrom: Color.gray,
		colorTo: Color.gray,
		lifetime: 36,
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut,
		length: 8,
		}),
	rotateEffect: true,
	interval: 1,
	parentizeEffects: true,
	});

const gripperMoveEffectLeft = extend(MoveEffectAbility, {
	x: -35 / 4,
	y: -47 / 4,
	effect: extend(ParticleEffect, {
		particles: 5,
		cone: 360,
		sizeFrom: 4,
		sizeTo: 0,
		colorFrom: Color.gray,
		colorTo: Color.gray,
		lifetime: 36,
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut,
		length: 8,
		}),
	rotateEffect: true,
	interval: 3,
	});
	
const gripperMoveEffectRight2 = extend(MoveEffectAbility, {
	x: 54 / 4,
	y: -26 / 4,
	effect: extend(ParticleEffect, {
		particles: 5,
		cone: 360,
		sizeFrom: 4,
		sizeTo: 0,
		colorFrom: Color.gray,
		colorTo: Color.gray,
		lifetime: 36,
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut,
		length: 8,
		}),
	rotateEffect: true,
	interval: 3,
	});
	
const gripperMoveEffectLeft2 = extend(MoveEffectAbility, {
	x: -54 / 4,
	y: -26 / 4,
	effect: extend(ParticleEffect, {
		particles: 5,
		length: 8,
		cone: 360,
		sizeFrom: 4,
		sizeTo: 0,
		colorFrom: Color.gray,
		colorTo: Color.gray,
		lifetime: 36,
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut,
		}),
	rotateEffect: true,
	interval: 3,
	});

const gripper = extend(ErekirUnitType, "gripper", {
	health: 7400,
	armor: 16,
	speed: 2,
	drag: 0.07,
	accel: 0.09,
	rotateSpeed: 3,
	flying: true,
	lowAltitude: true,
    range: 152,
    engineOffset: 50 / 4,
    engineSize: 12 / 4,
    hitSize: 25
});
gripper.constructor = () => extend(UnitEntity, {});
gripper.immunities.add(statuses.unleash);
gripper.abilities.addAll(gripperMoveEffect, gripperMoveEffectRight, gripperMoveEffectLeft, gripperMoveEffectRight2, gripperMoveEffectLeft2);
gripper.weapons.addAll(gripperWeapon, gripperCenterWeapon, blurWeapon, gripperWraithWeapon);
gripper.setEnginesMirror(
    UnitType.UnitEngine(35 / 4, -47 / 4, 12 / 4, 315),
    UnitType.UnitEngine(54 / 4, -26 / 4, 12 / 4, 315)
);

//4
const oozeOpressionEffect = extend(WaveEffect, {
    lifetime: 70,
    interp: Interp.circleOut,
    sizeInterp: Interp.circleOut,
    sizeTo: 100,
    strokeFrom: 4.5,
    strokeTo: 0,
    colorFrom: Color.valueOf("ff6e6e"),
    colorTo: Color.valueOf("ff6e6e")
});

const oozeOrbTrail = extend(ParticleEffect, {
    region: "sapphirium-rhombus",
    particles: 5,
    length: -16,
    lifetime: 30,
    cone: 5,
    sizeFrom: 4,
    sizeTo: 0,
    interp: Interp.pow2Out,
    rotWithParent: true,
    colorFrom: Color.valueOf("ff6e6e"),
    colorTo: Color.valueOf("ff6e6e00")
});

const oozeOrb = extend(BasicBulletType, {
    speed: 5,
    width: 10,
    height: 10,
    knockback: 2.7,
    shrinkY: 0,
    shrinkX: 0,
    damage: 130,
    buildingDamageMultiplier: 0.85,
    backColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    hitColor: Color.valueOf("ff6e6e"),
    trailColor: Color.valueOf("ff6e6e"),
    hitEffect: new MultiEffect(Fx.hitSquaresColor, Fx.hitBulletColor),
    despawnEffect: new MultiEffect(Fx.hitSquaresColor, Fx.hitBulletColor),
    sprite: "large-orb",
    lifetime: 30.5,
    trailLength: 24,
    trailWidth: 2.5,
    status: StatusEffects.slow,
    statusDuration: 120,
    pierce: true,
    pierceBuilding: true,
    pierceCap: 2,
    collidesAir: false,
    
    removed(b){
    	this.super$removed(b);
    	Units.nearbyBuildings(b.x, b.y, 4 * Vars.tilesize, other => {
			if(other.team != b.team && !other.block.insulated && !other.block.absorbLasers && other.block.targetable){
				if(other.block.hasItems || other.block.hasLiquids || other.block.hasPower){
					var absorber = Damage.findAbsorber(b.team, b.x, b.y, other.x, other.y);
                    if(absorber != null){
                        other = absorber;
                    }
                        other.applySlowdown(0.75, 120);
                        if(other.power != null && other.block.hasPower){
                        	other.damage(this.damage * 2);
                        }
                        Fx.hitBulletColor.at(other.x, other.y, b.angleTo(other), this.hitColor);
                        Fx.chainEmp.at(b.x, b.y, 0, Color.valueOf("ff6e6e"), other);
                    }
                  }
            });
      }
});

const oozeOrb2 = extend(BasicBulletType, {
    speed: 5,
    width: 8,
    height: 8,
    knockback: 2.7,
    shrinkY: 0,
    shrinkX: 0,
    trailWidth: 2,
    trailLength: 100,
    damage: 65,
    buildingDamageMultiplier: 1.2,
    backColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    hitColor: Color.valueOf("ff6e6e"),
    trailColor: Color.valueOf("ff6e6e"),
    hitEffect: new MultiEffect(Fx.hitSquaresColor, Fx.hitBulletColor),
    despawnEffect: new MultiEffect(Fx.hitSquaresColor, Fx.hitBulletColor),
    sprite: "large-orb",
    lifetime: 30.5,
    status: StatusEffects.slow,
    statusDuration: 120,
    collidesAir: false,
});

const oozeWeapon = extend(Weapon, "sapphirium-ooze-weapon", {
    x: 62 / 4,
    y: 34 / 4,
    shootY: 0,
    reload: 120,
    shoot: extend(ShootPattern, {
    	shots: 4,
        shotDelay: 3
        }),
    recoil: 3,
    mirror: true,
    rotate: true,
    rotateSpeed: 2,
    rotationLimit: 30,
    ejectEffect: Fx.none,
    bullet: oozeOrb,
    layerOffset: -0.01,
    shootSound: Sounds.shootBeamPlasma,
    inaccuracy: 5,
    
    addStats(u, t){
    	this.super$addStats(u, t);
    t.add("[accent]" + 25 + "[lightgray]" + "%" + " [lightgray]" + slowdown.localized() + " ~ " + "[accent]" + 4 + "[lightgray] " + StatUnit.blocks.localized());
    t.row();
    t.add("[accent]" + "+" + 100 + "[lightgray]" + "% " + powerBuildings.localized());
    }
});

const oozeWeaponSec = extend(Weapon, "sapphirium-gripper-weapon", {
    x: 50 / 4,
    y: -10 / 4,
    shootY: 0,
    reload: 30,
    shoot: extend(ShootPattern, {
    	shots: 2,
        shotDelay: 3
        }),
    recoil: 3,
    mirror: true,
    rotate: true,
    rotateSpeed: 4,
    ejectEffect: Fx.none,
    bullet: oozeOrb2,
    shootSound: Sounds.shootLocus
});

const oozeShell = extend(BasicBulletType, {
    speed: 30,
    width: 16,
    height: 16,
    pierce: true,
    pierceBuilding: true,
    pierceCap: 2,
    damage: 10,
    buildingDamageMultiplier: 30,
    backColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    hitColor: Color.valueOf("ff6e6e"),
    hitEffect: new MultiEffect(Fx.hitSquaresColor, Fx.hitBulletColor),
    despawnEffect: new MultiEffect(Fx.hitSquaresColor, Fx.hitBulletColor),
    sprite: "large-orb",
    lifetime: 5.35,
    status: statuses.truesight,
    statusDuration: 120,
    shrinkY: 0,
    shrinkX: 0,
    trailWidth: 3,
    trailLength: 400,
    trailEffect: extend(ParticleEffect, {
    	particles: 1,
        length: 0,
        rotWithParent: true,
        lifetime: 16,
        region: "sapphirium-double-trail",
        sizeFrom: 25,
        baseRotation: 90,
        sizeTo: 5,
        colorFrom: Color.valueOf("ff6e6e"),
        colorTo: Color.valueOf("ff6e6e00"),
        }),
        trailRotation: true,
    collidesAir: false,
    trailChance: 0.5,
    trailColor: Color.valueOf("ff6e6e"),
    fragOnHit: false,
    fragRandomSpread: 0,
    fragBullet: extend(BasicBulletType, {
    speed: 0,
    width: 16,
    height: 16,
    pierce: true,
    pierceBuilding: true,
    pierceCap: 2,
    damage: 10,
    buildingDamageMultiplier: 30,
    splashDamage: 10,
    splashDamageRadius: 32,
    backColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    hitColor: Color.valueOf("ff6e6e"),
    hitEffect: new MultiEffect(Fx.hitSquaresColor, Fx.hitBulletColor),
    despawnEffect: new MultiEffect(Fx.hitSquaresColor, Fx.hitBulletColor),
    sprite: "large-orb",
    lifetime: 10,
    shrinkY: 0,
    shrinkX: 0,
    collidesAir: false,
    })
});

const oozeCenterWeapon = extend(Weapon, "ooze-center-weapon", {
    x: 0,
    y: -14 / 4,
    shootY: 0,
    reload: 300,
    recoil: 0,
    mirror: false,
    rotateSpeed: 0.6,
    ejectEffect: Fx.none,
    bullet: oozeShell,
    shootSound: Sounds.shootLocus
});

const oozeWraithBullet = extend(BasicBulletType, {
    width: 0,
    height: 0,
    speed: 5,
    damage: 0,
    sprite: "sapphirium-none-bullet",
    lifetime: 19.2,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    maxRange: 109
});

const oozeWraithWeapon = extend(Weapon, "ooze-wraith-weapon", {
    x: 0,
    y: 0,
    mirror: false,
    rotate: true,
    reload: 15,
    recoil: 0,
    ejectEffect: Fx.none,
    shootSound: Sounds.none,
    shootStatus: statuses.wraith,
    shootStatusDuration: 999999,
    display: false,
    bullet: oozeWraithBullet,
    controllable: false,
    autoTarget: true
});

const oozeOpressionWave = extend(ExplosionBulletType, {
    splashDamage: 120,
    buildingDamageMultiplier: 0,
    splashDamageRadius: 100,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    killShooter: false
});

const oppressionFieldAbility = extend(Ability, {
	update(unit){
		timer += Time.delta
		
		if(timer >= 102) {
            Units.nearbyEnemies(unit.team, unit.x, unit.y, 176, other => {
                oozeOpressionWave.create(unit, unit.team, unit.x, unit.y, unit.rotation);
                oozeOpressionEffect.at(unit.x, unit.y, unit.rotation);
                other.apply(StatusEffects.slow, 60);
            });
            
            timer = 0;
        }
    },
    addStats(t) {
    	t.add(Core.bundle.get("ability." + "opressionfield" + ".description")).wrap().width(350);
		t.row();
    	t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / 102, 2) + " " + StatUnit.perSecond.localized());
        t.row();
    	t.add(Core.bundle.format("bullet.splashdamage", 120, Strings.fixed(100 / Vars.tilesize, 1)));
        t.row();
        t.add(StatusEffects.slow.emoji() + " " + StatusEffects.slow.localizedName);
    },
   localized() {
   	return Core.bundle.get("ability." + "opressionfield");
   }
});

const redSphere = extend(ShapePart, {
   circle: true,
   radius: 13 / 4,
   layer: Layer.effect,
   x: 0,
   y: -14 / 4,
   color: Color.valueOf("ff6e6e"),
});

const ooze = extend(ErekirUnitType, "ooze", {
	health: 12000,
	armor: 23,
	speed: 0.6,
	drag: 0.02,
	accel: 0.06,
	rotateSpeed: 0.9,
	flying: true,
	lowAltitude: true,
    range: 152,
    engineOffset: 50 / 4,
    engineSize: 12 / 4,
    hitSize: 38,
    targetAir: false,
});

ooze.constructor = () => extend(UnitEntity, {});
ooze.immunities.addAll(statuses.unleash, statuses.truesight);
ooze.weapons.addAll(oozeWeapon, oozeWeaponSec, oozeCenterWeapon, blurWeapon, oozeWraithWeapon);
ooze.abilities.addAll(oppressionFieldAbility);
ooze.parts.addAll(redSphere);
ooze.setEnginesMirror(
    UnitType.UnitEngine(74 / 4, -30 / 4, 16 / 4, 315),
    UnitType.UnitEngine(-74 / 4, -30 / 4, 16 / 4, 315),
    UnitType.UnitEngine(0 / 4, -62 / 4, 24 / 4, 90)
);

const frontWeapBull = extend(BasicBulletType, 6, 84, "shell", {
    	lifetime: 300 / 6,
        width: 14,
        height: 18,
        trailWidth: 3.5,
        trailLength: 24,
        pierce: true,
        pierceBuilding: true,
        pierceCap: 4,
        knockback: 3,
        backColor: Color.valueOf("ff6e6e"),
        trailColor: Color.valueOf("ff6e6e"),
        frontColor: Color.white,
        hitColor: Color.valueOf("ff6e6e"),
        shootEffect: Fx.shootBigColor,
        hitEffect: extend(ExplosionEffect, {
        	waveLife: 8,
            waveRad: 16,
            waveColor: Color.valueOf("ff6e6e"),
            sparks: 6,
            sparkRad: 20,
            sparkLen: 5,
            sparkColor: Color.valueOf("ff6e6e"),
            sparkStroke: 2,
            smokes: 0,
            lifetime: 30,
            }),
    despawnEffect: extend(ExplosionEffect, {
        	waveLife: 8,
            waveRad: 16,
            waveColor: Color.valueOf("ff6e6e"),
            sparks: 6,
            sparkRad: 20,
            sparkLen: 5,
            sparkColor: Color.valueOf("ff6e6e"),
            sparkStroke: 2,
            smokes: 0,
            lifetime: 30,
            }),
            });
for(var i = 0; i < 2; i++){
frontWeapBull.spawnBullets.add(extend(BasicBulletType, 6, 34, "large-orb", {
    	lifetime: 300 / 6,
        width: 7,
        height: 7,
        trailChance: 0.5,
        trailEffect: Fx.missileTrail,
        splashDamage: 38,
        splashDamageRadius: 24,
        weaveScale: i * 4,
        weaveMag: i * 8,
        knockback: 3,
        backColor: Color.valueOf("ff6e6e"),
        trailColor: Color.valueOf("ff6e6e"),
        frontColor: Color.white,
        hitColor: Color.valueOf("ff6e6e"),
        shootEffect: Fx.shootBigColor,
        hitEffect: extend(ExplosionEffect, {
        	waveLife: 8,
            waveRad: 16,
            waveColor: Color.valueOf("ff6e6e"),
            sparks: 6,
            sparkRad: 20,
            sparkLen: 5,
            sparkColor: Color.valueOf("ff6e6e"),
            sparkStroke: 2,
            smokes: 6,
            smokeSize: 5,
            smokeRad: 20,
            smokeColor: Color.valueOf("ff6e6e70"),
            lifetime: 30,
            }),
    despawnEffect: extend(ExplosionEffect, {
        	waveLife: 8,
            waveRad: 16,
            waveColor: Color.valueOf("ff6e6e"),
            sparks: 6,
            sparkRad: 20,
            sparkLen: 5,
            sparkColor: Color.valueOf("ff6e6e"),
            sparkStroke: 2,
            smokes: 6,
            smokeSize: 5,
            smokeRad: 20,
            smokeColor: Color.valueOf("ff6e6e70"),
            lifetime: 30,
            }),
            }));
}
const gazeFrontWeapon = extend(Weapon, "sapphirium-ooze-weapon", {
    x: 78 / 4,
    y: 56 / 4,
    shootY: 0,
    recoil: 3,
    mirror: true,
    rotate: true,
    reload: 30,
    rotateSpeed: 2,
    rotationLimit: 30,
    ejectEffect: Fx.none,
    bullet: frontWeapBull,
    layerOffset: -0.01,
    shootSound: Sounds.shootBeamPlasma,
});

const gazeOrb = extend(BasicBulletType, {
    speed: 30,
    width: 12,
    height: 12,
    knockback: 2.7,
    shrinkY: 0,
    shrinkX: 0,
    damage: 80,
    splashDamage: 120,
    splashDamageRadius: 32,
    trailRotation: true,
    trailEffect: extend(ParticleEffect, {
    	particles: 1,
        length: 0,
        rotWithParent: true,
        lifetime: 16,
        region: "sapphirium-double-trail",
        sizeFrom: 25,
        baseRotation: 90,
        sizeTo: 5,
        colorFrom: Color.valueOf("ff6e6e"),
        colorTo: Color.valueOf("ff6e6e00"),
        }),
    backColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    hitColor: Color.valueOf("ff6e6e"),
    trailColor: Color.valueOf("ff6e6e"),
    shootEffect: Fx.shootBigColor,
    hitEffect: new MultiEffect(Fx.hitSquaresColor, Fx.hitBulletColor),
    despawnEffect: new MultiEffect(Fx.hitSquaresColor, Fx.hitBulletColor),
    sprite: "large-orb",
    lifetime: 10.67,
    trailChance: 0.8,
    trailLength: 24,
    trailWidth: 3,
    status: StatusEffects.slow,
    statusDuration: 160,
    pierce: true,
    pierceBuilding: true,
    pierceCap: 3,
    collidesAir: false,
    
    removed(b){
    	this.super$removed(b);
    	Units.nearbyBuildings(b.x, b.y, 4 * Vars.tilesize, other => {
			if(other.team != b.team && !other.block.insulated && !other.block.absorbLasers && other.block.targetable){
				if(other.block.hasItems || other.block.hasLiquids || other.block.hasPower){
					var absorber = Damage.findAbsorber(b.team, b.x, b.y, other.x, other.y);
                    if(absorber != null){
                        other = absorber;
                    }
                        other.applySlowdown(0.75, 160);
                        if(other.power != null && other.block.hasPower){
                        	other.damage(this.damage * 2);
                        }
                        Fx.hitBulletColor.at(other.x, other.y, b.angleTo(other), this.hitColor);
                        Fx.chainEmp.at(b.x, b.y, 0, Color.valueOf("ff6e6e"), other);
                    }
                  }
            });
      }
});

const gazeBackWeapon = extend(Weapon, "sapphirium-ooze-weapon", {
    x: 76 / 4,
    y: -55 / 4,
    shootY: 0,
    reload: 120,
    recoil: 3,
    mirror: true,
    rotate: true,
    rotateSpeed: 2,
    ejectEffect: Fx.none,
    bullet: gazeOrb,
    shootSound: Sounds.shootBeamPlasma,
    
    addStats(u, t){
    	this.super$addStats(u, t);
    t.add("[accent]" + 25 + "[lightgray]" + "%" + " [lightgray]" + slowdown.localized() + " ~ " + "[accent]" + 4 + "[lightgray] " + StatUnit.blocks.localized());
    t.row();
    t.add("[accent]" + "+" + 100 + "[lightgray]" + "% " + powerBuildings.localized());
    }
});

var gazeProjectilePierce = extend(ParticleEffect, {
	region: "sapphirium-pierce-effect",
	lifetime: 18,
	sizeFrom: 30,
	sizeTo: 0,
	cone: 0,
	length: 0,
	colorFrom: Color.valueOf("ff6e6e"),
	colorTo: Color.valueOf("ff6e6e"),
});

const gazeCenterWeapon = extend(Weapon, "sapphirium-gaze-weapon", {
    x: 0,
    y: 33 / 4,
    shootY: -1,
    reload: 360,
    recoil: 4,
    recoilTime: 280,
    mirror: false,
    rotateSpeed: 0.5,
    ejectEffect: Fx.none,
    bullet: extend(LaserBulletType, {
    	length: 352,
        width: 50,
        sideWidth: 9,
        sideAngle: 45,
        lifetime: 60,
        drawSize: 500,
        colors: [Color.valueOf("ff6e6e70"), Color.valueOf("ff6e6e"), Color.white],
        damage: 33,
        buildingDamageMultiplier: 12,
        pierceCap: 2,
        removeAfterPierce: true,
        status: statuses.truesight,
        statusDuration: 360,
        hitColor: Color.valueOf("ff6e6e")
        }),
    shootSound: Sounds.shootLancer,
});

const gazeWraithBullet = extend(BasicBulletType, {
    width: 0,
    height: 0,
    speed: 5,
    damage: 0,
    sprite: "sapphirium-none-bullet",
    lifetime: 22.4,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    maxRange: 112
});

const gazeWraithWeapon = extend(Weapon, "gaze-wraith-weapon", {
    x: 0,
    y: 0,
    mirror: false,
    rotate: true,
    reload: 15,
    recoil: 0,
    ejectEffect: Fx.none,
    shootSound: Sounds.none,
    shootStatus: statuses.wraith,
    shootStatusDuration: 999999,
    display: false,
    bullet: gazeWraithBullet,
    controllable: false,
    autoTarget: true
});

const gazeOpressionEffect = extend(WaveEffect, {
    lifetime: 70,
    interp: Interp.circleOut,
    sizeInterp: Interp.circleOut,
    sizeTo: 192,
    strokeFrom: 4.5,
    strokeTo: 0,
    colorFrom: Color.valueOf("ff6e6e"),
    colorTo: Color.valueOf("ff6e6e")
});

const gazeOpressionWave = extend(ExplosionBulletType, {
    splashDamage: 45,
    buildingDamageMultiplier: 0,
    splashDamageRadius: 192,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    killShooter: false
});

const gazeOppresionField = extend(Ability, {
	update(unit){
		timer += Time.delta
		
		if(timer >= 78) {
            Units.nearbyEnemies(unit.team, unit.x, unit.y, 192, other => {
                gazeOpressionWave.create(unit, unit.team, unit.x, unit.y, unit.rotation);
                gazeOpressionEffect.at(unit.x, unit.y, unit.rotation);
                other.apply(StatusEffects.slow, 60);
            });
            
            timer = 0;
        }
    },
    addStats(t) {
    	t.add(Core.bundle.get("ability." + "opressionfield" + ".description")).wrap().width(350);
		t.row();
    	t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / 78, 2) + " " + StatUnit.perSecond.localized());
        t.row();
    	t.add(Core.bundle.format("bullet.splashdamage", 45, Strings.fixed(192 / Vars.tilesize, 1)));
        t.row();
        t.add(StatusEffects.slow.emoji() + " [stat]" + StatusEffects.slow.localizedName + "[lightgray] ~ [stat]" + (60 / 60) + " " + StatUnit.seconds.localized());
    },
   localized() {
   	return Core.bundle.get("ability." + "opressionfield");
   }
});

const gaze = extend(ErekirUnitType, "gaze", {
	health: 16000,
	armor: 29,
	speed: 0.4,
	drag: 0.02,
	accel: 0.06,
	rotateSpeed: 0.8,
	flying: true,
	lowAltitude: true,
	range: 320,
	engineSize: 15 / 4,
	engineOffset: 97 / 4,
	hitSize: 54,
	targetAir: false
});
gaze.constructor = () => extend(UnitEntity, {});
gaze.abilities.addAll(gazeOppresionField);
gaze.immunities.addAll(statuses.shockStun, statuses.unleash, statuses.truesight);
gaze.weapons.addAll(blurWeapon, gazeWraithWeapon, gazeCenterWeapon, gazeFrontWeapon, gazeBackWeapon);

//Core
var blueHeal = new Effect(11, e => {
    Draw.color(Color.valueOf("d1efff"));
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, 2 + e.finpow() * 7);
});
var blueHealWave = new Effect(22, e => {
    Draw.color(Color.valueOf("d1efff"));
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, 4 + e.finpow() * 60);
});
var blueHealWaveBig = new Effect(33, e => {
    Draw.color(Color.valueOf("d1efff"));
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, 6 + e.finpow() * (15 * Vars.tilesize));
});
var blueSquares = extend(ParticleEffect, {
	particles: 16,
	length: 15 * Vars.tilesize,
	cone: 360,
	lifetime: 80,
	sizeFrom: 8,
	sizeTo: 0,
	region: "sapphirium-rhombus",
	colorFrom: Color.valueOf("d1efff"),
	colorTo: Color.valueOf("d1efff")
});
var blueMulti = new MultiEffect(blueHealWaveBig, blueSquares);
var repairField = extend(RepairFieldAbility, 40, 60 * 7, 60, {
    healEffect: blueHeal,
    activeEffect: blueHealWave,
    localized() {
        return Core.bundle.get("ability.repairfield");
        }
});

var unitHealAmount = 60;
var blockHealPercent = 0.3;
var healRange = 15 * Vars.tilesize;

var unitHeal = new Stat("unitheal");
var blockHeal = new Stat("blockheal");
var healthUnits = new StatUnit("healthUnits");

var repairWave = extend(Ability, {
	death(unit) {
        let wasHealed = false;

        Units.nearby(unit.team, unit.x, unit.y, healRange, other => {
            if(other.damaged()) {
                blueHeal.at(other, false);
                wasHealed = true;
            }
            other.heal(unitHealAmount);
        });
        
        if(wasHealed) {
            blueMulti.at(unit, healRange);
        }
        
        Units.nearbyBuildings(unit.x, unit.y, healRange, other => {
            if(other.team == unit.team && other.damaged() && !other.checkSuppression() && !other.isHealSuppressed()) {
                other.heal(other.maxHealth * blockHealPercent);
                other.recentlyHealed();
                Fx.healBlockFull.at(other.x, other.y, other.block.size, Color.valueOf("d1efff"), other.block);
            }
        });
    },
    addStats(t) {
    	t.add(Core.bundle.get("ability." + "repairwave" + ".description")).wrap().width(350);
		t.row();
        t.add("[lightgray]" + unitHeal.localized() + ": [white]" + unitHealAmount + " " + healthUnits.localized());
        t.row();
        t.add("[lightgray]" + blockHeal.localized() + ": [white]" + (blockHealPercent * 100) + StatUnit.percent.localized());
        t.row();
        t.add("[lightgray]" + Stat.shootRange.localized() + ": [white]" +  Strings.autoFixed(healRange / Vars.tilesize, 2) + " " + StatUnit.blocks.localized());
    },
    localized() {
    	return Core.bundle.get("ability." + "repairwave");
    }
});

const firmament = extend(ErekirUnitType, "firmament", {
    engineColor: Color.valueOf("d1efff")
});
firmament.constructor = () => extend(PayloadUnit, {});
firmament.payloadCapacity = (2* 2) * Vars.tilePayload;
firmament.abilities.addAll(repairField, repairWave);
firmament.setEnginesMirror(
    UnitType.UnitEngine(25 / 4, -31 / 4, 10 / 4, 315),
    UnitType.UnitEngine(40 / 4, -15 / 4, 10 / 4, 315)
);

var highSpeedWave = extend(WaveEffect, {
    sides: 0,
    sizeFrom: 0,
    sizeTo: 28,
    strokeFrom: 5,
    strokeTo: 0,
    lifetime: 80,
    colorFrom: Color.valueOf("c093fa"),
    colorTo: Color.valueOf("c093fa"),
});
	
var highSpeedField = extend(StatusFieldAbility, statuses.highSpeed, 180, 480, 28, {
	applyEffect: Fx.none,
	activeEffect: highSpeedWave,
	parentizeEffects: true,
	localized() {
		return Core.bundle.get("ability.statusfield");
	}
});
var sappingWave = new Effect(80, e => {
    Draw.color(Pal.sap.cpy());
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, 4 + e.finpow() * 80);
});
var sappingParticles = extend(ParticleEffect, {
	particles: 16,
	cone: 360,
	interp: Interp.circleOut,
	lifetime: 100,
	sizeFrom: 5,
	sizeTo: 0,
	colorFrom: Pal.sap.cpy(),
	colorTo: Pal.sap.cpy(),
	length: 80,
});

var multiSapping = new MultiEffect(sappingWave, sappingParticles);
var timer = 1;
var status = StatusEffects.sapped;
var sappingField = extend(Ability, {
	update(unit){
        timer += Time.delta;

        if(timer >= 180) {
            Units.nearbyEnemies(unit.team, unit.x, unit.y, 80, other => {
                other.apply(status, 60);
                var x = unit.x + Angles.trnsx(unit.rotation, 0, 0);
                var y = unit.y + Angles.trnsy(unit.rotation, 0, 0);
                multiSapping.at(x, y, true ? 80 : unit.rotation, true ? unit : null);
            });
            timer = 0;
        }
    },
    addStats(t) {
    	t.add(Core.bundle.get("ability." + "sappingfield" + ".description")).wrap().width(350);
		t.row();
    	t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / 180, 2) + " " + StatUnit.perSecond.localized());
        t.row();
        t.add("[lightgray]" + Stat.shootRange.localized() + ": [white]" +  Strings.autoFixed(80 / Vars.tilesize, 2) + " " + StatUnit.blocks.localized());
        t.row();
        t.add(status.emoji() + "[stat]" + status.localizedName + "[lightgray] ~ [stat]" + (60 / 60) + "[lightgray]" + Core.bundle.get("unit.seconds"));
    },
   localized() {
   	return Core.bundle.get("ability." + "sappingfield");
   }
});

var status2 = statuses.paganism;
var accentWave = new Effect(80, e => {
    Draw.color(Pal.accent.cpy());
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, 4 + e.finpow() * 80);
});
var paganismField = extend(Ability, {
	update(unit){
        timer += Time.delta;

        if(timer >= 180) {
            Units.nearbyEnemies(unit.team, unit.x, unit.y, 80, other => {
                other.apply(status2, 60);
                var x = unit.x + Angles.trnsx(unit.rotation, 0, 0);
                var y = unit.y + Angles.trnsy(unit.rotation, 0, 0);
                accentWave.at(x, y, true ? 80 : unit.rotation, true ? unit : null);
            });

            timer = 0;
        }
    },
    addStats(t) {
    	t.add(Core.bundle.get("ability." + "paganismfield" + ".description")).wrap().width(350);
		t.row();
    	t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / 180, 2) + " " + StatUnit.perSecond.localized());
        t.row();
        t.add("[lightgray]" + Stat.shootRange.localized() + ": [white]" +  Strings.autoFixed(80 / Vars.tilesize, 2) + " " + StatUnit.blocks.localized());
        t.row();
        t.add(status2.emoji() + "[stat]" + status2.localizedName + "[lightgray] ~ [stat]" + (60 / 60) + "[lightgray]" + Core.bundle.get("unit.seconds"));
    },
   localized() {
   	return Core.bundle.get("ability." + "paganismfield");
   }
});

const aspiration = extend(ErekirUnitType, "aspiration", {});
aspiration.constructor = () => extend(PayloadUnit, {});
aspiration.payloadCapacity = (2 * 2) * Vars.tilePayload;
aspiration.abilities.addAll(highSpeedField, sappingField, paganismField);

var skySparks = extend(ParticleEffect, {
                    	particles: 1,
                        cone: 5,
                        lifetime: 45,
                        line: true,
                        length: 15,
                        lenFrom: 10,
                        lenTo: 0,
                        interp: Interp.pow2Out,
                        strokeTo: 0,
                        colorFrom: Color.sky,
                        colorTo: Color.sky,
                     });

const murderBomb = extend(Weapon, "murder-bomb", {
	x: 0,
	y: 0,
	rotate: false,
	mirror: false,
	reload: 600,
	shootCone: 360,
	shootSound: Sounds.blockExplodeElectric,
	shake: 4,
	ignoreRotation: true,
	bullet: extend(ExplosionBulletType, {
		splashDamage: 200,
		splashDamageRadius: 10 * Vars.tilesize,
		scaledSplashDamage: true,
		splashDamagePierce: true,
		shootEffect: extend(ExplosionEffect, {
			waveRad: 80,
			waveLife: 10,
			waveColor: Color.sky,
			sparks: 8,
			sparkRad: 85,
			smokes: 8,
			smokeColor: Color.sky,
			smokeRad: 85,
		}),
		fragBullets: 4,
		fragRandomSpread: 0,
		fragSpread: 90,
		fragBullet: extend(ShrapnelBulletType, {
			length: 40,
			damage: 40,
			buildingDamageMultiplier: 4,
			width: 8,
			toColor: Color.sky,
			status: statuses.shockStun,
			statusDuration: 180,
		}),
		despawned(b){
			this.super$despawned(b);
			Units.nearbyBuildings(b.x, b.y, 80, other => {
				if(other.team != b.team){
				if(other.block.hasItems && other.block.hasLiquids && other.block.hasPower && other.efficiency > 0){
				other.applySlowdown(5, 80);
				if(Mathf.chanceDelta(0.5)){
            Tmp.v1.rnd(Mathf.range(other.block.size/2));
            skySparks.at(other.x + Tmp.v1.x, other.y + Tmp.v1.y, 0, Color.sky, true);
        }
        }
        else if(other instanceof Turret){
        	other.applyBoost(3, 180);
			if(Mathf.chanceDelta(0.5)){
            Tmp.v1.rnd(Mathf.range(other.block.size/2));
            skySparks.at(other.x + Tmp.v1.x, other.y + Tmp.v1.y, 0, Color.sky, true);
        }
        }
}
});
}
})
});

const murderMoveEffect = extend(MoveEffectAbility, {
	x: 0,
	y: -10 / 4,
	color: Color.sky,
	effect: extend(ParticleEffect, {
		particles: 1,
		length: 0,
		sizeFrom: 4,
		sizeTo: 0,
		interp: Interp.pow2Out,
		sizeInterp: Interp.pow2Out,
		lifetime: 15,
		colorFrom: Color.sky,
		colorTo: Color.sky,
	})
});

const murderArt = extend(Weapon, "murder-art", {
	x: 0,
	y: 0,
	reload: 180,
	rotate: true,
	rotateSpeed: 360,
	ignoreRotation: true,
	recoil: 0,
	shootSound: Sounds.shootArtillerySmall,
	bullet: extend(ArtilleryBulletType, 3, 78, "circle-bullet", {
		lifetime: 80,
		shrinkX: -0.3,
		shrinkY: -0.3,
		width: 8,
		height: 8,
		backColor: Color.sky,
		trailColor: Color.sky,
		hitColor: Color.sky,
		frontColor: Color.white,
		collidesAir: false,
		collidesTiles: false,
		hitEffect: extend(ExplosionEffect, {
			lifetime: 35,
			waveRad: 24,
			waveLife: 10,
			waveColor: Color.sky,
			waveStroke: 2,
			sparks: 6,
			sparkRad: 28,
			sparkLen: 4,
			sparkStroke: 2,
			sparkColor: Color.sky,
			smokes: 6,
			smokeRad: 28,
			smokeSize: 5,
			smokeColor: Color.sky,
			}),
	    despawnEffect: extend(ExplosionEffect, {
			lifetime: 35,
			waveRad: 24,
			waveLife: 10,
			waveColor: Color.sky,
			waveStroke: 2,
			sparks: 6,
			sparkRad: 28,
			sparkLen: 4,
			sparkStroke: 2,
			sparkColor: Color.sky,
			smokes: 6,
			smokeRad: 28,
			smokeSize: 5,
			smokeColor: Color.sky,
			}),
			splashDamage: 94,
			splashDamageRadius: 24,
			splashDamagePierce: true,
			hitSound: Sounds.blockExplodeElectric,
			})
		});
	
const murder = extend(ErekirUnitType, "murder", {
	health: 600,
	armor: 20,
	targetable: false,
	playerControllable: false,
	allowChangeCommands: false,
	targetAir: false,
	hovering: true,
	hoverable: true,
	rotateSpeed: 8,
	speed: 1.5,
	range: 24,
	drag: 0.05,
	accel: 0.07,
	engineSize: 0,
	fogRadius: 4,
});
murder.constructor = () => extend(ElevationMoveUnit, {});
murder.weapons.addAll(murderArt, murderBomb);
murder.abilities.add(murderMoveEffect);

const flowEnergyField = extend(EnergyFieldAbility, 60, 60, 60, {
	status: statuses.shockStun,
	statusDuration: 25,
	hitBuildings: false,
	color: Color.sky,
	x: 0,
	y: -21 / 4,
	displayHeal: false,
	healPercent: 0,
	maxTargets: 10,
	effectRadius: 11 / 4,
	hitEffect: extend(ParticleEffect, {
		particles: 18,
		cone: 360,
		lifetime: 60,
		line: true,
		lenFrom: 10,
		lenTo: 0,
		length: 22,
		interp: Interp.pow2Out,
		colorFrom: Color.sky,
		colorTo: Color.sky,
		strokeTo: 0,
	}),
	addStats(t){
		t.add(Core.bundle.get("ability." + "energyfield" + ".description")).wrap().width(350);
		t.row();
        t.add(Core.bundle.format("bullet.range", Strings.autoFixed(60 / Vars.tilesize, 2)));
        t.row();
        t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / 60, 2) + StatUnit.perSecond.localized());
        t.row();
        t.add(Core.bundle.format("bullet.damage", 60));
        t.row();
        t.add(statuses.shockStun.emoji() + statuses.shockStun.localizedName + "[lightgray] ~ [stat]" + Strings.autoFixed(25 / 60, 2) + " [lightgray]" + StatUnit.seconds.localized());
    },
    localized(){
    	return Core.bundle.get("ability.energyfield");
    }
});

const flowHitWave = extend(WaveEffect, {
	sizeTo: 8,
	strokeFrom: 3,
	strokeTo: 0.3,
	colorFrom: Color.sky,
	colorTo: Color.sky,
	lifetime: 20,
});

const flowHitSparks = extend(ParticleEffect, {
		particles: 18,
		cone: 360,
		lifetime: 60,
		line: true,
		lenFrom: 10,
		lenTo: 0,
		length: 22,
		interp: Interp.pow2Out,
		colorFrom: Color.sky,
		colorTo: Color.sky,
		strokeTo: 0,
	});

const flowMulti = new MultiEffect(flowHitWave, flowHitSparks);
          
var overclockStatus = extend(StatusEffect, "overclock-status", {
          	      show: false,
                    damage: 2,
                    effect: skySparks,
                     reloadMultiplier: 3,
                     speedMultiplier: 3,
                     effectChance: 1,
                 });

const murderSpawn = extend(SpawnDeathAbility, {
	unit: murder,
	spread: 0,
});

const flowWeapon = extend(Weapon, "flow-releaser", {
	x: 0,
	y: -21 / 4,
	shootSound: Sounds.shootMissile,
	velocityRnd: 0.15,
	reload: 12,
	shoot: new ShootSummon(0, -21 / 4, 11 / 4, 180),
	shootCone: 100,
	rotate: false,
	recoil: 0,
	shake: 1,
	bullet: extend(BasicBulletType, 10, 60, {
	width: 16,
	height: 20,
	trailWidth: 3.30,
	trailLength: 18,
	backColor: Color.sky,
	hitColor: Color.sky,
	trailColor: Color.sky,
	frontColor: Color.white,
	hitEffect: Fx.hitBulletColor,
	despawnEffect: Fx.hitBulletColor,
	buildingDamageMultiplier: 0.01,
	pierceCap: 2,
	knockback: 2,
	homingPower: 0.18,
	homingRange: 60,
	trailEffect: Fx.disperseTrail,
	trailChance: 0.5,
	bulletInterval: 20,
	intervalBullet: extend(LightningBulletType, {
		damage: 30,
		lightningLength: 3,
		llightningLengthRand: 5,
		llightningColor: Color.sky,
		buildingDamageMultiplier: 0.01,
	}),
	fragBullets: 1,
	fragRandomSpread: 0,
	fragBullet: extend(ShrapnelBulletType, {
		damage: 35,
		length: 25,
		width: 10,
		toColor: Color.sky,
		buildingDamageMultiplier: 0.01,
	}),
	hitSound: Sounds.shockBullet,
	removed(b){
		this.super$removed(b);
		
		Vars.indexer.allBuildings(b.x, b.y, 30, other => {
		if(other.team == b.team){
	    if(other.damaged()){
		if(other.block.targetable){
			var absorber = Damage.findAbsorber(b.team, b.x, b.y, other.x, other.y);
                    if(absorber != null){
                        other = absorber;
                    }
			other.heal(other.maxHealth * 0.5 / 100);
		    Fx.chainLightning.at(b.x, b.y, 0, Color.sky, other);
		    Fx.healBlockFull.at(other.x, other.y, 0, Color.sky, other.block);
		}
		}
		}
		if(other.team != b.team){
	    if(other.block.targetable && (other.block.hasItems || other.block.hasLiquids || other.block.hasPower) && other.efficiency > 0){
		var absorber1 = Damage.findAbsorber(b.team, b.x, b.y, other.x, other.y);
                    if(absorber1 != null){
                        other = absorber1;
                    }
		other.damage(other.maxHealth * 0.5 / 100);
		if(other.block.canOverdrive){
		if(other instanceof Turret){
		other.applyBoost(1.3, 180);
		}
		}
		else if(other.power != null && other.block.hasPower){
		other.damage(this.damage * 2);
		other.applySlowdown(1.3, 60);
		if(other.block.canOverdrive){
		if(other instanceof Turret){
		other.applyBoost(1.3, 180);
		}
		}
		}
		Fx.chainLightning.at(b.x, b.y, 0, Color.sky, other);
		flowMulti.at(other.x, other.y, other.rotation);
		}
		}
		});
		
		Units.nearbyEnemies(b.team, b.x, b.y, 30, other => {
		if(other.type.targetable){
		other.apply(overclockStatus, 180);
		Fx.chainLightning.at(b.x, b.y, 0, Color.sky, other);
		flowMulti.at(other.x, other.y, other.rotation);
		}
		});
		}
		})
		});
      
const flowMoveEffect = extend(MoveEffectAbility, {
	x: 0,
	y: -21 / 4,
	color: Color.sky,
	effect: extend(ParticleEffect, {
		particles: 1,
		length: 0,
		sizeFrom: 4,
		sizeTo: 0,
		interp: Interp.pow2Out,
		sizeInterp: Interp.pow2Out,
		lifetime: 15,
		colorFrom: Color.sky,
		colorTo: Color.sky,
	})
});

const flowMoveEffectFront = extend(MoveEffectAbility, {
	x: 49 / 4,
	y: 24 / 4,
	color: Color.sky,
	rotation: 45,
	effect: extend(ParticleEffect, {
		particles: 1,
		length: 0,
		sizeFrom: 4,
		sizeTo: 0,
		interp: Interp.pow2Out,
		sizeInterp: Interp.pow2Out,
		lifetime: 15,
		colorFrom: Color.sky,
		colorTo: Color.sky,
	})
});

const flowMoveEffectFrontMirror = extend(MoveEffectAbility, {
	x: -49 / 4,
	y: 24 / 4,
	color: Color.sky,
	rotation: 45,
	effect: extend(ParticleEffect, {
		particles: 1,
		length: 0,
		sizeFrom: 4,
		sizeTo: 0,
		interp: Interp.pow2Out,
		sizeInterp: Interp.pow2Out,
		lifetime: 15,
		colorFrom: Color.sky,
		colorTo: Color.sky,
	})
});

const flowMoveEffectBack = extend(MoveEffectAbility, {
	x: 52 / 4,
	y: -15 / 4,
	color: Color.sky,
	rotation: 45,
	effect: extend(ParticleEffect, {
		particles: 1,
		length: 0,
		sizeFrom: 4,
		sizeTo: 0,
		interp: Interp.pow2Out,
		sizeInterp: Interp.pow2Out,
		lifetime: 35,
		colorFrom: Color.sky,
		colorTo: Color.sky,
	}),
});

const flowMoveEffectBackMirror = extend(MoveEffectAbility, {
	x: -52 / 4,
	y: -15 / 4,
	color: Color.sky,
	rotation: 45,
	effect: extend(ParticleEffect, {
		particles: 1,
		length: 0,
		sizeFrom: 4,
		sizeTo: 0,
		interp: Interp.pow2Out,
		sizeInterp: Interp.pow2Out,
		lifetime: 35,
		colorFrom: Color.sky,
		colorTo: Color.sky,
	}),
});

const flowSphereFront = extend(ShapePart, {
	x: 49 / 4,
	y: 24 / 4,
	color: Color.sky,
	sides: 0,
	radius: 2,
	layer: Layer.effect,
	mirror: true,
	circle: true,
});

const flowSphereBack = extend(ShapePart, {
	x: 52 / 4,
	y: -15 / 4,
	color: Color.sky,
	sides: 0,
	radius: 2,
	layer: Layer.effect,
	mirror: true,
	circle: true,
});

const flow = extend(ErekirUnitType, "flow", {});
flow.constructor = () => extend(PayloadUnit, {});
flow.payloadCapacity = (3 * 3) * Vars.tilePayload;
flow.weapons.add(flowWeapon);
flow.abilities.addAll(flowEnergyField, murderSpawn, flowMoveEffect, flowMoveEffectFront, flowMoveEffectBack, flowMoveEffectFrontMirror, flowMoveEffectBackMirror);
flow.parts.add(flowSphereFront, flowSphereBack);

let overdrive = new Stat("overdrive");
var overdriveWave = new Effect(22, e => {
	    Draw.color(Pal.accent);
        Lines.stroke(e.fout() * 2);
        Lines.circle(e.x, e.y, 4 + e.finpow() * e.rotation);
});
var overdriveBullet = extend(ExplosionBulletType, {
	killShooter: false,
	splashDamage: 0,
	splashDamageRadius: 120,
	collidesTeam: true,
	removed(b){
		this.super$removed(b);
		Vars.indexer.allBuildings(b.x, b.y, 120, other => {
			if(other.team == b.team){
				if(other.block.hasItems || other.block.hasLiquids || other.block.hasPower){
                    if(other.block.canOverdrive){
                        other.applyBoost(1.35, 200);
                        Fx.chainEmp.at(b.x, b.y, 0, Pal.accent, other);
                        overdriveWave.at(other, other.block.size * 7);
                    }
                 }
              }
           });
        }
     });
var overdriveAbility = extend(Ability, {
	update(unit){
	timer += Time.delta;
	
	if(timer >= 500){
		
	   overdriveBullet.create(unit, unit.team, unit.x, unit.y, unit.rotation);
	
	timer = 0;
	}
	},
     addStats(t) {
     	t.add(Core.bundle.get("ability." + "overdriveability" + ".description")).wrap().width(350);
		t.row();
    	t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / 500, 1) + " " + StatUnit.perSecond.localized());
        t.row();
        t.add("[lightgray]" + Stat.shootRange.localized() + ": [white]" +  Strings.autoFixed(60 / Vars.tilesize, 1) + " " + StatUnit.blocks.localized());
        t.row();
        t.add("[lightgray]" + overdrive.localized() + ": [white]" + (1.35 * 100) + StatUnit.percent.localized());
    },
   localized() {
   	return Core.bundle.get("ability.overdriveability");
   }
 });

var repairEffect = extend(WaveEffect, {
sizeFrom: 0,
sizeTo: 60,
lifetime: 60,
sides: 0,
colorFrom: Pal.accent,
colorTo: Pal.accent,
strokeFrom: 2,
strokeTo: 0,
interp: Interp.circleOut,
sizeInterp: Interp.circleOut
});

var repairActiveEffect = extend(WaveEffect, {
sizeFrom: 0,
sizeTo: 6,
lifetime: 60,
sides: 0,
colorFrom: Pal.accent,
colorTo: Pal.accent,
strokeFrom: 4,
strokeTo: 0,
interp: Interp.circleOut,
sizeInterp: Interp.circleOut
});

var differenceRepairField = extend(RepairFieldAbility, 500, 600, 60, {
	healEffect: repairEffect,
	activeEffect: repairActiveEffect,
	addStats(t){
		this.super$addStats(t);
		t.row();
		t.add(Core.bundle.get("ability." + "repairfield" + ".description")).wrap().width(350);
  },
	localized() {
   	return Core.bundle.get("ability.repairfield");
   }
});

var shieldRegen = extend(ShieldRegenFieldAbility, 100, 1000, 600, 60, {
	addStats(t){
		this.super$addStats(t);
		t.row();
		t.add(Core.bundle.get("ability." + "shieldregenfield" + ".description")).wrap().width(350);
  },
	localized() {
   	return Core.bundle.get("ability.shieldregenfield");
   }
});

const difference = extend(ErekirUnitType, "difference", {});
difference.constructor = () => extend(BuildingTetherPayloadUnit, {});
difference.abilities.addAll(differenceRepairField, shieldRegen, overdriveAbility);

const rapix = extend(ErekirUnitType, "rapix", {});
rapix.constructor = () => extend(LegsUnit, {});

const pacification = extend(ErekirUnitType, "pacification", {});
pacification.constructor = () => extend(UnitEntity, {});

const pacificationMove = extend(ErekirUnitType, "pacification-moveable", {});
pacificationMove.constructor = () => extend(TankUnit, {});

const curbingPhase1 = extend(ErekirUnitType, "curbing-phase1", {});
curbingPhase1.constructor = () => extend(ElevationMoveUnit, {});

const curbingPhase2 = extend(ErekirUnitType, "curbing-phase2", {});
curbingPhase2.constructor = () => extend(ElevationMoveUnit, {});

const obediencePhase1 = extend(ErekirUnitType, "obedience-phase1", {});
obediencePhase1.constructor = () => extend(UnitEntity, {});

const obediencePhase2 = extend(ErekirUnitType, "obedience-phase2", {});
obediencePhase2.constructor = () => extend(UnitEntity, {});

const subordinationPhase1 = extend(ErekirUnitType, "subordination-phase1", {});
subordinationPhase1.constructor = () => extend(UnitEntity, {});

var healWave0 = extend(WaveEffect, {
	sizsTo: 80,
	sizeFrom: 2,
	lifetime: 60,
	colorFrom: Pal.regen,
	colorTo: Pal.regen,
	interp: Interp.circleOut,
});
var healWave1 = extend(WaveEffect, {
	sizeFrom: 2,
	lifetime: 60,
	colorFrom: Pal.regen,
	colorTo: Pal.regen,
	interp: Interp.circleOut,
});
var healWave2 = extend(WaveEffect, {
	sizeFrom: 40,
	sizeTo: 0,
	lifetime: 60,
	colorFrom: Pal.regen,
	colorTo: Pal.regen,
	interp: Interp.circleIn,
});
const RegenFieldAbility = extend(Ability, {
	update(unit){
	timer += Time.delta;
	Units.nearby(unit.team, unit.x, unit.y, 80, other => {
		if(other.damaged()){
			other.heal((other.maxHealth * 0.1 / 100) * Time.delta);
			if(timer >= 120){
				healWave1.sizeTo = 8 + other.type.hitSize;
				healWave0.at(unit, 80);
				healWave1.at(other, true);
				timer = 0;
			}
		}
	});
	Units.nearbyEnemies(unit.team, unit.x, unit.y, 40, enemy => {
		if(unit.health < unit.maxHealth / 2){
			enemy.damageContinuousPierce(enemy.maxHealth * 0.03 / 100);
			unit.heal((unit.maxHealth * 0.03 / 100) * Time.delta);
			if(timer >= 120){
				healWave1.sizeTo = 8 + enemy.type.hitSize;
				healWave2.at(unit.x, unit.y, unit.rotation);
				healWave1.at(enemy, true);
				timer = 0;
			}
		}
	});
},
     addStats(t){
      t.add(Core.bundle.get("ability.regenfield.description"));
      t.row();
      t.add(Core.bundle.format("ability.stat.regen",  Strings.autoFixed(0.1 * 60, 2) + "%"));
      t.row();
      t.add(Core.bundle.format("bullet.range", Strings.autoFixed(80 / Vars.tilesize, 2)));
      t.row();
      t.add(Core.bundle.format("ability.stat.lifesteal", Strings.autoFixed(0.03 * 60, 2) + "%"));
      }
});

const subPhase2part0 = extend(ErekirUnitType, "subordination-phase2-part0", {});
subPhase2part0.constructor = () => extend(UnitEntity, {});

const subPhase2part1= extend(ErekirUnitType, "subordination-phase2-part1", {});
subPhase2part1.constructor = () => extend(UnitEntity, {});

const subPhase2part2= extend(ErekirUnitType, "subordination-phase2-part2", {});
subPhase2part2.constructor = () => extend(UnitEntity, {});
			
const subordinationPhase2 = extend(ErekirUnitType, "subordination-phase2", {});
subordinationPhase2.constructor = () => extend(LegsUnit, {});
subordinationPhase2.abilities.addAll(RegenFieldAbility, extend(SpawnDeathAbility, subPhase2part0, 1, 8, {}), extend(SpawnDeathAbility, subPhase2part1, 1, 8, {}), extend(SpawnDeathAbility, subPhase2part2, 1, 8, {}));

const thunderbolt = extend(ErekirUnitType, "thunderbolt", {});
thunderbolt.constructor = () => extend(UnitEntity, {});

module.exports = {
	hound: hound,
	rampage: rampage,
	phenomenon: phenomenon,
	loyalty: loyalty,
	presence: presence,
	apparition: apparition,
	penance: penance,
	milestone: milestone,
	raptor: raptor,
	maw: maw,
	ooze: ooze,
	gaze: gaze,
	difference: difference,
	rapix: rapix,
	pacificationMove: pacificationMove,
	curbingPhase1: curbingPhase1,
	obediencePhase1: obediencePhase1,
	subordinationPhase1: subordinationPhase1,
	subordinationPhase2: subordinationPhase2,
	thunderbolt: thunderbolt
}