const weakened = extendContent(StatusEffect, "weakened", {
init(){
this.opposite(StatusEffects.overdrive, StatusEffects.overclock);
},
});
weakened.speedMultiplier = 0.80;
weakened.healthMultiplier = 0.80;
weakened.damageMultiplier = 0.80;
weakened.reloadMultiplier = 0.80;
weakened.color = Pal.gray;
exports.weakened = weakened;

const superMelting = extendContent(StatusEffect, "super-melting", {
init(){
this.opposite(StatusEffects.wet, StatusEffects.freezing, superFreezing);
this.affinity(StatusEffects.tarred, ((unit, time, newTime, result) => {
            unit.damagePierce(this.transitionDamage);
            Fx.burning.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
            result.set(superMelting, time);
        }));
this.affinity(StatusEffects.melting, ((unit, time, newTime, result) => {
            unit.damagePierce(this.transitionDamage);
            Fx.melting.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
            result.set(superMelting, time);
        }));
this.affinity(StatusEffects.burning, ((unit, time, newTime, result) => {
            unit.damagePierce(this.transitionDamage);
            Fx.burning.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
            result.set(superMelting, time);
        }));
       },
       });
        superMelting.healthMultiplier = 0.5;
        superMelting.speedMultiplier = 0.5;
        superMelting.reloadMultiplier = 0.5;
        superMelting.transitionDamage = 45;
        superMelting.damage = 0.10;
        superMelting.effect = Fx.melting;
        superMelting.color = Color.valueOf("dd6f58");
        exports.superMelting = superMelting;
        
        const superFreezing = extendContent(StatusEffect, "super-freezing", {
init(){
this.opposite(StatusEffects.burning, StatusEffects.melting, superMelting);
this.affinity(StatusEffects.blasted, (unit, time, newTime, result) => {
            unit.damagePierce(this.transitionDamage);
            result.set(superFreezing, time);
        });
this.affinity(StatusEffects.freezing, ((unit, time, newTime, result) => {
            unit.damagePierce(this.transitionDamage);
            Fx.freezing.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
            result.set(superFreezing, time);
        }));
        },
        });
        superFreezing.speedMultiplier = 0.5;
        superFreezing.damageMultiplier = 0.65;
        superFreezing.disarm = true;
        superFreezing.transitionDamage = 15;
        superFreezing.damage = 0.5;
        superFreezing.effect = Fx.freezing;
        superFreezing.color = Color.valueOf("6fdded");
        exports.superFreezing = superFreezing;