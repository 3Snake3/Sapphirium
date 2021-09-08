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

const superMelting = extendContent(StatusEffect, "super-melting", {
            
    init(){
                
        this.opposite(StatusEffects.wet, StatusEffects.freezing, superFreezing)
                
                
        this.affinity(StatusEffects.tarred, ((unit, time, newTime, result) => {
                    
            unit.damagePierce(this.transitionDamage);
            Fx.burning.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
                    
            result.set(superMelting, time);
        }))
                
                
        this.affinity(StatusEffects.melting, ((unit, time, newTime, result) => {
                    
            unit.damagePierce(this.transitionDamage);
            Fx.melting.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
                    
            result.set(superMelting, time);
        }))
                
                
        this.affinity(StatusEffects.burning, ((unit, time, newTime, result) => {
                    
            unit.damagePierce(this.transitionDamage);
            Fx.burning.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
                    
            result.set(superMelting, time);
        }))
    },
            
    healthMultiplier: 0.5,
    speedMultiplier: 0.5,
    reloadMultiplier: 0.5,
    transitionDamage: 45,
    damage: 0.1,
    effect: Fx.melting,
    color: Color.valueOf("dd6f58")       
});
        
const superFreezing = extendContent(StatusEffect, "super-freezing", {
            
    init(){
                
        this.opposite(StatusEffects.burning, StatusEffects.melting, superMelting)
                
        this.affinity(StatusEffects.blasted, (unit, time, newTime, result) => {        
            unit.damagePierce(this.transitionDamage);
            result.set(superFreezing, time);
        })
                
        this.affinity(StatusEffects.freezing, ((unit, time, newTime, result) => {
                    
            unit.damagePierce(this.transitionDamage);
            Fx.freezing.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
                    
            result.set(superFreezing, time);
        }))
    },
      
    speedMultiplier: 0.5,
    reloadMultiplier: 0.5,
    transitionDamage: 10,
    damage: 0.5,
    effect: Fx.freezing,
    color: Color.valueOf("6fdded")
});

const effect = extendContent(ParticleEffect, {});
effect.particles = 1;
effect.sizeFrom = 5;
effect.sizeTo = 5;
effect.region = Core.atlas.find("adc-stun");
effect.lifetime = 100;
effect.length = 0;

const stun = extendContent(StatusEffect, "stunned", {
	speedMultiplier: 0.001,
	disarm: true,
	effect: effect,
	})
		

module.exports = {
	weakened: weakened,
	superMelting: superMelting,
	superFreezing: superFreezing,
	stun: stun
}
