const statuses = require("SappStatuses");
const items = require("SappItems");
const liquids = require("SappLiquids");
const stat = require("erekir/SappErekirTurrets");
var abilitiesFunction = new Stat("abilities", StatCat.function);

//Dart Faction
const cast = extend(ItemTurret, "cast", {});
const thrower = extend(ItemTurret, "thrower", {
    envDisabled: Env.scorching
});
const speed = extend(ItemTurret, "speed", {});

const copperMissileExplosion = extend(Weapon, "cpw", {
	shootCone: 360,
    mirror: false,
    reload: 1,
    shootOnDeath: true,
    shake: 4,
    bullet: extend(ExplosionBulletType, 20, 5 * Vars.tilesize, {
    	hitColor: Items.copper.color,
        shootEffect: Fx.massiveExplosion,
        ammoMultiplier: 1,
        })
    });
    
const copperTrail = extend(MoveEffectAbility, {
	effect: extend(ParticleEffect, {
		particles: 8,
		cone: 360,
		length: 14,
		lifetime: 120,
		sizeFrom: 5,
		colorFrom: Color.valueOf("565666"),
		colorTo: Color.valueOf("56566600"),
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut
      }),
      y: -2.25,
      interval: 7
}); 
        
const copperMissile = extend(MissileUnitType, "launch-copper-missile", {
		speed: 5,
		maxRange: 6,
		lifetime: 60,
		engineColor: Items.copper.color,
		trailColor: Items.copper.color,
		engineLayer: Layer.effect,
		engineSize: 1,
		engineOffset: 2.25,
		rotateSpeed: 3,
		trailLength: 18,
		missileAccelTime: 10,
		lowAltitude: true,
		loopSound: Sounds.missileTrail,
		loopSoundVolume: 0.6,
		targetUnderBlocks: false,
		health: 130,
		drawCell: false,
		outlineColor: Color.valueOf("565666"),
});
copperMissile.weapons.add(copperMissileExplosion);
copperMissile.abilities.add(copperTrail);

const graphiteMissileExplosion = extend(Weapon, "gpw", {
	shootCone: 360,
    mirror: false,
    reload: 1,
    shootOnDeath: true,
    shake: 4,
    bullet: extend(ExplosionBulletType, 28, 5.5 * Vars.tilesize, {
    	hitColor: Items.graphite.color,
        shootEffect: Fx.massiveExplosion,
        ammoMultiplier: 1,
        })
    });
    
const graphiteTrail = extend(MoveEffectAbility, {
	effect: extend(ParticleEffect, {
		particles: 8,
		cone: 360,
		length: 14,
		lifetime: 120,
		sizeFrom: 5,
		colorFrom: Color.valueOf("565666"),
		colorTo: Color.valueOf("56566600"),
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut
      }),
      y: -2.25,
      interval: 7
}); 
        
const graphiteMissile = extend(MissileUnitType, "launch-graphite-missile", {
		speed: 5,
		maxRange: 6,
		lifetime: 60,
		engineColor: Items.graphite.color,
		trailColor: Items.graphite.color,
		engineLayer: Layer.effect,
		engineSize: 1,
		engineOffset: 2.25,
		rotateSpeed: 3,
		trailLength: 18,
		missileAccelTime: 10,
		lowAltitude: true,
		loopSound: Sounds.missileTrail,
		loopSoundVolume: 0.6,
		targetUnderBlocks: false,
		health: 130,
		drawCell: false,
		outlineColor: Color.valueOf("565666"),
});
graphiteMissile.weapons.add(graphiteMissileExplosion);
graphiteMissile.abilities.add(graphiteTrail);

const metaglassMissileExplosion = extend(Weapon, "mpw", {
	shootCone: 360,
    mirror: false,
    reload: 1,
    shootOnDeath: true,
    shake: 4,
    bullet: extend(ExplosionBulletType, 25, 5 * Vars.tilesize, {
    	hitColor: Items.metaglass.color,
        shootEffect: Fx.massiveExplosion,
        ammoMultiplier: 1,
        fragBullets: 8,
        fragBullet: extend(BasicBulletType, 4, 7, {
        	lifetime: 10,
            splashDamage: 10,
            splashDamageRadius: 16,
            hitEffect: Fx.flakExplosion,
            despawnEffect: Fx.flakExplosion,
            width: 7,
            height: 7,
            })
        })
    });
    
const metaglassTrail = extend(MoveEffectAbility, {
	effect: extend(ParticleEffect, {
		particles: 8,
		cone: 360,
		length: 14,
		lifetime: 120,
		sizeFrom: 5,
		colorFrom: Color.valueOf("565666"),
		colorTo: Color.valueOf("56566600"),
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut
      }),
      y: -2.25,
      interval: 7
}); 
        
const metaglassMissile = extend(MissileUnitType, "launch-metaglass-missile", {
		speed: 5,
		maxRange: 6,
		lifetime: 60,
		engineColor: Items.metaglass.color,
		trailColor: Items.metaglass.color,
		engineLayer: Layer.effect,
		engineSize: 1,
		engineOffset: 2.25,
		rotateSpeed: 3,
		trailLength: 18,
		missileAccelTime: 10,
		lowAltitude: true,
		loopSound: Sounds.missileTrail,
		loopSoundVolume: 0.6,
		targetUnderBlocks: false,
		health: 130,
		drawCell: false,
		outlineColor: Color.valueOf("565666"),
});
metaglassMissile.weapons.add(metaglassMissileExplosion);
metaglassMissile.abilities.add(metaglassTrail);

const siliconMissileExplosion = extend(Weapon, "spw", {
	shootCone: 360,
    mirror: false,
    reload: 1,
    shootOnDeath: true,
    shake: 4,
    bullet: extend(ExplosionBulletType, 28, 7 * Vars.tilesize, {
    	hitColor: Items.silicon.color,
        shootEffect: Fx.massiveExplosion,
        ammoMultiplier: 1,
        })
    });
    
const siliconTrail = extend(MoveEffectAbility, {
	effect: extend(ParticleEffect, {
		particles: 8,
		cone: 360,
		length: 14,
		lifetime: 120,
		sizeFrom: 5,
		colorFrom: Color.valueOf("565666"),
		colorTo: Color.valueOf("56566600"),
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut
      }),
      y: -2.25,
      interval: 7
}); 
        
const siliconMissile = extend(MissileUnitType, "launch-silicon-missile", {
		speed: 5,
		maxRange: 6,
		lifetime: 60,
		engineColor: Items.silicon.color,
		trailColor: Items.silicon.color,
		engineLayer: Layer.effect,
		engineSize: 1,
		engineOffset: 2.25,
		rotateSpeed: 3,
		trailLength: 18,
		missileAccelTime: 10,
		lowAltitude: true,
		loopSound: Sounds.missileTrail,
		loopSoundVolume: 0.6,
		targetUnderBlocks: false,
		health: 160,
		drawCell: false,
		outlineColor: Color.valueOf("565666"),
});
siliconMissile.weapons.add(siliconMissileExplosion);
siliconMissile.abilities.add(siliconTrail);

const pyratiteMissileExplosion = extend(Weapon, "ppw", {
	shootCone: 360,
    mirror: false,
    reload: 1,
    shootOnDeath: true,
    shake: 4,
    bullet: extend(ExplosionBulletType, 34, 6 * Vars.tilesize, {
    	hitColor: Items.pyratite.color,
        shootEffect: Fx.massiveExplosion,
        ammoMultiplier: 1,
        status: StatusEffects.burning,
        })
    });
    
const pyratiteTrail = extend(MoveEffectAbility, {
	effect: extend(ParticleEffect, {
		particles: 8,
		cone: 360,
		length: 14,
		lifetime: 120,
		sizeFrom: 5,
		colorFrom: Color.valueOf("565666"),
		colorTo: Color.valueOf("56566600"),
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut
      }),
      y: -2.25,
      interval: 7
}); 
        
const pyratiteMissile = extend(MissileUnitType, "launch-pyratite-missile", {
		speed: 5,
		maxRange: 6,
		lifetime: 60,
		engineColor: Items.pyratite.color,
		trailColor: Items.pyratite.color,
		engineLayer: Layer.effect,
		engineSize: 1,
		engineOffset: 2.25,
		rotateSpeed: 3,
		trailLength: 18,
		missileAccelTime: 10,
		lowAltitude: true,
		loopSound: Sounds.missileTrail,
		loopSoundVolume: 0.6,
		targetUnderBlocks: false,
		health: 180,
		drawCell: false,
		outlineColor: Color.valueOf("565666"),
});
pyratiteMissile.weapons.add(pyratiteMissileExplosion);
pyratiteMissile.abilities.add(pyratiteTrail);

const blastMissileExplosion = extend(Weapon, "bpw", {
	shootCone: 360,
    mirror: false,
    reload: 1,
    shootOnDeath: true,
    shake: 4,
    bullet: extend(ExplosionBulletType, 46, 6 * Vars.tilesize, {
    	hitColor: Items.blastCompound.color,
        shootEffect: Fx.massiveExplosion,
        ammoMultiplier: 1,
        status: StatusEffects.blasted,
        })
    });
    
const blastTrail = extend(MoveEffectAbility, {
	effect: extend(ParticleEffect, {
		particles: 8,
		cone: 360,
		length: 14,
		lifetime: 120,
		sizeFrom: 5,
		colorFrom: Color.valueOf("565666"),
		colorTo: Color.valueOf("56566600"),
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut
      }),
      y: -2.25,
      interval: 7
}); 
        
const blastMissile = extend(MissileUnitType, "launch-blast-missile", {
		speed: 5,
		maxRange: 6,
		lifetime: 60,
		engineColor: Items.blastCompound.color,
		trailColor: Items.blastCompound.color,
		engineLayer: Layer.effect,
		engineSize: 1,
		engineOffset: 2.25,
		rotateSpeed: 3,
		trailLength: 18,
		missileAccelTime: 10,
		lowAltitude: true,
		loopSound: Sounds.missileTrail,
		loopSoundVolume: 0.6,
		targetUnderBlocks: false,
		drawCell: false,
		outlineColor: Color.valueOf("565666"),
		health: 130,
});
blastMissile.weapons.add(blastMissileExplosion);
blastMissile.abilities.add(blastTrail);

const thoriumMissileExplosion = extend(Weapon, "tpw", {
	shootCone: 360,
    mirror: false,
    reload: 1,
    shootOnDeath: true,
    shake: 5,
    bullet: extend(ExplosionBulletType, 62, 4 * Vars.tilesize, {
    	hitColor: Items.thorium.color,
        shootEffect: Fx.massiveExplosion,
        ammoMultiplier: 1,
        })
    });
    
const thoriumTrail = extend(MoveEffectAbility, {
	effect: extend(ParticleEffect, {
		particles: 8,
		cone: 360,
		length: 14,
		lifetime: 120,
		sizeFrom: 5,
		colorFrom: Color.valueOf("565666"),
		colorTo: Color.valueOf("56566600"),
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut
      }),
      y: -2.25,
      interval: 7
}); 
        
const thoriumMissile = extend(MissileUnitType, "launch-thorium-missile", {
		speed: 4,
		maxRange: 6,
		lifetime: 75,
		engineColor: Items.thorium.color,
		trailColor: Items.thorium.color,
		engineLayer: Layer.effect,
		engineSize: 1,
		engineOffset: 2.25,
		rotateSpeed: 3,
		trailLength: 18,
		missileAccelTime: 10,
		lowAltitude: true,
		loopSound: Sounds.missileTrail,
		loopSoundVolume: 0.6,
		targetUnderBlocks: false,
		drawCell: false,
		outlineColor: Color.valueOf("565666"),
		health: 240,
});
thoriumMissile.weapons.add(thoriumMissileExplosion);
thoriumMissile.abilities.add(thoriumTrail);

const creostoneMissileExplosion = extend(Weapon, "crpw", {
	shootCone: 360,
    mirror: false,
    reload: 1,
    shootOnDeath: true,
    shake: 5,
    bullet: extend(ExplosionBulletType, 48, 8 * Vars.tilesize, {
    	hitColor: Color.valueOf("ffb380"),
        shootEffect: Fx.massiveExplosion,
        ammoMultiplier: 1,
        status: statuses.smallFlaming,
        })
    });
    
const creostoneTrail = extend(MoveEffectAbility, {
	effect: extend(ParticleEffect, {
		particles: 8,
		cone: 360,
		length: 14,
		lifetime: 120,
		sizeFrom: 5,
		colorFrom: Color.valueOf("565666"),
		colorTo: Color.valueOf("56566600"),
		interp: Interp.circleOut,
		sizeInterp: Interp.circleOut
      }),
      y: -2.25,
      interval: 7
}); 
        
const creostoneMissile = extend(MissileUnitType, "launch-creostone-missile", {
		speed: 3.5,
		maxRange: 6,
		lifetime: 85.72,
		engineColor: Color.valueOf("ffb380"),
		trailColor: Color.valueOf("ffb380"),
		engineLayer: Layer.effect,
		engineSize: 1,
		engineOffset: 2.25,
		rotateSpeed: 3,
		trailLength: 18,
		missileAccelTime: 10,
		lowAltitude: true,
		drawCell: false,
		outlineColor: Color.valueOf("565666"),
		loopSound: Sounds.missileTrail,
		loopSoundVolume: 0.6,
		targetUnderBlocks: false,
		health: 280,
});
creostoneMissile.weapons.add(creostoneMissileExplosion);
creostoneMissile.abilities.add(creostoneTrail);

const launch = extend(ItemTurret, "launch", {});
launch.ammo(
Items.copper, extend(BulletType, 0, 0, {
	shootEffect: Fx.shootSmall,
	smokeEffect: Fx.shootSmokeMissile,
	hitColor: Items.copper.color,
	ammoMultiplier: 1,
	spawnUnit: copperMissile,
}),
Items.graphite, extend(BulletType, 0, 0, {
	shootEffect: Fx.shootSmall,
	smokeEffect: Fx.shootSmokeMissile,
	hitColor: Items.graphite.color,
	ammoMultiplier: 2,
	spawnUnit: graphiteMissile,
}),
Items.silicon, extend(BulletType, 0, 0, {
	shootEffect: Fx.shootSmall,
	smokeEffect: Fx.shootSmokeMissile,
	hitColor: Items.silicon.color,
	ammoMultiplier: 2,
	spawnUnit: siliconMissile,
}),
Items.pyratite, extend(BulletType, 0, 0, {
	shootEffect: Fx.shootSmall,
	smokeEffect: Fx.shootSmokeMissile,
	hitColor: Items.pyratite.color,
	ammoMultiplier: 2,
	spawnUnit: pyratiteMissile,
}),
Items.blastCompound, extend(BulletType, 0, 0, {
	shootEffect: Fx.shootSmall,
	smokeEffect: Fx.shootSmokeMissile,
	hitColor: Items.blastCompound.color,
	ammoMultiplier: 3,
	spawnUnit: blastMissile,
}),
Items.thorium, extend(BulletType, 0, 0, {
	shootEffect: Fx.shootSmall,
	smokeEffect: Fx.shootSmokeMissile,
	hitColor: Items.blastCompound.color,
	ammoMultiplier: 4,
	reloadMultiplier: 0.75,
	spawnUnit: thoriumMissile,
}),
Items.metaglass, extend(BulletType, 0, 0, {
	shootEffect: Fx.shootSmall,
	smokeEffect: Fx.shootSmokeMissile,
	hitColor: Items.metaglass.color,
	ammoMultiplier: 2,
	spawnUnit: metaglassMissile,
}),
items.creostone, extend(BulletType, 0, 0, {
	shootEffect: Fx.shootSmall,
	smokeEffect: Fx.shootSmokeMissile,
	hitColor: Color.valueOf("ffb380"),
	reloadMultiplier: 0.7,
	ammoMultiplier: 4,
	spawnUnit: creostoneMissile,
}));
		
	
const flight = extend(ItemTurret, "flight", {});

//Sandbank Faction
const sandTurret = extend(ItemTurret, "sand-turret", {});
const sandThrower = extend(ItemTurret, "sand-thrower", {
    envDisabled: Env.scorching
});
const dune = extend(ItemTurret, "dune", {});
const pyramid = extend(ItemTurret, "pyramid", {});

//Indigo Faction
const frostbite = extend(ItemTurret, "frostbite", {});
const icicle = extend(PowerTurret, "icicle", {});
const hoarfrost = extend(PowerTurret, "hoarfrost", {});
const centerBullet = extend(BasicBulletType, {
	width: 20,
	height: 24,
	speed: 7,
	lifetime: 40,
	damage: 70,
	knockback: 4,
	hitEffect: Fx.flakExplosion,
	despawnEffect: Fx.flakExplosion,
	backColor: Pal.lancerLaser,
	frontColor: Color.white,
	trailWidth: 4,
	trailLength: 40,
	trailColor: Pal.lancerLaser,
	status: StatusEffects.freezing,
	statusDuration: 90,
});

const reproduction = extend(ItemTurret, "reproduction", {
    setStats() {
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(this, centerBullet)));
    },
    canOverdrive: false
});
reproduction.buildType = () => extend(ItemTurret.ItemTurretBuild, reproduction, {
	creload : 0,
    updateTile() {
        this.super$updateTile();
        let reproductionShoot = this.isShooting() && this.isActive() && this.hasAmmo();

        if(reproductionShoot) {
            if(this.creload >= 70) {
                this.creload = 0
                centerBullet.create(this, this.team, this.x, this.y, this.rotation)
                Sounds.shoot.at(this)
                Fx.shootBigColor.at(this.x, this.y)
            }
            else this.creload++;
        }
    },
});

const north = extend(PowerTurret, "north", {});
const bow = extend(ItemTurret, "bow", {});
const overfreezingCharge = extend(ShrapnelBulletType, {
	fromColor: Color.white,
	toColor: Pal.lancerLaser,
	damage: 22,
	serrations: 7,
	length: 320,
	status: statuses.overfreezing,
	statusDuration: 84,
	lifetime: 25,
});

const impaler = extend(ItemTurret, "impaler", {
    setStats(){
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(this, overfreezingCharge)));
    },
    canOverdrive: false
});
impaler.buildType = () => extend(ItemTurret.ItemTurretBuild, impaler, {
	creload : 0,
    updateTile() {
        this.super$updateTile();
        let impalerShoot = this.isShooting() && this.isActive() && this.hasAmmo() && this.power.status > 0.5;

        if(impalerShoot) {
            if(this.creload >= 240) {
                this.creload = 0;
                overfreezingCharge.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.shootBig.at(this);
            }
            else this.creload++;
        }
            
    },
});
const glow = extend(ItemTurret, "glow", {
    envDisabled: Env.scorching
});
const splashEffect = extend(ExplosionEffect, {
	waveRad: 115,
	waveRadBase: 65,
	waveColor: Color.valueOf("b8fffe"),
	waveStroke: 2,
	waveLife: 160,
	smokes: 0,
	sparks: 10,
	sparkLen: 16,
	sparkStroke: 3,
	sparkColor: Color.valueOf("b8fffe"),
	sparkRad: 135,
});

const everfrostSplash = extend(ExplosionBulletType, {
	backColor: Color.valueOf("b8fffe"),
	frontColor: Color.white,
	hitEffect: Fx.none,
	despawnEffect: Fx.none,
	splashDamagePierce: true,
	splashDamage: 170,
	splashDamageRadius: 115,
	shootEffect: Fx.none,
	killShooter: false,
	hitColor: Color.valueOf("b8fffe"),
	status: StatusEffects.freezing,
	statusDuration: 65
});

var everfrostSplashEffect = new MultiEffect(Fx.titanExplosion, splashEffect, Fx.titanSmoke);

const customValue = method => new StatValue() {
    display: method
}

var auxiliaryUnit = new Stat("auxiliaryunit", StatCat.function);
const shielder = extend(UnitType, "shielder", {});
shielder.constructor = () => extend(UnitEntity, {});
const everfrost = extend(LiquidTurret, "everfrost", {
    setStats() {
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(liquids.ledonite, everfrostSplash)));
        this.stats.add(auxiliaryUnit, customValue(table => {
        	table.row();
            table.table(Styles.grayPanel, b => {
                b.image(shielder.uiIcon).size(40).pad(10).left().scaling(Scaling.fit);
                b.table(cons(info => {
                    info.add(shielder.localizedName).left();
                    if(Core.settings.getBool("console")){
                        info.row();
                        info.add(shielder.name).left().color(Color.lightGray);
                    }
                }));
                b.button("?", Styles.flatBordert, () => Vars.ui.content.show(shielder)).size(40).pad(10).right().grow().visible(() => shielder.unlockedNow());
            }).growX().pad(5).row();
        }));
    },
    canOverdrive: false
});
everfrost.buildType = () => extend(LiquidTurret.LiquidTurretBuild, everfrost, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let shooting = this.isShooting() && this.hasAmmo() && this.power.status > 0.5;

        if(shooting) {
            if(this.creload % 310 == 0 && this.creload != 1100) {
                everfrostSplash.create(this, this.team, this.x, this.y, this.rotation);
                everfrostSplashEffect.at(this.x, this.y, this.rotation);
                Sounds.titanExplosion.at(this);
                this.creload += 1;
            }
            else if(this.creload == 1100) {
            	if(!Vars.net.client()){
                shielder.spawn(this.team, this.x, this.y);
                Fx.spawn.at(this.x, this.y);
                Sounds.respawn.at(this);
                }
                this.creload += 1;
            }
            else if(this.creload >= 1100) {
                this.creload = 0;
            }
            else this.creload += 1;
        }
    }
});

//Emerald Light Faction
const pulse = extend(PowerTurret, "pulse", {});

var parentizeEffects = true;
var applied = false;
var shieldRegenStatus = extend(StatusEffect, "shield-regen-status", {
      	      show: false,
                damage: 0,
         update(unit, time){
              time += Time.delta;
              applied = false;
              if(time >= 80){
                Units.nearby(unit.team, unit.x, unit.y, 16, other => {
                if(other.shield < 1000){
                    other.shield = Math.min(other.shield + 250, 1000);
                    other.shieldAlpha = 1;
                    Fx.shieldApply.at(other.x, other.y, 0, other.team.color, parentizeEffects ? other : null);
                    applied = true;
                }
                if(applied){
                Fx.shieldWave.at(unit.x, unit.y, unit.team.color);
            }
            });
            if(unit.shield < 1000){
                    unit.shield = Math.min(unit.shield + 250, 1000);
                    unit.shieldAlpha = 1;
                    Fx.shieldApply.at(unit.x, unit.y, 0, unit.team.color, parentizeEffects ? unit : null);
                    applied = true;
                }
                if(applied){
                Fx.shieldWave.at(unit.x, unit.y, unit.team.color);
            }
            Units.nearbyEnemies(unit.team, unit.x, unit.y, 16, e => {
            	if(e.shield > 0){
            	e.shield = Math.min(e.shield - 100, 0);
                e.shieldAlpha = 1;
                Fx.shieldApply.at(e.x, e.y, 0, e.team.color, parentizeEffects ? e : null);
                }
                });
            time = 0;
           }
         }
     });

const lifeEmp = extend(EmpBulletType, {
	sprite: "circle-bullet",
	damage: 25,
	splashDamage: 35,
	splashDamageRadius: 3 * Vars.tilesize,
	radius: 3 * Vars.tilesize,
	timeIncrease: 1.5,
	timeDuration: 60 * 5,
	speed: 6,
	lifetime: 45,
	width: 6,
	height: 6,
	backColor: Pal.heal,
	hitColor: Pal.heal,
	trailColor: Pal.heal,
	frontColor: Color.white,
	trailWidth: 3,
	trailLength: 16,
	hitSound: Sounds.plasmaboom,
	homingPower: 0.48,
	homingRange: 28,
	collidesTeam: true,
	healPercent: 2,
	hitEffect: extend(ExplosionEffect, {
		waveColor: Pal.heal,
		waveRad: 3 * Vars.tilesize,
		smokeColor: Pal.heal,
		sparkColor: Pal.heal,
		sparkStroke: 2,
		sparks: 5,
    }),
    despawnEffect: extend(ExplosionEffect, {
		waveColor: Pal.heal,
		waveRad: 3 * Vars.tilesize,
		smokeColor: Pal.heal,
		sparks: 0,
    }),
    intervalBullets: 1,
    intervalRandomSpread: 360,
    intervalBullet: extend(LaserBulletType, {
    	length: 24,
        width: 16,
        lifetime: 30,
        colors: [Pal.heal, Pal.heal, Color.white],
        damage: 30,
        collidesTeam: true,
        collidesAir: true,
        healPercent: 1,
        sideWidth: 0,
      }),
      fragBullets: 1,
      fragRandomSpread: 45,
      fragBullet: extend(LaserBulletType, {
    	length: 24,
        width: 16,
        lifetime: 30,
        colors: [Pal.heal, Pal.heal, Color.white],
        damage: 30,
        collidesTeam: true,
        collidesAir: true,
        healPercent: 1,
        sideWidth: 0,
      }),
      removed(b){
      	this.super$removed(b);
      Units.nearby(b.team, b.x, b.y, 3 * Vars.tilesize, unit => {
      	if(unit.team == b.team){
      	if(unit.type.hittable && unit.damaged()){
      	unit.heal(unit.maxHealth * 2 / 100);
          unit.apply(shieldRegenStatus, 200);
          Fx.hitEmpSpark.at(unit.x, unit.y, b.angleTo(unit), Pal.heal);
          Fx.chainEmp.at(b.x, b.y, 0, Pal.heal, unit);
     }
     }
     });
     }
     });
         
const life = extend(PowerTurret, "life", {
shootType: lifeEmp
});
const revival = extend(ItemTurret, "revival", {});
const release = extend(ItemTurret, "release", {});
const emeraldEmpCannon = extend(ItemTurret, "emerald-emp-cannon", {});

//Beam Faction
const surgeEmpSpark = new Effect(40, e => {
        Draw.color(Pal.surge);
        Lines.stroke(e.fout() * 1.6);

        Angles.randLenVectors(e.id, 18, e.finpow() * 27, e.rotation, 360, (x, y) => {
            let ang = Mathf.angle(x, y);
            Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 6 + 1);
        });
    });
    
const accentEmpSpark = new Effect(40, e => {
        Draw.color(Pal.accent);
        Lines.stroke(e.fout() * 1.6);

        Angles.randLenVectors(e.id, 18, e.finpow() * 27, e.rotation, 360, (x, y) => {
            let ang = Mathf.angle(x, y);
            Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 6 + 1);
        });
    });
    
const unlocked = new Effect(20, e => {
        Draw.color(Pal.accent);

        Angles.randLenVectors(e.id, 2, 1 + e.fin() * 2, (x, y) => {
            Fill.square(e.x + x, e.y + y, e.fout() * 2.3 + 0.5);
        });
    });
    
const overdrive = new Stat("overdrive");
const wireOverdriveAbility = extend(Ability, {
	addStats(t){
		t.add(Core.bundle.format("bullet.range", Strings.autoFixed(48 / Vars.tilesize, 2)));
		t.row();
		t.add("[lightgray]" + overdrive.localized() + ": [white]" + Strings.autoFixed(1.3 * 100, 2) + StatUnit.percent.localized());
		t.row();
		t.add(StatusEffects.overclock.emoji() + " " + StatusEffects.overclock.localizedName);
	},
	localized() {
   	return Core.bundle.get("ability.overdriveability");
   }
});
const wireOverdrive = new Seq();
const wireOverdriveValue = wireOverdrive.add(wireOverdriveAbility);

const wire = extend(PowerTurret, "wire", {
setStats(){
	this.super$setStats();
	this.stats.add(abilitiesFunction, StatValues.abilities(wireOverdriveValue));
	}
});
wire.buildType = () => extend(PowerTurret.PowerTurretBuild, wire, {
	creload: 0,
	updateTile(){
		this.super$updateTile();
		this.creload++;
		if(this.creload == 300){
			if(this.isShooting() && this.isActive() && this.hasAmmo()){
			Vars.indexer.allBuildings(this.x, this.y, 48, b => {
				if(b.team == this.team){
					if(b.block.hasPower && b.efficiency > 0 && b.block.canOverdrive){
					b.applyBoost(1.3, 180);
					surgeEmpSpark.at(b.x, b.y, this.angleTo(b), Pal.surge);
                    Fx.chainEmp.at(this.x, this.y, 0, Pal.surge, b);
					}
				}
			});
			Units.nearby(this.team, this.x, this.y, 48, unit => {
				unit.apply(StatusEffects.overclock, 180);
				surgeEmpSpark.at(unit.x, unit.y, this.angleTo(unit), Pal.surge);
                Fx.chainEmp.at(this.x, this.y, 0, Pal.surge, unit);
			});
			}
		}
		else if(this.creload >= 300){
			this.creload = 0;
			}
		}
	});
	
const shockOverdriveAbility = extend(Ability, {
	addStats(t){
		t.add(Core.bundle.format("bullet.range", Strings.autoFixed(80 / Vars.tilesize, 2)));
		t.row();
		t.add("[lightgray]" + overdrive.localized() + ": [white]" + (1.25 * 100) + StatUnit.percent.localized());
		t.row();
		t.add(StatusEffects.overclock.emoji() + " " + StatusEffects.overclock.localizedName);
	},
	localized() {
   	return Core.bundle.get("ability.overdriveability");
   }
});
const shockOverdrive = new Seq();
const shockOverdriveValue = shockOverdrive.add(shockOverdriveAbility);
const shock = extend(ItemTurret, "shock", {
setStats(){
	this.super$setStats();
	this.stats.add(abilitiesFunction, StatValues.abilities(shockOverdriveValue));
	}
});
shock.buildType = () => extend(ItemTurret.ItemTurretBuild, shock, {
	creload: 0,
	updateTile(){
		this.super$updateTile();
		this.creload++;
		if(this.creload == 300){
			if(this.isShooting() && this.isActive() && this.hasAmmo()){
			Vars.indexer.allBuildings(this.x, this.y, 80, b => {
				if(b.team == this.team){
					if((b.block.hasPower || b.block.hasItems || !b.block.hasLiquids) && b.efficiency > 0 && b.block.canOverdrive){
					b.applyBoost(1.25, 180);
					surgeEmpSpark.at(b.x, b.y, this.angleTo(b), Pal.surge);
                    Fx.chainEmp.at(this.x, this.y, 0, Pal.surge, b);
					}
				}
			});
			Units.nearby(this.team, this.x, this.y, 80, unit => {
				unit.apply(StatusEffects.overclock, 180);
				surgeEmpSpark.at(unit.x, unit.y, this.angleTo(unit), Pal.surge);
                Fx.chainEmp.at(this.x, this.y, 0, Pal.surge, unit);
			});
			}
		}
		else if(this.creload >= 300){
			this.creload = 0;
			}
		}
	});
const electron = extend(TractorBeamTurret, "electron", {});

const dischargeOverdriveAbility = extend(Ability, {
	addStats(t){
		t.add(Core.bundle.get("ability." + "overdriveability" + ".description")).wrap().width(350);
		t.row();
		t.add(Core.bundle.format("bullet.range", Strings.autoFixed(100 / Vars.tilesize, 2)));
		t.row();
		t.add("[lightgray]" + overdrive.localized() + ": [white]" + (1.2 * 100) + StatUnit.percent.localized());
		t.row();
		t.add(StatusEffects.overclock.emoji() + " " + StatusEffects.overclock.localizedName);
	},
	localized() {
   	return Core.bundle.get("ability.overdriveability");
   }
});
const dischargeOverdrive = new Seq();
const dischargeOverdriveValue = dischargeOverdrive.add(dischargeOverdriveAbility);
const discharge = extend(PowerTurret, "discharge", {
setStats(){
	this.super$setStats();
	this.stats.add(abilitiesFunction, StatValues.abilities(dischargeOverdriveValue));
	}
});
discharge.buildType = () => extend(PowerTurret.PowerTurretBuild, discharge, {
	creload: 0,
	updateTile(){
		this.super$updateTile();
		this.creload++;
		if(this.creload == 300){
			if(this.isActive() && this.isShooting() && this.hasAmmo() && this.power.status >= 0.5 && this.target != null){
			Vars.indexer.allBuildings(this.x, this.y, 100, b => {
				if(b.team == this.team){
					if((b.block.hasPower || b.block.hasItems || b.block.hasLiquids) && b.efficiency > 0 && b.block.canOverdrive){
					b.applyBoost(1.2, 180);
					surgeEmpSpark.at(b.x, b.y, this.angleTo(b), Pal.surge);
                    Fx.chainEmp.at(this.x, this.y, 0, Pal.surge, b);
					}
				}
			});
			Units.nearby(this.team, this.x, this.y, 100, unit => {
				unit.apply(StatusEffects.overclock, 180);
				surgeEmpSpark.at(unit.x, unit.y, this.angleTo(unit), Pal.surge);
                Fx.chainEmp.at(this.x, this.y, 0, Pal.surge, unit);
                if((unit.team != this.team) && unit.checkTarget(false, true)){
                	unit.apply(statuses.superShock, 300);
                    surgeEmpSpark.at(unit.x, unit.y, this.angleTo(unit), Pal.surge);
                    Fx.chainEmp.at(this.x, this.y, 0, Pal.surge, unit);
                    }
			});
			}
		}
		else if(this.creload >= 300){
			this.creload = 0;
			}
		}
	});
const yellowlasercharge2 = new Effect(80, 100, e => {
    Draw.color(Pal.surge);
    Lines.stroke(e.fin() * 2);
    Lines.circle(e.x, e.y, 4 + e.fout() * 100);

    Fill.circle(e.x, e.y, e.fin() * 20);

    Angles.randLenVectors(e.id, 20, 40 * e.fout(), (x, y) => {
        Fill.circle(e.x + x, e.y + y, e.fin() * 5);
        Drawf.light(e.x + x, e.y + y, e.fin() * 15, Pal.surge, 0.7);
    });

    Draw.color();

    Fill.circle(e.x, e.y, e.fin() * 10);
    Drawf.light(e.x, e.y, e.fin() * 20, Pal.heal, 0.7);
});
yellowlasercharge2.followParent = true;
yellowlasercharge2.rotWithParent = true;

const jerkShocker = extend(Weapon, "jerk-shocker", {
	x: 0,
	y: 0,
	mirror: false,
	rotate: false,
	shootSound: Sounds.bolt,
	shoot: extend(ShootHelix, {
		shots: 2,
	}),
	reload: 60,
	recoil: 0,
	shootY: 0,
	bullet: extend(BasicBulletType, 6, 34, "bullet", {
		lifetime: 300 / 6,
		width: 8,
		height: 12,
		shrinkY: 0,
		trailWidth: 2,
		trailLength: 24,
		backColor: Pal.surge,
		hitColor: Pal.surge,
		trailColor: Pal.surge,
		trailEffect: Fx.missileTrail,
		collidesAir: false,
		trailChance: 0.4,
		hitEffect: extend(ExplosionEffect, {
			waveRad: 14,
			waveColor: Pal.surge,
			sparks: 6,
			sparkRad: 24,
			sparkLen: 4,
			sparkColor: Pal.surge
		}),
		despawnEffect: extend(ExplosionEffect, {
			waveRad: 14,
			waveColor: Pal.surge,
			sparks: 6,
			sparkRad: 24,
			sparkLen: 4,
			sparkColor: Pal.surge
		}),
		shootEffect: Fx.shootSmallColor,
		status: statuses.shockStun,
		statusDuration: 10,
		})
});

const jerkDestruction = extend(Weapon, "jerk-destruction", {
	reload: 580,
	shoot: extend(ShootPattern, {
		firstShotDelay: 579,
	}),
	shootSound: Sounds.none,
	display: false,
	bullet: extend(BulletType, 0, 0, {
		lifetime: 1,
		collides: false,
		collidesTiles: false,
		hitEffect: Fx.none,
		despawnEffect: Fx.none,
		shootEffect: Fx.none,
		smokeEffect: Fx.none,
		killShooter: true
	}),
	alwaysShooting: true,
});


const hitMeltSurge = new Effect(12, e => {
        Draw.color(Pal.surge);
        Lines.stroke(e.fout() * 2);

        Angles.randLenVectors(e.id, 6, e.finpow() * 18, (x, y) => {
            let ang = Mathf.angle(x, y);
            Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 4 + 1);
        });
    });
    
const shootSurge = new Effect(8, e => {
        Draw.color(Pal.surge);
        let w = 1 + 5 * e.fout();
        Drawf.tri(e.x, e.y, w, 17 * e.fout(), e.rotation);
        Drawf.tri(e.x, e.y, w, 4 * e.fout(), e.rotation + 180);
    });

const jerkLaserMount = extend(Weapon, "jerk-laser-mount", {
	reload: 200,
	shootSound: Sounds.beam,
	mirror: false,
	rotate: false,
	continuous: true,
	x: 0,
	y: 0,
	bullet: extend(ContinuousLaserBulletType, {
		damage: 6.7,
		colors: [Color.valueOf("f3e97955"), Color.valueOf("f3e97970"), Pal.surge, Color.white],
		width: 4,
		lifetime: 185,
		shake: 1,
		hitEffect: hitMeltSurge,
		largeHit: false,
		collidesAir: false,
		shootEffect: shootSurge,
		length: 310,
		maxRange: 300,
		incendSpread: 5,
		incendAmount: 1,
		incendChance: 0.03,
		smokeEffect: Fx.none,
		status: StatusEffects.burning,
		statusDuration: 45,
		pierceCap: 3,
	})
	});

const jerk = extend(UnitType, "jerk", {
	speed: 0,
	range: 300,
	rotateSpeed: 1.35,
	hitSize: 14,
	drawCell: false,
	flying: true,
	engineSize: 9 / 4,
	engineOffset: 22 / 4,
	engineColor: Pal.surge,
	isEnemy: false,
});
jerk.constructor = () => extend(UnitEntity, {});
jerk.weapons.add(jerkShocker, jerkDestruction, jerkLaserMount);
jerk.immunities.addAll(statuses.unleash, statuses.shockStun, statuses.overload, StatusEffects.shocked, StatusEffects.overclock, statuses.flaming, statuses.superMelting, statuses.smallFlaming, statuses.flammability, StatusEffects.burning, StatusEffects.melting);

const jerkSpawn = extend(BulletType, 0, 0, {
		lifetime: 1,
		collides: false,
		collidesTiles: false,
		hitEffect: Fx.none,
		despawnEffect: Fx.spawn,
		shootEffect: Fx.none,
		smokeEffect: Fx.none,
		despawnUnit: jerk,
		despawnUnitCount: 1,
		despawnUnitRadius: 0,
		despawnSound: Sounds.respawn,
	});

const pierceOverdriveAbility = extend(Ability, {
	addStats(t){
		t.add(Core.bundle.format("bullet.range", Strings.autoFixed(150 / Vars.tilesize, 2)));
		t.row();
		t.add("[lightgray]" + overdrive.localized() + ": [white]" + Strings.autoFixed(1.15 * 100, 2) + StatUnit.percent.localized());
		t.row();
		t.add(StatusEffects.overclock.emoji() + " " + StatusEffects.overclock.localizedName);
	},
	localized() {
   	return Core.bundle.get("ability.overdriveability");
   }
});
const pierceOverdrive = new Seq();
const pierceOverdriveValue = pierceOverdrive.add(pierceOverdriveAbility);

const globiumLaser = extend(LaserBulletType, {
	length: 270,
	colors: [Color.valueOf("f2e87960"), Pal.surge, Color.white],
	damage: 120,
	lifetime: 45,
	buildingDamageMultiplier: 0.1,
	lightColor: Pal.surge,
	lightningColor: Pal.surge,
	lightningSpacing: 30,
	lightningLength: 4,
	lightningLengthRand: 7,
	collidesAir: false,
	width: 24,
	lightningDamage: 25,
	lightningAngleRand: 40,
	lightningDelay: 1.1,
	chargeEffect: yellowlasercharge2,
	sideWidth: 0,
	sideLength: 0,
	status: StatusEffects.shocked,
	pierceDamageFactor: 0.3
});

const globiumBall = extend(BasicBulletType, 5, 0, "circle-bullet", {
	splashDamage: 60,
	splashDamageRadius: 38,
	drag: 0.03,
	lifetime: 160,
	shrinkY: 0,
	scaledSplashDamage: true,
	splashDamagePierce: true,
	despawnSound: Sounds.laserblast,
	hitSound: Sounds.none,
	collidesAir: false,
	width: 12,
	height: 12,
	trailWidth: 4,
	trailLength: 24,
	trailChance: 0.1,
	trailEffect: Fx.missileTrail,
	backColor: Pal.surge,
	trailColor: Pal.surge,
	hitColor: Pal.surge,
	frontColor: Color.white,
	hitEffect: Fx.none,
	despawnEffect: extend(ExplosionEffect, {
		waveRad: 40,
		waveLife: 14,
		waveColor: Pal.surge,
		waveStroke: 4,
		sparks: 9,
		sparkRad: 44,
		sparkLen: 6,
		sparkStroke: 2.5,
		sparkColor: Pal.surge,
		smokes: 8,
		smokeRad: 44,
		smokeSize: 6,
		smokeColor: Pal.surge,
		lifetime: 34,
	}),
	fragRandomSpread: 0,
	fragBullets: 1,
	fragBullet: globiumLaser,
	despawnShake: 14,
});

const surgeLaser = extend(LaserBulletType, {
	length: 315,
	colors: [Color.valueOf("f2e87960"), Pal.surge, Color.white],
	damage: 180,
	lifetime: 65,
	buildingDamageMultiplier: 0.1,
	lightColor: Pal.surge,
	lightningColor: Pal.surge,
	lightningSpacing: 30,
	lightningLength: 4,
	lightningLengthRand: 10,
	collidesAir: false,
	width: 30,
	lightningDamage: 40,
	lightningAngleRand: 40,
	lightningDelay: 1.1,
	chargeEffect: yellowlasercharge2,
	sideWidth: 0,
	sideLength: 0,
	status: statuses.overload,
	statusDuration: 80,
});

const surgeBall = extend(BasicBulletType, 5, 0, "circle-bullet", {
	splashDamage: 84,
	splashDamageRadius: 38,
	drag: 0.03,
	lifetime: 180,
	shrinkY: 0,
	scaledSplashDamage: true,
	splashDamagePierce: true,
	despawnSound: Sounds.laserblast,
	hitSound: Sounds.none,
	collidesAir: false,
	width: 12,
	height: 12,
	trailWidth: 4,
	trailLength: 24,
	trailChance: 0.1,
	trailEffect: Fx.missileTrail,
	backColor: Pal.surge,
	trailColor: Pal.surge,
	hitColor: Pal.surge,
	frontColor: Color.white,
	hitEffect: Fx.none,
	despawnEffect: extend(ExplosionEffect, {
		waveRad: 40,
		waveLife: 14,
		waveColor: Pal.surge,
		waveStroke: 4,
		sparks: 9,
		sparkRad: 44,
		sparkLen: 6,
		sparkStroke: 2.5,
		sparkColor: Pal.surge,
		smokes: 8,
		smokeRad: 44,
		smokeSize: 6,
		smokeColor: Pal.surge,
		lifetime: 34,
	}),
	fragRandomSpread: 0,
	fragBullets: 1,
	fragBullet: surgeLaser,
	despawnShake: 14,
});

const pierceBlow = extend(BasicBulletType, 5, 0, "circle-bullet", {
	splashDamage: 135,
	splashDamageRadius: 44,
	lifetime: 60,
	shrinkY: 0,
	scaledSplashDamage: true,
	splashDamagePierce: true,
	despawnSound: Sounds.laserblast,
	hitSound: Sounds.laserblast,
	collidesAir: false,
	width: 12,
	height: 12,
	trailWidth: 4,
	trailLength: 24,
	trailChance: 0.1,
	trailEffect: Fx.missileTrail,
	backColor: Pal.surge,
	trailColor: Pal.surge,
	hitColor: Pal.surge,
	frontColor: Color.white,
	hitEffect: Fx.none,
	despawnEffect: extend(ExplosionEffect, {
		waveRad: 40,
		waveLife: 14,
		waveColor: Pal.surge,
		waveStroke: 4,
		sparks: 9,
		sparkRad: 44,
		sparkLen: 6,
		sparkStroke: 2.5,
		sparkColor: Pal.surge,
		smokes: 8,
		smokeRad: 44,
		smokeSize: 6,
		smokeColor: Pal.surge,
		lifetime: 34,
	}),
	fragRandomSpread: 360,
	fragBullets: 10,
	fragBullet: extend(MissileBulletType, 4, 24, "bullet", {
		splashDamage: 30,
		splashDamageRadius: 30,
		lifetime: 120,
		width: 10,
		height: 14,
		shrinkY: 0,
		backColor: Pal.surge,
		trailColor: Pal.surge,
		hitColor: Pal.surge,
		homingPower: 18,
		trailWidth: 2.5,
		trailLength: 24,
		hitEffect: extend(ExplosionEffect, {
			waveColor: Pal.surge,
			sparkColor: Pal.surge,
			smokeColor: Pal.surge,
		}),
		despawnEffect: extend(ExplosionEffect, {
			waveColor: Pal.surge,
			sparkColor: Pal.surge,
			smokeColor: Pal.surge,
		}),
		lightning: 3,
		lightningLength: 5,
		lightningColor: Pal.surge,
		lightningDamage: 12,
		}),
	hitShake: 4,
});

var unlock = extend(StatusEffect, "unlock", {
	show: false,
	healthMultiplier: 0.7,
	damageMultiplier: 1.45,
	speedMultiplier: 1.25,
	reloadMultiplier: 1.3,
	damage: -0.03,
	effect: unlocked,
	permanent: true
});

const pierce = extend(ItemTurret, "pierce", {
    targetAir: false,
    setStats(){
	this.super$setStats();
	this.stats.add(abilitiesFunction, StatValues.abilities(pierceOverdriveValue));
	this.stats.add(auxiliaryUnit, customValue(table => {
        	table.row();
            table.table(Styles.grayPanel, b => {
                b.image(jerk.uiIcon).size(40).pad(10).left().scaling(Scaling.fit);
                b.table(cons(info => {
                    info.add(jerk.localizedName).left();
                    if(Core.settings.getBool("console")){
                        info.row();
                        info.add(jerk.name).left().color(Color.lightGray);
                    }
                }));
                b.button("?", Styles.flatBordert, () => Vars.ui.content.show(jerk)).size(40).pad(10).right().grow().visible(() => jerk.unlockedNow());
            }).growX().pad(5).row();
        }));
    },
});
pierce.ammo(
Items.surgeAlloy, surgeBall,
items.globium, globiumBall
);
pierce.buildType = () => extend(ItemTurret.ItemTurretBuild, pierce, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        this.creload++;
        if(this.isActive() && this.isShooting() && this.hasAmmo()){
        	if(this.creload == 201){
            jerkSpawn.create(this, this.team, this.x, this.y, this.rotation);
            }
            if(this.creload == 300){
			Vars.indexer.allBuildings(this.x, this.y, 150, b => {
				if(b.team == this.team){
					if((b.block.hasPower || b.block.hasItems || b.block.hasLiquids) && b.efficiency > 0 && b.block.canOverdrive){
					b.applyBoost(1.15, 180);
					surgeEmpSpark.at(b.x, b.y, this.angleTo(b), Pal.surge);
                    Fx.chainEmp.at(this.x, this.y, 0, Pal.surge, b);
					}
				}
			});
			Units.nearby(this.team, this.x, this.y, 150, unit => {
				if(unit.checkTarget(false, true)){
				if(Mathf.chance(0.99)){
				unit.apply(StatusEffects.overclock, 300);
				surgeEmpSpark.at(unit.x, unit.y, this.angleTo(unit), Pal.surge);
                Fx.chainEmp.at(this.x, this.y, 0, Pal.surge, unit);
                }
                else if(Mathf.chance(0.01)){
				unit.apply(unlock, 180);
				Sounds.unlock.at(unit);
				accentEmpSpark.at(unit.x, unit.y, this.angleTo(unit), Pal.surge);
                Fx.chainEmp.at(this.x, this.y, 0, Pal.accent, unit);
                }
                }
			});
			}
            if(this.creload == 380){
        	surgeBall.create(this, this.team, this.x, this.y, this.rotation);
            surgeEmpSpark.at(this.x, this.y, this.rotation);
            Sounds.laser.at(this);
            }
            if(this.creload == 500){
            surgeBall.create(this, this.team, this.x, this.y, this.rotation);
            surgeEmpSpark.at(this.x, this.y, this.rotation);
            Sounds.laser.at(this);
            this.applyBoost(1.2, 120);
            }
            if(this.creload == 560){
        	surgeBall.create(this, this.team, this.x, this.y, this.rotation);
            surgeEmpSpark.at(this.x, this.y, this.rotation);
            Sounds.laser.at(this);
            }
            if(this.creload == 590){
        	pierceBlow.create(this, this.team, this.x, this.y, this.rotation);
            surgeEmpSpark.at(this.x, this.y, this.rotation);
            Sounds.laser.at(this);
            this.applyBoost(1.5, 180);
            }
            else if(this.creload >= 590){
            	this.creload = 0;
            }
            }
            }
            });
            

const scarletHit = new Effect(8, e => {
        Draw.color(Color.white, Color.valueOf("ff6e6e"), e.fin());
        Lines.stroke(0.5 + e.fout());
        Lines.circle(e.x, e.y, e.fin() * 5);

        Drawf.light(e.x, e.y, 23, Color.valueOf("ff6e6e"), e.fout() * 0.7);
});

var all = new Seq();
const emptyBul = extend(BulletType, {
	hittable: false,
	collidesGround: false,
	collides: false,
	collidesTiles: false,
	speed: 0,
	damage: 0,
	hitEffect: Fx.none,
	despawnEffect: scarletHit,
	lifetime: 1,
	instantDisappear: true,
	despawned(b){
		this.super$despawned(b);
	
		Units.nearbyEnemies(b.team, b.x, b.y, 160, other => {
			if(!other.dead || other.checkTarget(true, false) || other.type.hittable){
			other.damage(other.maxHealth * 0.3 / 100);
			other.apply(statuses.activeBloodrage, 60 * 8);
			scarletHit.at(other.x, other.y, b.angleTo(other), Color.valueOf("ff6e6e"));
            Fx.chainEmp.at(b.x, b.y, 0, Color.valueOf("ff6e6e"), other);
			}
			});
	}
});

var sparrowDamage = new Stat("sparrow-damage");
var permanent = new Stat("permanent");
const sparrowAbility = extend(Ability, {
	addStats(t){
		t.add(Core.bundle.format("stat.sparrow-damage", 0.3));
		t.row();
		t.add(statuses.activeBloodrage.emoji() + "[stat]" + statuses.activeBloodrage.localizedName + "[lightgray]" + " ~ " + "[stat]" + permanent.localized());
		},
	localized(){
		return Core.bundle.get("ability." + "chain-stat");
		}
});
var abilitiees = new Seq();
const sparrowAbilityStat = abilitiees.add(sparrowAbility);

const sparrow = extend(PowerTurret, "sparrow", {
playerControllable: false,
logicControllable: false,
shootType: emptyBul,
setStats(){
	this.super$setStats();
	this.stats.remove(Stat.ammo);
	this.stats.add(Stat.ammo, StatValues.abilities(sparrowAbilityStat));
}
});

const hawk = extend(PowerTurret, "hawk", {});

const scrStar = extend(PowerTurret, "scarlet-star", {});

const sharpLaser = extend(LaserBulletType, {
	width: 25,
	length: 400,
	sideWidth: 2.5,
	sideAngle: 70,
	colors: [Color.valueOf("8a3340"), Color.valueOf("ff6e6e"), Color.valueOf("ff6e6e")], 
	damage: 300,
	lightColor: Color.valueOf("ff6e6e"),
	status: statuses.activeBloodrage,
});

const injection = extend(ItemTurret, "injection", {
    setStats() {
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(items.ruby, sharpLaser)));
    },
    canOverdrive: false
});
injection.buildType = () => extend(ItemTurret.ItemTurretBuild, injection, {
	creload : 0,
    updateTile() {
        this.super$updateTile();
        let injectionShoot = this.isShooting() && this.hasAmmo() && this.power.status > 0.5;
        
        if(injectionShoot) {
            if(this.creload >= 440) {
                this.creload = 0
                sharpLaser.create(this, this.team, this.x, this.y, this.rotation)
                Fx.none.at(this.x, this.y)
                Sounds.laser.at(this)
                Effect.shake(4, 4, this)
            }
            else this.creload++;
        }
    },
});

const bloodsap = extend(SapBulletType, {
	sapStrength: 0.95,
	damage: 80,
	lifetime: 20,
	length: 400,
	color: Color.valueOf("ff6e6e"),
	hitColor: Color.valueOf("ff6e6e"),
	status: statuses.passiveBloodrage,
	statusDuration: 280,
	width: 0.9,
	ammoMultiplier: 1,
});

const bloodyLaser = extend(LaserBulletType, {
	width: 25,
	length: 200,
	sideWidth: 0,
	colors: [Color.valueOf("ff6e6e70"), Color.valueOf("ff6e6e"), Color.white], 
	damage: 100,
	lightColor: Color.valueOf("ff6e6e"),
	status: statuses.passiveBloodrage,
});

const bloodySpawn = extend(BulletType, 0, 0, {
	hitEffect: Fx.none,
	despawnEffect: Fx.none,
	hittable: false,
	absorbable: false,
	collides: false,
	collidesTiles: false,
	lifetime: 60,
	intervalBullets: 1,
	bulletInterval: 6,
	intervalRandomSpread: 0,
	intervalBullet: extend(BulletType, 0, 0, {
	hitEffect: Fx.none,
	despawnEffect: Fx.none,
	hittable: false,
	absorbable: false,
	lifetime: 1,
	collides: false,
	collidesTiles: false,
	fragBullets: 1,
	fragRandomSpread: 30,
	fragBullet: bloodyLaser,
	despawnSound: Sounds.laser,
	}),
	});

const bloodlust = extend(ItemTurret, "bloodlust", {
    setStats(){
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(items.ruby, bloodsap)));
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(items.ruby, bloodyLaser)));
    },
    canOverdrive: false
});
bloodlust.buildType = () => extend(ItemTurret.ItemTurretBuild, bloodlust, {
	creload : 0,
    updateTile() {
        this.super$updateTile();
        this.creload++;
        let bloodlustShoot = this.isShooting() && this.isActive() && this.hasAmmo() && this.power.status > 0.5;
		if (bloodlustShoot) {
			if (this.creload % 20 == 0 && this.creload != 80) {
	            bloodsap.create(this, this.team, this.x, this.y, this.rotation);
	            Sounds.sap.at(this);
	        }
	        if(this.creload == 80){
		    bloodySpawn.create(this, this.team, this.x, this.y, this.rotation);
		    }
		    else if(this.creload >= 80){
			this.creload = 0;
			}
        }
    },
});

const scarletRhombuses = extend(ParticleEffect, {
	region: "sapphirium-rhombus",
	particles: 6,
	cone: 360,
	length: 16,
	lifetime: Fx.hitBulletColor.lifetime,
	sizeFrom: 5.5,
	sizeTo: 0,
	colorFrom: Color.valueOf("ff6e6e"),
	colorTo: Color.valueOf("ff6e6e"),
});

const weavingBullet = extend(BasicBulletType, {
	width: 12,
	height: 12,
	speed: 5,
	lifetime: 76.4,
	damage: 44,
	weaveMag: 3,
	weaveScale: 3,
	trailWidth: 3,
	homingPower: 0.05,
    homingRange: 96,
	trailLength: 26,
	shrinkX: 0,
    shrinkY: 0,
	trailColor: Color.valueOf("ff6e6e"),
	backColor: Color.valueOf("ff6e6e"),
	frontColor: Color.white,
	status: statuses.passiveBloodrage,
	hitColor: Color.valueOf("ff6e6e"),
	hitEffect: new MultiEffect(Fx.hitBulletColor, scarletRhombuses),
	despawnEffect: new MultiEffect(Fx.hitBulletColor, scarletRhombuses),
	pierce: true,
	pierceBuilding: true,
	pierceArmor: true,
});

const scarletExplosion = extend(ExplosionEffect, {
	waveRad: 24,
	waveColor: Color.valueOf("ff6e6e"),
	waveStroke: 3,
	waveLife: 18,
	sparks: 0,
	smokes: 6,
	lifetime: 45,
	smokeRad: 28,
	smokeColor: Color.valueOf("ff6e6e85"),
	smokeSize: 6.5,
});

const scarletArtilleryBullet = extend(ArtilleryBulletType, {
	width: 12,
	height: 12,
	speed: 3,
	lifetime: 67.34,
	damage: 55,
	splashDamage: 55,
	splashDamageRadius: 24,
	homingPower: 0.02,
    homingRange: 96,
    shrinkX: 0,
    shrinkY: 0,
	trailColor: Color.valueOf("ff6e6e"),
	backColor: Color.valueOf("ff6e6e"),
	frontColor: Color.white,
	status: statuses.passiveBloodrage,
	hitColor: Color.valueOf("ff6e6e"),
	hitEffect: scarletExplosion,
	despawnEffect: scarletExplosion,
	collides: true,
	collidesTiles: false,
	knockback: 0.8,
	inaccuracy: 6,
	pierceArmor: true,
});

const scarletBullet = extend(BasicBulletType, {
	width: 12,
	height: 14,
	speed: 4.5,
	lifetime: 24.56,
	damage: 35,
	shrinkX: 0,
	shrinkY: 0,
	homingPower: 0.02,
    homingRange: 96,
	backColor: Color.valueOf("ff6e6e"),
	frontColor: Color.white,
	status: statuses.passiveBloodrage,
	hitColor: Color.valueOf("ff6e6e"),
	hitEffect: Fx.hitBulletColor,
	despawnEffect: Fx.hitBulletColor,
	pierceArmor: true,
	pierce: true,
	pierceBuilding: true,
	pierceCap: 1,
});

const aorta = extend(ItemTurret, "aorta", {
    setStats() {
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(items.ruby, weavingBullet)));
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(items.ruby, scarletArtilleryBullet)));
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(items.ruby, scarletBullet)));
    },
    shootY: -3.75,
    canOverdrive: false,
    envDisabled: Env.scorching
});
aorta.buildType = () => extend(ItemTurret.ItemTurretBuild, aorta, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let aortaShoot = this.isShooting() && this.hasAmmo() && this.power.status > 0.5;

        if(aortaShoot) {
            this.creload++;
            if(this.creload == 350) {
                Sounds.release.at(this);
                var rsh = Mathf.random(0, 9);
                for(var i = 0; i < 7 + rsh; i++) {
                    let angleOffset = i * 1.77777778 - (9 - 1) * 1.77777778 / 2;
                    var weavingBullet_obj = weavingBullet.create(this, this.team, this.x, this.y, this.rotation + angleOffset);
                    weavingBullet_obj.vel.scl(Mathf.random(0.7,1.5));
                }
                for(var i = 0; i < 6 + rsh; i++) {
                    let a = this.rotation + Mathf.range(27 / 2);
                    let len = Mathf.random(1, 7);
                    var scarletArtilleryBullet_obj = scarletArtilleryBullet.create(this, this.team, this.x + Angles.trnsx(a, len), this.y + Angles.trnsy(a, len), a, Mathf.random(1.5, 1), Mathf.random(1.5, 1));
                    scarletArtilleryBullet_obj.vel.scl(Mathf.random(0.9,1.4));
                }
                for(var i = 0; i < 11 + rsh; i++) {
                    let aa = this.rotation + Mathf.range(15 / 2);
                    let lenn = Mathf.random(1, 7);
	                var scarletBullet_obj = scarletBullet.create(this, this.team, this.x + Angles.trnsx(aa, lenn), this.y + Angles.trnsy(aa, lenn), aa, Mathf.random(1.5, 1), Mathf.random(1.5, 1));
                    scarletBullet_obj.vel.scl(Mathf.random(0.9,1.7));
                }
            }
            else if(this.creload >= 350) {
                this.creload = 0
            }
        }
        else this.creload = 0;
    }
});

const goldenPollination = extend(StatusEffect, "golden-pollination", {
	healthMultiplier: 1.4,
	speedMultiplier: 0.3,
	reloadMultiplier: 0.85
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
    particles: 40,
    sizeFrom: 4,
    sizeTo: 0,
    lifetime: 90,
    length: 220,
    interp: Interp.pow5Out,
    sizeInterp: Interp.pow5Out,
    cone: 0,
    colorFrom: Pal.surge,
    colorTo: Color.valueOf("d67b65"),
});

const goldenFireBullet = extend(BulletType, {
	damage: 27,
	lifetime: 25.2,
	pierceCap: 2,
	pierce: true,
	pierceBuilding: true,
	keepVelocity: false,
	hitSize: 7,
	status: goldenPollination,
	statusDuration: 250,
	hitEffect: goldenHit,
	despawnEffect: Fx.none,
	frontColor: Pal.surge,
	backColor: Color.valueOf("d67b65"),
	speed: 5,
});
	
const enlight = extend(ItemTurret, "enlightenment", {
    setStats() {
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(this, goldenFireBullet)));
    },
});
enlight.buildType = () => extend(ItemTurret.ItemTurretBuild, enlight, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let fx = this.x + Mathf.range(-2.5, 2.5);
        let fy = this.y + Mathf.range(-6.5, 6.5);
        let enlightShoot = this.isShooting() && this.hasAmmo();

        if (enlightShoot) {
            this.creload++;
            if (this.creload >= 12) {
                this.creload = 0;
                goldenFireBullet.create(this, this.team, fx, fy, this.rotation);
                goldenFire.at(fx, fy, this.rotation);
                Sounds.flame.at(this);
            }
        }
    },
});

const contLaser = extend(ContinuousLaserBulletType, {
    damage: 3,
    length: 105,
    shake: 0,
    width: 4,
    pierceArmor: true,
    colors: [Pal.surge, Pal.surge, Pal.surge, Color.white],
});            
            
const infiniteLSA = extend(ContinuousTurret, "infinite-laser-array", {
    health: 800,
    rotateSpeed: 5,
    recoil: 0,
    shake: 0,
    range: 90,
    shootEffect: Fx.none,
    shootSound: Sounds.laserbig,
    loopSound: Sounds.beam,
    loopSoundVolume: 0.8,
    shootType: contLaser,
});
infiniteLSA.consumePower(5);

const goldHorn = extend(PowerTurret, "gold-horn", {});

const shockBlast = extend(ExplosionEffect, {
	waveRad: 12,
	waveLife: 8,
	waveStroke: 3,
	waveColor: Pal.surge,
	sparks: 8,
	sparkRad: 18,
	sparkColor: Pal.surge,
	sparkLen: 6,
	sparkStroke: 3,
	smokes: 0,
});

const whiteLightning = extend(LightningBulletType, {
	lightningLength: 6,
	lightningColor: Color.white,
	damage: 8,
	hitColor: Color.white,
});

const yellowLightning = extend(LightningBulletType, {
	lightningLength: 6,
	lightningColor: Pal.surge,
	damage: 8,
	hitColor: Pal.surge,
});

const rightBullet = extend(BasicBulletType, {
	width: 18,
	height: 22,
	speed: 7,
	lifetime: 24.29,
	damage: 44,
	pierce: true,
	pierceCap: 2,
	pierceArmor: true,
	backColor: Pal.surge,
	frontColor: Color.white,
	trailWidth: 3.5,
	trailLength: 30,
	trailColor: Pal.surge,
	status: StatusEffects.shocked,
	statusDuration: 60,
	intervalBullet: whiteLightning,
	bulletInterval: 5,
	intervalAngle: 90,
	intervalRandomSpread: 180,
	intervalBullets: 3,
	hitEffect: shockBlast,
	despawnEffect: shockBlast,
});

const leftBullet = extend(BasicBulletType, {
	width: 18,
	height: 22,
	speed: 7,
	lifetime: 24.29,
	damage: 44,
	pierce: true,
	pierceCap: 2,
	pierceArmor: true,
	backColor: Pal.surge,
	frontColor: Color.white,
	trailWidth: 3.5,
	trailLength: 30,
	trailColor: Pal.surge,
	status: StatusEffects.shocked,
	statusDuration: 60,
	intervalBullet: yellowLightning,
	bulletInterval: 5,
	intervalAngle: -90,
	intervalRandomSpread: 180,
	intervalBullets: 3,
	hitEffect: shockBlast,
	despawnEffect: shockBlast,
});

const brazier = extend(ContinuousLiquidTurret, "brazier", {
    setStats() {
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(liquids.surgeMass, rightBullet)));
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(liquids.surgeMass, leftBullet)));
    },
    canOverdrive: false,
    envDisabled: Env.scorching
});
brazier.buildType = () => extend(ContinuousLiquidTurret.ContinuousLiquidTurretBuild, brazier, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let brX = this.x - 1;
        let brX2 = this.x + 1;
        let brazierShoot = this.isShooting() && this.power.status > 0.5 && this.hasAmmo();

        if(brazierShoot) {
            this.creload++;
            if(this.creload >= 16) {
                this.creload = 0;
                rightBullet.create(this, this.team, brX2, this.y, this.rotation);
                leftBullet.create(this, this.team, brX, this.y, this.rotation);
                Sounds.spark.at(this);
            }
        }
    },
});

const perfection = extend(ItemTurret, "perfection", {});

//Water Faction
const splash = extend(LiquidTurret, "splash", {});
const rainfall = extend(LiquidTurret, "rainfall", {});
const waterdrop = extend(LiquidTurret, "waterdrop", {});

//Fire Faction
const heat = extend(ItemTurret, "heat", {
    shootY: 7.25
});

const fireWave = extend(WaveEffect, {
	sizeTo: 25,
	strokeFrom: 4,
	lifetime: 15,
	colorFrom: Color.valueOf("f58758"),
	colorTo: Color.valueOf("f58758"),
});

const fireSparks = extend(ParticleEffect, {
	particles: 18,
	line: true,
	lenFrom: 6,
	lenTo: 0,
	strokeFrom: 3,
	strokeTo: 0.3,
	lifetime: 35,
	colorFrom: Color.valueOf("f58758"),
	colorTo: Color.valueOf("f58758"),
	length: 20,
	interp: Interp.circleOut,
	sizeInterp: Interp.circleOut
});

const fireSmokeOrange = extend(ParticleEffect, {
	particles: 15,
	sizeFrom: 10,
	lifetime: 120,
	colorFrom: Color.valueOf("f58758"),
	colorTo: Color.valueOf("f58758"),
	length: 20,
	interp: Interp.circleOut,
	sizeInterp: Interp.circleOut
});

const fireSmokeDark = extend(ParticleEffect, {
	particles: 15,
	sizeFrom: 10,
	lifetime: 120,
	colorFrom: Color.valueOf("565666"),
	colorTo: Color.valueOf("56566600"),
	length: 20,
	interp: Interp.circleOut,
	sizeInterp: Interp.circleOut
});

const fireMulti = new MultiEffect(fireSmokeDark, fireSmokeOrange, fireSparks, fireWave);

const glaiveBomber = extend(Weapon, "glaive-bomber", {
	y: -5 / 4,
	x: 15 / 4,
	alternate: true,
	mirror: true,
	inaccuracy: 5,
	showStatSprite: false,
	rotate: false,
	reload: 8,
	bullet: extend(BasicBulletType, 12, 8, "bullet", {
		width: 7,
		height: 16,
		lifetime: 27.09,
		backColor: Color.valueOf("feb380"),
		hitColor: Color.valueOf("feb380"),
		frontColor: Color.valueOf("ea8878"),
		trailColor: Color.valueOf("feb380"),
		trailWidth: 1.8,
		trailLength: 24,
		drag: 0.01,
		homingPower: 10,
		hitEffect: Fx.hitBulletColor,
		despawnEffect: Fx.hitBulletColor,
		knockback: 0.5,
		status: StatusEffects.burning,
		collidesGround: false,
		fragBullets: 5,
		fragRandomSpread: 25,
		fragLifeMin: 1.5,
		fragLifeMax: 2,
		fragVelocityMin: 1.5,
		fragVelocityMax: 2,
		fragBullet: extend(BasicBulletType, 4, 8, "bullet", {
		width: 7,
		height: 7,
		lifetime: 60,
		backColor: Color.valueOf("feb380"),
		hitColor: Color.valueOf("feb380"),
		frontColor: Color.valueOf("ea8878"),
		trailColor: Color.valueOf("feb380"),
		trailWidth: 1.5,
		trailLength: 14,
		homingPower: 3,
		hitEffect: Fx.hitBulletColor,
		despawnEffect: Fx.hitBulletColor,
		knockback: 1,
		status: StatusEffects.burning,
		collidesGround: false,
		})
	})
});

const glaiveDestruction = extend(Weapon, "glaive-destruction", {
	x: 0,
	y: 0,
	rotate: false,
	alwaysShooting: true,
	shootSound: Sounds.none,
	display: false,
	shoot: extend(ShootPattern, {
		firstShotDelay: 169
	}),
	reload: 170,
	bullet: extend(BulletType, {
		speed: 0,
		damage: 0,
		lifetime: 0,
		hitEffect: Fx.none,
		despawnEffect: Fx.none,
		shootEffect: Fx.none,
		smokeEffect: Fx.none,
		instantDisappear: true,
		killShooter: true,
		hittable: false,
		absorbable: false,
	})
});

const glaiveDeathWave = extend(WaveEffect, {
	lifetime: 15,
	sizeTo: 15,
	sizeFrom: 0.5,
	colorFrom: Color.valueOf("feb380"),
	colorTo: Color.valueOf("feb380"),
});

const glaiveDeathSparks = extend(ParticleEffect, {
	line: true,
	particles: 10,
	lenFrom: 6,
	lenTo: 0,
	lifetime: 30,
	interp: Interp.circleOut,
	sizeInterp: Interp.circleOut,
	length: 20,
	colorFrom: Color.valueOf("feb380"),
	colorTo: Color.valueOf("feb380"),
});

const glaiveDeathSmoke = extend(ParticleEffect, {
	particles: 10,
	sizeFrom: 6,
	sizeTo: 0,
	lifetime: 60,
	interp: Interp.circleOut,
	sizeInterp: Interp.circleOut,
	length: 30,
	colorFrom: Color.valueOf("feb380"),
	colorTo: Color.valueOf("feb38000"),
});

const glaiveDeath = new MultiEffect(glaiveDeathWave, glaiveDeathSparks, glaiveDeathSmoke);

const glaive = extend(UnitType, "glaive", {
	hitSize: 12,
	health: 240,
	speed: 0,
	engineColor: Color.valueOf("feb380"),
	engineOffset: 27 / 4,
	outlines: false,
	deathExplosionEffect: glaiveDeath,
	rotateSpeed: 10,
	engineSize: 2.5,
	flying: true,
	targetGround: false,
	playerControllable: false,
	drawCell: false,
	range: 325,
});
glaive.weapons.addAll(glaiveBomber, glaiveDestruction);
glaive.immunities.addAll(StatusEffects.burning, StatusEffects.melting, statuses.flammability, statuses.superMelting, statuses.flaming, statuses.smallFlaming);
glaive.constructor = () => extend(UnitEntity, {});

const glaiveDespawnBullet = extend(BulletType, {
	damage: 0,
	lifetime: 1,
	speed: 0,
	hitEffect: Fx.none,
	despawnEffect: Fx.none,
	hittable: false,
	absorbable: false,
	despawnUnit: glaive,
	despawnUnitCount: 1,
	despawnUnitRadius: 0,
	collides: false,
	collidesTiles: false,
	collidesGround: false,
	collidesAir: false,
	despawnSound: Sounds.respawn,
});

const cloudBreaker = extend(ItemTurret, "cloud-breaker", {
setStats(){
	this.super$setStats();
	this.stats.add(auxiliaryUnit, customValue(table => {
        	table.row();
            table.table(Styles.grayPanel, b => {
                b.image(glaive.uiIcon).size(40).pad(10).left().scaling(Scaling.fit);
                b.table(cons(info => {
                    info.add(glaive.localizedName).left();
                    if(Core.settings.getBool("console")){
                        info.row();
                        info.add(glaive.name).left().color(Color.lightGray);
                    }
                }));
                b.button("?", Styles.flatBordert, () => Vars.ui.content.show(glaive)).size(40).pad(10).right().grow().visible(() => glaive.unlockedNow());
            }).growX().pad(5).row();
        }));
    },
});
cloudBreaker.buildType = () => extend(ItemTurret.ItemTurretBuild, cloudBreaker, {
	creload: 0,
	updateTile(){
		this.super$updateTile();
		this.creload++;
		if(this.creload == 180){
		Units.nearbyEnemies(this.team, this.x, this.y, 325, other => {
				fireMulti.at(this.x, this.y, this.rotation);
				glaiveDespawnBullet.create(this, this.team, this.x, this.y, this.rotation);
		});
		}
		else if(this.creload >= 180){
			this.creload = 0;
			}
}
});

const flameHit = extend(ParticleEffect, {
	particles: 5,
        cone: 360,
        length: 9,
        lifetime: 40,
        sizeFrom: 5,
        sizeTo: 0,
        interp: Interp.pow2Out,
        sizeInterp: Interp.pow2Out,
        colorFrom: Pal.lighterOrange,
        colorTo: Pal.lightishOrange,
});

const fireBullet = extend(BasicBulletType, {
    width: 12,
    height: 17,
    speed: 6,
    lifetime: 50,
    damage: 20,
    hitEffect: new MultiEffect(Fx.hitBulletColor, flameHit),
    despawnEffect: new MultiEffect(Fx.hitBulletColor, flameHit),
    backColor: Pal.lightishOrange,
    frontColor: Pal.lighterOrange,
    hitColor: Pal.lighterOrange,
    trailColor: Pal.lightishOrange,
    trailWidth: 2,
    trailLength: 6,
});

const flame = extend(ItemTurret, "flame", {
    setStats(){
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(this, fireBullet)));
    },
    envDisabled: Env.scorching
});
flame.buildType = () => extend(ItemTurret.ItemTurretBuild, flame, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let flameShoot = this.isShooting() && this.hasAmmo();

        if(flameShoot) {
            if(this.creload >= 9) {
                this.creload = 0;
                fireBullet.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.shoot.at(this);
            }
            else this.creload++;
        }
    },
});

const needle = extend(ItemTurret, "needle", {});

const blastBullet = extend(BasicBulletType, {
	width: 9,
	height: 9,
	speed: 5,
	lifetime: 50,
	trailWidth: 2,
	trailLength: 16,
	shrinkY: 0,
	hitEffect: Fx.blastExplosion,
	despawnEffect: Fx.blastExplosion,
	damage: 55,
	status: StatusEffects.blasted,
	weaveMag: 8,
	weaveScale: 4,
	weaveRandom: true,
	pierceArmor: true
});

const fallen = extend(ContinuousLiquidTurret, "fallen", {
	setStats(){
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(liquids.creotite, blastBullet)));
    },
    canOverdrive: false
});
fallen.buildType = () => extend(ContinuousLiquidTurret.ContinuousLiquidTurretBuild, fallen, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let fallenShoot = this.isShooting() && this.hasAmmo() && this.power.status > 0.5;

        if (fallenShoot) {
            this.creload++;
            if (this.creload >= 9) {
                this.creload = 0;
                for (let i = 0; i < 2; i++) {
                    blastBullet.create(this, this.team, this.x, this.y, this.rotation)
                }
                Sounds.shootSnap.at(this)
            }
        }
    },
});

//Acid Faction
const melinite = extend(PowerTurret, "melinite", {});
const toxin = extend(PowerTurret, "toxin", {});
const reagent = extend(ItemTurret, "reagent", {});
const endoxin = extend(ItemTurret, "endoxin", {
    envDisabled: Env.scorching
});

const corroding = extend(ItemTurret, "corroding", {});

//Lightning Faction
const trembling = extend(PowerTurret, "trembling", {});

//Shadow Faction
const decay = extend(ItemTurret, "decay", {
    envDisabled: Env.scorching
});

const absorption = extend(UnitType, "absorption", {
	speed: 0,
	hitSize: 0,
	health: 720,
	rotateSpeed: 5,
	itemCapacity: 0,
	physics: false,
	engineSize: 0,
	drawMinimup: false,
	drawShields: false,
	isEnemy: false,
	playerControllable: false,
	targetable: false,
    hittable: false,
    outlineColor: Pal.darkOutline,
    drawBody: false,
    drawCell: false,
});
absorption.constructor = () => extend(UnitEntity, {});

const middleLaser = extend(LaserBulletType, {
	damage: 25,
	length: 100,
	drawSize: 420,
	pierceCap: 3,
	pierceArmor: true,
	sideWidth: 0,
    sideLength: 0,
    colors: [Color.valueOf("665c9e75"), Color.valueOf("8b73c7"), Color.valueOf("a488eb")],
    status: StatusEffects.sapped,
    statusDuration: 60
});

const adynamia = extend(ItemTurret, "adynamia", {
    size: 3,
    setStats(){
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(this, middleLaser)));
        this.stats.add(auxiliaryUnit, customValue(table => {
        	table.row();
            table.table(Styles.grayPanel, b => {
                b.image(absorption.uiIcon).size(40).pad(10).left().scaling(Scaling.fit);
                b.table(cons(info => {
                    info.add(absorption.localizedName).left();
                    if(Core.settings.getBool("console")){
                        info.row();
                        info.add(absorption.name).left().color(Color.lightGray);
                    }
                }));
                b.button("?", Styles.flatBordert, () => Vars.ui.content.show(absorption)).size(40).pad(10).right().grow().visible(() => absorption.unlockedNow());
            }).growX().pad(5).row();
        }));
    },
    canOverdrive: false
});
adynamia.buildType = () => extend(ItemTurret.ItemTurretBuild, adynamia, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let shootingA = this.isShooting() && this.hasAmmo() && this.power.status > 0.5;
        
        if(shootingA) {
            this.creload++;
            if(this.creload % 80 == 0 && this.creload != 1081) {
                middleLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            else if(this.creload == 1081) {
            	if(!Vars.net.client()){
                absorption.spawn(this.team, this.x, this.y);
                }
            }
            else if(this.creload >= 1081) {
                this.creload = 0;
            }
        }
    }
});

const abyssForceField = extend(ForceFieldAbility, 2 * Vars.tilesize, 30 / 60, 800, 60 * 5, {
	sides: 5,
	localized(){
		return Core.bundle.get("ability." + "forcefield");
		}
});

const selfDestroy = extend(Weapon, "self-destroy", {
	x: 0,
	y: 0,
	rotate: false,
	alwaysShooting: true,
	display: false,
	shootSound: Sounds.none,
	shoot: extend(ShootPattern, {
		firstShotDelay: 1579
	}),
	reload: 1580,
	bullet: extend(BulletType, {
		speed: 0,
		damage: 1,
		lifetime: 0,
		hitEffect: Fx.none,
		despawnEffect: Fx.none,
		shootEffect: Fx.none,
		smokeEffect: Fx.none,
		instantDisappear: true,
		killShooter: true,
		hittable: false,
		absorbable: false,
	})
});

const abyssMissile = extend(MissileBulletType, {
		lightColor: Pal.sapBullet,
		damage: 28,
		speed: 8,
		lifetime: 37.5,
		keepVelocity: false,
		inaccuracy: 6,
		homingPower: 7,
		weaveScale: 8,
		weaveMag: 2,
		drag: -0.003,
		buildingDamageMultiplier: 0.1,
		splashDamage: 34,
		splashDamageRadius: 20,
		hitEffect: extend(ExplosionEffect, {
			waveColor: Pal.sapBullet,
			sparks: 5,
			sparkColor: Pal.sapBullet,
			smokes: 5,
			smokeColor: Pal.sapBullet
		}),
		despawnEffect: extend(ExplosionEffect, {
			waveColor: Pal.sapBullet,
			sparks: 5,
			sparkColor: Pal.sapBullet,
			smokes: 5,
			smokeColor: Pal.sapBullet
		}),
		shootEffect: Fx.shootSmallColor,
		backColor: Pal.sapBulletBack,
	    hitColor: Pal.sapBullet,
	    frontColor: Pal.sapBullet,
		trailColor: Pal.sapBullet,
		absorbable: false,
		pierceArmor: true,
	});

const abyssSwarmer = extend(Weapon, "abyss-swarmer", {
	x: 10 / 4,
	y: 25 / 4,
	reload: 80,
	recoil: 0,
	rotate: false,
	mirror: false,
	inaccuracy: 3,
	shootSound: Sounds.missile,
	shoot: extend(ShootPattern, {
		shots: 4,
   }),
	bullet: abyssMissile,
	});
	
const abyssPiercerBullet = extend(BasicBulletType, 15, 80, {
	pierce: true,
	pierceBuilding: true,
	pierceDamageFactor: 0.25,
	width: 10,
	height: 14,
	lifetime: 30,
	keepVelocity: false,
	drag: 0.03,
	trailWidth: 2.5,
	trailLength: 20,
	hittable: false,
	reflectable: false,
	absorbable: false,
	pierceArmor: true,
	backColor: Pal.sapBulletBack,
	frontColor: Pal.sapBullet,
	trailColor: Pal.sapBullet,
	hitColor: Pal.sapBullet,
	lightColor: Pal.sapBullet,
	shootEffect: new MultiEffect(Fx.shootSmallColor, extend(WaveEffect, {
		sizeFrom: 0,
		sizeTo: 8,
		strokeFrom: 2,
		strokeTo: 0,
		lifetime: 10,
		colorFrom: Pal.sapBullet,
		colorTo: Pal.sapBulletBack,
		})),
	hitEffect: extend(ExplosionEffect, {
		waveRad: 18,
		waveLife: 8,
		waveStroke: 2,
		waveColor: Pal.sapBullet,
		sparks: 8,
		sparkRad: 14,
		sparkLen: 10,
		sparkStroke: 2,
		sparkColor: Pal.sapBullet,
		smokes: 6,
		smokeRad: 14,
		smokeSize: 4,
		smokeColor: Pal.sapBullet,
		}),
	despawnEffect: extend(ExplosionEffect, {
		waveRad: 18,
		waveLife: 8,
		waveStroke: 2,
		waveColor: Pal.sapBullet,
		sparks: 8,
		sparkRad: 14,
		sparkLen: 10,
		sparkStroke: 2,
		sparkColor: Pal.sapBullet,
		smokes: 6,
		smokeRad: 14,
		smokeSize: 4,
		smokeColor: Pal.sapBullet,
		}),
		});
		
const abyssPiercerDecalPart = new RegionPart("-decal-outline");
abyssPiercerDecalPart.mirror = false;
abyssPiercerDecalPart.outline = false;
abyssPiercerDecalPart.progress = DrawPart.PartProgress.warmup;
abyssPiercerDecalPart.under = true;

const abyssPiercer = extend(Weapon, "sapphirium-abyss-spawn-left-side", {
	x: 0,
	y: 0,
	mirror: false,
	top: false,
	layerOffset: -0.001,
	reload: 180,
	recoil: 4,
	recoilTime: 170,
	shootSound: Sounds.bolt,
	shootCone: 5,
	rotate: false,
	bullet: abyssPiercerBullet,
	shootX: -10 / 4,
	shootY: 28 / 4,
	});
abyssPiercer.parts.add(abyssPiercerDecalPart);

const abyssSpawnDecalPart = new RegionPart("-decal-outline");
abyssSpawnDecalPart.mirror = false;
abyssSpawnDecalPart.outline = false;
abyssSpawnDecalPart.progress = DrawPart.PartProgress.warmup;
abyssSpawnDecalPart.under = true;

const abyssSpawn = extend(UnitType, "abyss-spawn", {
            	speed: 0,
                rotateSpeed: 6,
                hitSize: 14,
                health: 640,
                armor: 5,
                outlineColor: Color.valueOf("25262e"),
                range: 300,
                playerControllable: false,
                useUnitCap: false,
                flying: true,
                isEnemy: false,
                drawCell: false,
                buildSpeed: 1.5,
                buildRange: 185,
                engineOffset: 15 / 4,
	            engineSize: 10 / 4,
});
abyssSpawn.weapons.addAll(abyssSwarmer, abyssPiercer, selfDestroy);
abyssSpawn.abilities.add(abyssForceField);
abyssSpawn.constructor = () => extend(UnitEntity, {});
abyssSpawn.aiController = () => extend(BuilderAI, {});
abyssSpawn.immunities.addAll(StatusEffects.sapped, statuses.unleash);
abyssSpawn.parts.add(abyssSpawnDecalPart);

var abyssHit = extend(WaveEffect, {
            	sizeFrom: 50,
                sizeTo: 0,
                strokeFrom: 5,
                strokeTo: 0,
                colorFrom: Pal.sapBullet,
                colorTo: Pal.sapBullet,
                lifetime: 15,
             });

var abyssHit2 = extend(WaveEffect, {
            	sizeFrom: 50,
                sizeTo: 0,
                strokeFrom: 5,
                strokeTo: 0,
                colorFrom: Pal.sapBullet,
                colorTo: Pal.sapBullet,
                lifetime: 15,
                startDelay: 5,
             });

var abyssHit3 = extend(WaveEffect, {
            	sizeFrom: 50,
                sizeTo: 0,
                strokeFrom: 5,
                strokeTo: 0,
                colorFrom: Pal.sapBullet,
                colorTo: Pal.sapBullet,
                lifetime: 15,
                startDelay: 10,
             });
            
var abyssHit4 = extend(WaveEffect, {
            	sizeFrom: 50,
                sizeTo: 0,
                strokeFrom: 5,
                strokeTo: 0,
                colorFrom: Pal.sapBullet,
                colorTo: Pal.sapBullet,
                lifetime: 15,
                startDelay: 15,
             });
             
var abyssExplosion = extend(ExplosionEffect, {
	waveColor: Pal.sapBullet,
	waveRad: 50,
	waveLife: 20,
	sparks: 6,
	sparkColor: Pal.sapBullet,
	sparkRad: 55,
	smokes: 5,
	smokeColor: Pal.sapBullet,
	smokeRad: 55,
});

var abyssExplosionBig = extend(ExplosionEffect, {
	waveColor: Pal.sapBullet,
	waveRad: 150,
	waveRadBase: 34,
	waveLife: 15,
	sparks: 18,
	sparkColor: Pal.sapBullet,
	sparkRad: 160,
	sparkRadBase: 34,
	sparkLen: 8,
	smokes: 0,
});
             
var abyssMulti = new MultiEffect(abyssExplosion, abyssHit, abyssHit2, abyssHit3, abyssHit4);
             
var groundDamage = new Stat("grounddamage");
var spawnInterval = new Stat("spawninterval", StatCat.function);

const shadowPerish = extend(Ability, {
	addStats(t){
		t.add(Core.bundle.format("bullet.damage", 114.8));
		t.row();
		t.add("[stat]" + "+" + 15 + "%" + " [lightgray]" + groundDamage.localized());
		t.row();
		t.add("[stat]" + Stat.range.localized() + ": [white]" + Strings.autoFixed(300 / Vars.tilesize, 2));
		t.row();
		t.add(statuses.stun.emoji() + " " + statuses.stun.localizedName);
		},
		localized(){
			return Core.bundle.get("ability." + "shadowperish");
			}
		});

const abyssSphere = extend(BasicBulletType, 2.5, 60, "circle-bullet", {
	width: 14,
	height: 14,
	splashDamage: 88,
	splashDamageRadius: 24,
	splashDamagePierce: true,
	collidesAir: false,
	homingPower: 0.5,
	lifetime: 300 / 2.5,
	trailChance: 0.3,
	hitShake: 4,
	backColor: Pal.sapBulletBack,
	hitColor: Pal.sapBullet,
	frontColor: Pal.sapBullet,
	hitEffect: extend(ExplosionEffect, {
		waveRad: 24,
		waveColor: Pal.sapBullet,
		waveLife: 14,
		waveStroke: 4,
		sparks: 6,
		sparkLen: 7,
		sparkStroke: 1.5,
		sparkRad: 30,
		sparkColor: Pal.sapBullet,
		smokes: 7,
		smokeSize: 7,
		smokeRad: 30,
		smokeColor: Color.valueOf("bf92f960"),
		lifetime: 80
	}),
	despawnEffect: extend(ExplosionEffect, {
		waveRad: 24,
		waveColor: Pal.sapBullet,
		waveLife: 14,
		waveStroke: 4,
		sparks: 6,
		sparkLen: 7,
		sparkStroke: 1.5,
		sparkRad: 30,
		sparkColor: Pal.sapBullet,
		smokes: 7,
		smokeSize: 7,
		smokeRad: 30,
		smokeColor: Color.valueOf("bf92f960"),
		lifetime: 80
	}),
	trailEffect: extend(ParticleEffect, {
		particles: 16,
		lifetime: 60,
		length: -30,
		cone: 15,
		sizeFrom: 7,
		sizeTo: 0,
		colorFrom: Pal.sapBullet,
		colorTo: Color.valueOf("bf92f900"),
		interp: Interp.pow5Out,
		sizeInterp: Interp.pow5Out,
		rotWithParent: true,
	}),
	status: StatusEffects.sapped,
	statusDuration: 120,
	/*fragBullets: 4,
	fragRandomSpread: 0,
	fragSpread: 90,
	fragBullet: extend(BulletType, 0, 0, {
		hittable: false,
		reflectable: false,
		absorbable: false,
		collides: false,
		collidesTiles: false,
		hitEffect: Fx.none,
		despawnEffect: */
});

const abyssSphereBackSpawn = extend(BulletType, 0, 0, {
	lifetime: 1,
	hitEffect: Fx.none,
	despawnEffect: Fx.none,
	absorbable: false,
	reflectable: false,
	hittable: false,
	collides: false,
	collidesTiles: false,
	fragBullet: abyssSphere,
	fragBullets: 1,
	fragAngle: 180,
	fragRandomSpread: 0,
});
	
const shadowAbilities = new Seq();
const shadowsPower = shadowAbilities.addAll(shadowPerish);

var abyssParticles = extend(ParticleEffect, {
        	particles: 3,
            cone: 45,
            length: 16,
            lifetime: 45,
            sizeFrom: 5,
            sizeTo: 0,
            interp: Interp.pow2Out,
            sizeInterp: Interp.pow2Out,
            colorFrom: Pal.sapBullet,
            colorTo: Pal.sapBullet,
            });
        var abyssRadialEffect = extend(RadialEffect, {
        	rotationSpacing: 10,
            amount: 36,
            lengthOffset: 32,
            effect: abyssParticles,
        });

const abyss = extend(PowerTurret, "abyss", {
	playerControllable: false,
    shootType: extend(BulletType, {
    	damage: 0,
        speed: 16,
        lifetime: 1,
        hitEffect: Fx.none,
        despawnEffect: extend(WaveEffect, {
            strokeFrom: 3,
            strokeTo: 0,
            lifetime: 45,
            sizeFrom: 0,
            sizeTo: 16,
            colorFrom: Pal.sapBullet,
            colorTo: Pal.sapBullet,
        }),
        collides: false,
        collidesTiles: false,
        absorbable: false,
        hittable: false,
        despawnSound: Sounds.respawn,
        fragRandomSpread: 0,
        fragSpread: 90,
        fragBullets: 1,
        fragBullet: extend(BulletType, {
        	speed: 0,
            lifetime: 1,
            damage: 0,
            spawnUnit: abyssSpawn,
        }),
        }),
        shoot: extend(ShootSpread, {
        	shots: 3,
            spread: 90,
        }),
        setStats(){
        	this.super$setStats();
            this.stats.remove(Stat.range);
            this.stats.remove(Stat.ammo);
            this.stats.add(spawnInterval, (1600 / 60), StatUnit.seconds);
            this.stats.add(abilitiesFunction, StatValues.abilities(shadowsPower));
            this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, abyssMissile)));
            this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, abyssSphere)));
            this.stats.add(auxiliaryUnit, customValue(table => {
        	table.row();
            table.table(Styles.grayPanel, b => {
                b.image(abyssSpawn.uiIcon).size(40).pad(10).left().scaling(Scaling.fit);
                b.table(cons(info => {
                    info.add(abyssSpawn.localizedName).left();
                    if(Core.settings.getBool("console")){
                        info.row();
                        info.add(abyssSpawn.name).left().color(Color.lightGray);
                    }
                }));
                b.button("?", Styles.flatBordert, () => Vars.ui.content.show(abyssSpawn)).size(40).pad(10).right().grow().visible(() => abyssSpawn.unlockedNow());
            }).growX().pad(5).row();
        }));
    }
});
abyss.buildType = () => extend(PowerTurret.PowerTurretBuild, abyss, {
    creload: 0,
	draw(){
		this.super$draw();
		if(this.hasAmmo() && this.power.status > 0 && this.liquids.currentAmount() > 0){
		Draw.z(Layer.effect);
        Draw.color(Pal.sapBullet);
            
        var orbRadius = 4 * (1 + Mathf.absin(20, 0.1));
        
        var rad = orbRadius < 0 ? 0 : Mathf.lerp(0, orbRadius, 1);
        var str = (2 + Mathf.absin(20, 0.1)) < 0 ? 0 : Mathf.lerp(0, (2 + Mathf.absin(20, 0.1)), 1);
   
        Fill.circle(this.x, this.y, rad);
        Draw.color();
        Fill.circle(this.x, this.y, rad / 2);

        Lines.stroke(str, Pal.sapBullet);
        
        for(var i = 0; i < 4; i++){
        var rot = this.rotation + i * 360/4 - Time.time * 1;
        Lines.arc(this.x, this.y, rad + 6, 0.14, rot);
        }
        
        Units.nearbyEnemies(this.team, this.x, this.y, 300, other => {
        	if((other.type.targetable || other.type.hittable) && other.team != Team.derelict){
        Draw.z(Layer.effect);
        Draw.color(Pal.sapBullet);
        Lines.stroke(str);
        for(var i = 0; i < 8; i++){
        var rot2 = this.rotation + i * 360/8 - Time.time * 1;
        Lines.arc(this.x, this.y, 300, 0.14, rot2);
        }
        for(var i = 0; i < 4; i++){
        var rot3 = this.rotation + i * 360/4 - Time.time * 1;
        Lines.arc(other.x, other.y, other.type.hitSize + 3, 0.14, rot3);
        }
        Drawf.light(this.x, this.y, 300 * 1.5, Pal.sapBullet, 1 * 0.8);
        Draw.reset();
        }
        });
        Units.nearbyBuildings(this.x, this.y, 150, other => {
        	if(other.team != this.team && other.team != Team.derelict){
        	if(other.block.targetable){
        	Draw.z(Layer.effect);
            Draw.color(Pal.sapBullet);
        	Lines.stroke(str);
        for(var i = 0; i < 8; i++){
        var rot4 = this.rotation + i * 360/8 - Time.time * 1;
        Lines.arc(this.x, this.y, 150, 0.14, rot4);
        }
        Drawf.light(this.x, this.y, 150 * 1.5, Pal.sapBullet, 1 * 0.8);
        Draw.reset();
        }
        }
        });
        Draw.reset();
        }
        },
    updateTile(){
    	this.super$updateTile();
        this.creload++;
        	if(this.hasAmmo() && this.power.status > 0 && this.liquids.currentAmount() > 0){
        	if(this.creload == 60){
        	Units.nearbyEnemies(this.team, this.x, this.y, 300, e => {
        	if((e.targetable || e.hittable) && e.team != Team.derelict){
        	for(var i = 0; i < 4; i++){
        	abyssMissile.create(this, this.team, this.x, this.y, this.rotation);
            }
            }
            });
            if(this.target != null){
            	abyssSphere.create(this, this.team, this.x, this.y, this.rotation);
            }
            }
            if(this.creload == 200){
            Units.nearbyEnemies(this.team, this.x, this.y, 300, ee => {
            var air = true;
            var ground = false;
            if(ee.checkTarget(air, ground) && ee.team != Team.derelict){
            ee.damage(114.8);
            ee.apply(statuses.stun, 90);
            abyssMulti.at(ee.x, ee.y, ee.rotation);
            for(var i = 0; i < 1; i++){
            var abyssRot = this.rotation + i * 360/1 - Time.time * 1;
            abyssRadialEffect.at(ee.x, ee.y, abyssRot);
            }
            Sounds.lasercharge2.at(ee);
            }
            else if(ee.checkTarget(false, true) && ee.team != Team.derelict){
            ee.damage(172.2);
            ee.apply(statuses.stun, 60);
            abyssMulti.at(ee.x, ee.y, ee.rotation);
            var abyssRot2 = this.rotation + i * 360/1 - Time.time * 1;
            for(var i = 0; i < 1; i++){
            var abyssRot2 = this.rotation + i * 360/1 - Time.time * 1;
            abyssRadialEffect.at(ee.x, ee.y, abyssRot2);
            }
            Sounds.lasercharge2.at(ee);
            }
            });
            }
            else if(this.creload >= 200){
            	this.creload = 0;
            }
            }
            }
            });
        	

const punch = extend(ItemTurret, "punch", {});

//Diamond Faction
const curvature = extend(ItemTurret, "curvature", {});

const diamondDrone = extend(UnitType, "diamond-drone", {});
diamondDrone.constructor = () => extend(UnitEntity, {});
const shine = extend(ItemTurret, "shine", {
    canOverdrive: false,
    setStats() {
        this.super$setStats();
        this.stats.add(auxiliaryUnit, customValue(table => {
        	table.row();
            table.table(Styles.grayPanel, b => {
                b.image(diamondDrone.uiIcon).size(40).pad(10).left().scaling(Scaling.fit);
                b.table(cons(info => {
                    info.add(diamondDrone.localizedName).left();
                    if(Core.settings.getBool("console")){
                        info.row();
                        info.add(diamondDrone.name).left().color(Color.lightGray);
                    }
                }));
                b.button("?", Styles.flatBordert, () => Vars.ui.content.show(diamondDrone)).size(40).pad(10).right().grow().visible(() => diamondDrone.unlockedNow());
            }).growX().pad(5).row();
        }));
    }
});
shine.buildType = () => extend(ItemTurret.ItemTurretBuild, shine, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        var shineShoot = this.isShooting() && this.hasAmmo();

        if (shineShoot && this.creload >= 600) {
            this.creload = 0;
            if(!Vars.net.client()){
            diamondDrone.spawn(this.team, this.x, this.y);
            Fx.spawn.at(this.x, this.y);
            Sounds.respawn.at(this);
            }
        }
        else if (this.creload < 600) this.creload++;
    },
});

const skull = extend(ItemTurret, "skull", {});

const draw = extend(ItemTurret, "draw", {
    envDisabled: Env.scorching
});

//This turret is not part of any of the factions, could be an acid faction turret but it has no acid properties
const greenWave = extend(WaveEffect, {
	sizeFrom: 38,
	sizeTo: 38,
	interp: Interp.circleOut,
	lifetime: 40,
	strokeFrom: 3.3,
	strokeTo: 0,
	colorFrom: Color.valueOf("98ffa9"),
	colorTo: Color.valueOf("98ffa9"),
});

const greenParticles = extend(ParticleEffect, {
particles: 18,
cone: 360,
length: 38,
interp: Interp.circleOut,
sizeInterp: Interp.circleOut,
lifetime: 120,
colorFrom: Color.valueOf("98ffa9"),
colorTo: Color.valueOf("98ffa970"),
sizeFrom: 8,
sizeTo: 0
});

const greenLaser = extend(LaserBulletType, {
	damage: 100,
	colors: [Pal.heal, Pal.heal, Color.white],
	drawSize: 200,
	width: 25,
	length: 560,
    shake: 1,
    despawnEffect: greenParticles,
    smokeEffect: Fx.none,
    healPercent: 5,
    collidesTeam: true,
});

const executioner = extend(LaserTurret, "executioner", {
    setStats(){
        this.super$setStats();
        this.stats.add(stat.additionally, StatValues.ammo(ObjectMap.of(this, greenLaser)));
    },
    canOverdrive: false
});
executioner.consume(new ConsumeCoolant(2)).update = false;
executioner.buildType = () => extend(LaserTurret.LaserTurretBuild, executioner, {
	creload : 0,
    updateTile() {
        this.super$updateTile();
        //bullet summoning x/y coordinates
        let wx = this.x + Mathf.range(14.25, -14.25);
        let wy = this.y + Mathf.range(22, -22);
        let executionerShoot = this.isShooting() && this.isActive() && this.hasAmmo() && this.power.status > 0.5;

        if (executionerShoot) {
            this.creload++;
            if (this.creload >= 60) {
                this.creload = 0;
                greenLaser.create(this, this.team, wx, wy, this.rotation);
                greenWave.at(wx, wy);
                Sounds.laserblast.at(this);
            }
        }
        else this.creload = 0;
    },
});