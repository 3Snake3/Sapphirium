const weakened = extendContent(StatusEffect, "weakened", {
            
    init(){
        this.opposite(StatusEffects.overdrive, StatusEffects.overclock);
    },
            
    speedMultiplier: 0.8,
    healthMultiplier: 0.8,
    damageMultiplier: 0.8,
    reloadMultiplier: 1.2,
    color: Pal.gray      
})

const superMelting = extend(StatusEffect, "super-melting", {
    healthMultiplier: 0.5,
    speedMultiplier: 0.5,
    reloadMultiplier: 1.5,
    transitionDamage: 75,
    damage: 0.25,
    effect: Fx.melting,
    color: Color.valueOf("dd6f58")       
});
        
const superFreezing = extendContent(StatusEffect, "super-freezing", {
            
    init(){
                
        this.opposite(StatusEffects.burning, StatusEffects.melting, superMelting)
                
        this.affinity(StatusEffects.wet, ((unit, time, newTime, result) => {
                    
            unit.damagePierce(this.transitionDamage);
            Fx.freezing.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
            /*if(unit.speed > 0){
            	unit.speed = 0;
           }*/
                    
            result.set(superFreezing, Math.min(time + result.time, 400));
        }))
    },
      
    speedMultiplier: 0.001,
    disarm: true,
    transitionDamage: 10,
    reactive: true,
    damage: 0.5,
    effect: Fx.freezing,
    color: Color.valueOf("6fdded")
});

const stun = extend(StatusEffect, "stunne", {
	speedMultiplier: 0.001,
	disarm: true,
	})
	
const flaming = extend(StatusEffect, "flaming", {
speedMultiplier: 0.6,
damage: 5,
effect: Fx.burning,
transitionDamage: 60,
init(){
                
        this.opposite(StatusEffects.wet, StatusEffects.freezing, superFreezing)
                
        this.affinity(StatusEffects.tarred, ((unit, time, newTime, result) => {
                    
            unit.damagePierce(this.transitionDamage);
            Fx.burning.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
                    
            result.set(flaming, Math.min(time + result.time, 400));
        }))
    }
});

const bled = new Effect(11, e => {
        Draw.color(Color.valueOf("f25555"));
        Lines.stroke(e.fout() * 2);
        Lines.circle(e.x, e.y, 2 + e.finpow() * 7);
        });
const bleeding = extend(StatusEffect, "bleeding", {
damage: 0.2,
healthMultiplier: 0.95,
permanent: true
});
bleeding.effect = bled;

module.exports = {
	weakened: weakened,
	superMelting: superMelting,
	superFreezing: superFreezing,
	stun: stun,
	bleeding: bleeding,
}
