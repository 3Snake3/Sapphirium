const weakenedEffect = extend(ParticleEffect, {
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

const weakened = extend(StatusEffect, "weakened", {
            
    init(){
        this.opposite(StatusEffects.overdrive, StatusEffects.overclock);
    },
            
    speedMultiplier: 0.8,
    healthMultiplier: 0.8,
    damageMultiplier: 0.8,
    reloadMultiplier: 0.8,
    color: Pal.gray,
    effect: weakenedEffect
})

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
	lifetime: 60,
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

const shockStun = extend(StatusEffect, "shock-stun", {
	speedMultiplier: 0.001,
	disarm: true,
	transitionDamage: 12
	})

const stun = extend(StatusEffect, "stunne", {
	speedMultiplier: 0.001,
	disarm: true,
	});
	
const flaming = extend(StatusEffect, "flaming", {
speedMultiplier: 0.6,
damage: 5,
effect: Fx.burning,
transitionDamage: 60,
});

const cut = extend(StatusEffect, "cut", {});

const bled = new Effect(11, e => {
        Draw.color(Color.valueOf("f25555"));
        Lines.stroke(e.fout() * 2);
        Lines.circle(e.x, e.y, 2 + e.finpow() * 7);
        });
const activeBloodrage = extend(StatusEffect, "active-bloodrage", {
damage: 0.6,
permanent: true,
transitionDamage: 60,
damageMultiplier: 1.2,
speedMultiplier: 1.2,
reloadMultiplier: 1.2,
buildSpeedMultiplier: 1.2,
healthMultiplier: 0.85,
});
activeBloodrage.effect = bled;

const passiveBloodrage = extend(StatusEffect, "passive-bloodrage", {
reactive: true,
});

const overload = extend(StatusEffect, "overload", {});

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
}
