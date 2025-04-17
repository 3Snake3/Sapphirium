const flammability = extend(StatusEffect, "flammability", {});

const smallFlaming = extend(StatusEffect, "small-flaming", {});
	
const flaming = extend(StatusEffect, "flaming", {
    speedMultiplier: 0.6,
    damage: 5,
    effect: Fx.burning,
    transitionDamage: 60,
});

const incandescence = extend(ParticleEffect, {
	particles: 1,
	lifetime: 60,
	length: 0,
	cone: 0,
	sizeFrom: 5,
	sizeTo: 0,
	colorFrom: Pal.lightOrange,
	colorTo: Color.valueOf("f6802175")
});

const superMelting = extend(StatusEffect, "super-melting", {
    healthMultiplier: 0.6,
    speedMultiplier: 0.9,
    reloadMultiplier: 0.8,
    transitionDamage: 25,
    damage: 0.2,
    effect: incandescence,
    color: Color.valueOf("dd6f58")       
});

const superFreezingEffect = extend(ParticleEffect, {
	particles: 1,
	lifetime: 180,
	length: 0,
	cone: 0,
	sizeFrom: 5,
	sizeTo: 0,
	region: "sapphirium-rhombus",
	colorFrom: Color.valueOf("6fdded"),
	colorTo: Color.valueOf("6fdded75")
});
        
const superFreezing = extend(StatusEffect, "super-freezing", {
    speedMultiplier: 0.3,
    transitionDamage: 10,
    damage: 0.5,
    effect: superFreezingEffect,
    color: Color.valueOf("6fdded")
});

const overfreezing = extend(StatusEffect, "overfreezing", {});
const acidCorrosion = extend(StatusEffect, "acid-corrosion", {});

const weaknessEffect = extend(ParticleEffect, {
	particles: 1,
	lifetime: 80,
	length: -34,
	cone: 0,
	line: true,
	lenFrom: 6,
	lenTo: 0,
	colorFrom: Pal.gray,
	colorTo: Pal.gray,
});

const disorientation = extend(StatusEffect, "disorientation", {
	speedMultiplier: 0.78,
	reloadMultiplier: 0.2,
	damageMultiplier: 1.8,
	effect: extend(ParticleEffect, {
		particles: 1,
		spin: 8,
		region: "sapphirium-disor-effect",
		sizeFrom: 4,
		sizeTo: 0,
		colorFrom: Pal.lightishGray,
		colorTo: Pal.lightishGray,
		lifetime: 45,
		length: 0,
		})
	});

const weakened = extend(StatusEffect, "weakened", {       
    init() {
        this.opposite(StatusEffects.overdrive, StatusEffects.overclock, StatusEffects.fast, highSpeed);
    },
            
    speedMultiplier: 0.8,
    healthMultiplier: 0.8,
    damageMultiplier: 0.8,
    reloadMultiplier: 0.8,
    color: Pal.gray,
    effect: weaknessEffect
})

const shockStun = extend(StatusEffect, "shock-stun", {
	speedMultiplier: 0.001,
	disarm: true,
	transitionDamage: 12
	})
	
const superShock = extend(StatusEffect, "super-shock", {
	speedMultiplier: 0.001,
	reloadMultiplier: 2,
	update(unit, time){
		this.super$update(unit, time);
		if(!unit.type.flying){
			unit.type.flying = true;
			if(!unit.type.lowAltitude && unit.type.hitSize >= 20){
			unit.type.lowAltitude = true;
			}
		}
	},
	onRemoved(unit){
		if(unit.type.flying){
			unit.type.flying = false;
			}
		}
	});

const stun = extend(StatusEffect, "stunne", {
	speedMultiplier: 0.001,
	disarm: true,
});

const cut = extend(StatusEffect, "cut", {});
const highSpeed = extend(StatusEffect, "high-speed", {});

const bled = new Effect(11, e => {
    Draw.color(Color.valueOf("f25555"));
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, 2 + e.finpow() * 7);
});
const activeBloodrage = extend(StatusEffect, "active-bloodrage", {
    damage: 0.6,
    permanent: true,
    damageMultiplier: 1.2,
    speedMultiplier: 1.2,
    reloadMultiplier: 1.2,
    buildSpeedMultiplier: 1.2,
    healthMultiplier: 0.85,
    init() {
        this.affinity(passiveBloodrage, (unit, result, time) => {
            unit.damagePierce(60);
        });
    },
    update(unit, time) {
        this.super$update(unit, time);
        if(Mathf.chanceDelta(0.05)) {
            bled.at(unit.x, unit.y);
        }
    },
});

const passiveBloodrage = extend(StatusEffect, "passive-bloodrage", {
    reactive: true,
});

const overload = extend(StatusEffect, "overload", {});

const unleash = extend(StatusEffect, "unleash", {});

const deepWounds = extend(StatusEffect, "deep-wounds", {});

const paganism = extend(StatusEffect, "paganism", {
    init() {
        this.affinity(execute, (unit, result, time) => {
            unit.damagePierce(1800);
        });
    }
});

const execute = extend(StatusEffect, "execute", {
	reactive: true,
});

const forceField = new ForceFieldAbility(60, 0.1, 200, 60 * 5);
const blur = extend(StatusEffect, "blur", {
    init() {
        this.affinity(wraith, (unit, result, time) => {
            unit.damagePierce(0);
            result.set(blur, Math.min(time + result.time, 1));
        });
    },
    update(unit, time){
    	this.super$update(unit, time);
     if(unit.type.targetable && unit.type.hittable){
     	unit.type.targetable = false;
         unit.type.hittable = false;
     }
     }
});

const wraith = extend(StatusEffect, "wraith", {
    init() {
        this.affinity(blur, (unit, result, time) => result.set(blur, Math.min(time + result.time, 1)));
    },
    update(unit, time){
    	this.super$update(unit, time);
    if(!unit.type.targetable && !unit.type.hittable){
     	unit.type.targetable = true;
         unit.type.hittable = true;
     }
     }
});

const truesight = extend(StatusEffect, "truesight", {});

module.exports = {
	weakened: weakened,
	superMelting: superMelting,
	superFreezing: superFreezing,
	overfreezing: overfreezing,
	shockStun: shockStun,
	stun: stun,
	activeBloodrage: activeBloodrage,
	passiveBloodrage: passiveBloodrage,
	cut: cut,
	overload: overload,
	flammability: flammability,
	acidCorrosion: acidCorrosion,
	unleash: unleash,
	deepWounds: deepWounds,
	blur: blur,
	wraith: wraith,
	execute: execute,
	highSpeed: highSpeed,
	truesight: truesight,
	paganism: paganism,
	smallFlaming: smallFlaming,
	flaming: flaming,
	superShock: superShock
}