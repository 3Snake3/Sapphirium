const statuses = require("statuses/statuses");

const degree = extend(UnitType, "degree", {});
degree.constructor = () => extend(LegsUnit, {});

const zero = extend(UnitType, "zero", {});
zero.constructor = () => extend(LegsUnit, {});

const snowblock = extend(UnitType, "snowblock", {});
snowblock.constructor = () => extend(LegsUnit, {});

const snowstorm = extend(UnitType, "snowstorm", {});
snowstorm.constructor = () => extend(LegsUnit, {});

const coldBlood = extend(UnitType, "cold-blood", {});
coldBlood.constructor = () => extend(LegsUnit, {});

const hole = extend(UnitType, "hole", {});
hole.constructor = () => extend(MechUnit, {});

const emptiness = extend(UnitType, "emptiness", {});
emptiness.constructor = () => extend(MechUnit, {});

const shadow = extend(UnitType, "shadow", {});
shadow.constructor = () => extend(MechUnit, {});

const Void = extend(UnitType, "void", {});
Void.constructor = () => extend(MechUnit, {});

const nihil = extend(UnitType, "nihil", {});
nihil.constructor = () => extend(MechUnit, {});

const beam = extend(UnitType, "beam", {});
beam.constructor = () => extend(UnitEntity, {});

const glare = extend(UnitType, "glare", {});
glare.constructor = () => extend(UnitEntity, {});

const luminary = extend(UnitType, "luminary", {});
luminary.constructor = () => extend(UnitEntity, {});

const star = extend(UnitType, "star", {});
star.constructor = () => extend(UnitEntity, {});

const prophecy = extend(UnitType, "prophecy", {});
prophecy.constructor = () => extend(UnitEntity, {});

const sound = extend(UnitType, "sound", {});
sound.constructor = () => extend(UnitEntity, {});

const tune = extend(UnitType, "tune", {});
tune.constructor = () => extend(UnitEntity, {});

const vibration = extend(UnitType, "vibration", {});
vibration.constructor = () => extend(PayloadUnit, {});
vibration.payloadCapacity = (3 * 3) * Vars.tilePayload;

const whisper = extend(UnitType, "whisper", {});
whisper.constructor = () => extend(PayloadUnit, {});
whisper.payloadCapacity = (4 * 4) * Vars.tilePayload;

const shriek = extend(UnitType, "shriek", {});
shriek.constructor = () => extend(PayloadUnit, {});
shriek.payloadCapacity = (6.5 * 6.5) * Vars.tilePayload;

const course = extend(UnitType, "course", {});
course.constructor = () => extend(UnitWaterMove, {});

const parityMissile = extend(MissileUnitType, "parity-missile", {
engineLayer: Layer.effect,
});

const parity = extend(UnitType, "parity", {});
parity.constructor = () => extend(UnitWaterMove, {});

const edgeMissile = extend(MissileUnitType, "edge-missile", {
engineLayer: Layer.effect,
});

const edge = extend(UnitType, "edge", {});
edge.constructor = () => extend(UnitWaterMove, {});

const whirlpoolHeavyMissile = extend(MissileUnitType, "whirlpool-heavy-missile", {
engineLayer: Layer.effect,
});

const whirlpool = extend(UnitType, "whirlpool", {});
whirlpool.constructor = () => extend(UnitWaterMove, {});

const tornadoHeavyMissile = extend(MissileUnitType, "tornado-heavy-missile", {
engineLayer: Layer.effect,
});

const tornadoMissile = extend(MissileUnitType, "tornado-missile", {
engineLayer: Layer.effect,
});

const tornado = extend(UnitType, "tornado", {});
tornado.constructor = () => extend(UnitWaterMove, {});

const trident = extend(UnitType, "trident", {});
trident.constructor = () => extend(UnitEntity, {});

const harpoon = extend(UnitType, "harpoon", {});
harpoon.constructor = () => extend(UnitEntity, {}); //TODO remove

const lambda = extend(UnitType, "lambda", {});
lambda.constructor = () => extend(UnitEntity, {});

var splashDamage = 15;
var splashDamageRadius = 32;
var status = StatusEffects.freezing;
var statusDuration = 30;
var blueWave = extend(WaveEffect, {
sizeFrom: 0,
sizeTo: 32,
sides: 0,
lifetime: 20,
colorFrom: Pal.lancerLaser,
colorTo: Pal.lancerLaser
});
var freezingWave = extend(ExplosionBulletType, {
	splashDamage: splashDamage,
	splashDamageRadius: splashDamageRadius,
	status: status,
	statusDuration: 30,
	shootEffect: Fx.none,
	hitEffect: Fx.none,
	despawnEffect: Fx.none,
	smokeEffect: Fx.none,
	killShooter: false,
});
var freezingWaveAbility = extend(Ability, {
	update(unit){
	var scl = Mathf.clamp((unit.vel.len() - 0.8) / (1.2 - 0.8));
        if(Mathf.chance(Time.delta * 0.15 * scl)){
            freezingWave.create(unit, unit.team, unit.x, unit.y, unit.rotation);
            blueWave.at(unit.x, unit.y, unit.rotation);
            }
        },
    addStats(t){
    	t.add(Core.bundle.format("bullet.splashdamage", splashDamage, Strings.fixed(splashDamageRadius / Vars.tilesize, 1)));
        t.row();
        t.add(status.emoji() + " " + status.localizedName);
        },
      localized(){
      	 return Core.bundle.get("ability." + "freezingwave");
      }
});

const iceBomb = extend(UnitType, "ice-bomb", {});
iceBomb.constructor = () => extend(MechUnit, {}); 

var iceBombDropping = extend(Ability, {
	death(unit){
        if(!Vars.net.client()){
                iceBomb.spawn(unit.team, unit.x, unit.y);
            }
        },
 localized(){
 	return Core.bundle.get("ability." + "icebombdropping");
 },
 display: false
});

const snowflake = extend(UnitType, "snowflake", {});
snowflake.constructor = () => extend(UnitEntity, {});
snowflake.abilities.addAll(freezingWaveAbility, iceBombDropping);

const scarletGuard = extend(UnitType, "scarlet-guard", {});
scarletGuard.constructor = () => extend(LegsUnit, {});

var transformation = extend(Ability, {
	death(unit){
        if(!Vars.net.client()){
                scarletGuard.spawn(unit.team, unit.x, unit.y);
            }
        },
        addStats(t){
        	t.add("[lightgray]" + Stat.unitType.localized() + ":" + " " + "[white]" + scarletGuard.localizedName);
            t.row();
            t.image(scarletGuard.uiIcon).size(40).pad(10).center().scaling(Scaling.fit);
        },
 localized(){
 	return Core.bundle.get("ability." + "transformation");
 },
});

const bloodEffect = extend(ParticleEffect, {
particles: 1,
length: 15,
region: "sapphirium-rhombus",
sizeFrom: 5,
sizeTo: 0,
lifetime: 25,
colorFrom: Color.valueOf("d94848"),
colorTo: Color.valueOf("d94848"),
});

const bloodEffect2 = extend(WaveEffect, {
sides: 5,
sizeFrom: 0,
sizeTo: 30,
strokeFrom: 20,
strokeTo: 0,
lifetime: 15,
colorFrom: Color.valueOf("d94848"),
colorTo: Color.valueOf("d94848"),
});

const bloodragePower = extend(StatusEffect, "bloodrage-power", {
damageMultiplier: 1.4,
speedMultiplier: 1.3,
healthMultiplier: 0.85,
reloadMultiplier: 1.3,
effect: bloodEffect,
effectChance: 0.07,
show: false,
});

var timer = 1;
var effectDuration = new Stat("effectduration");
const bloodragePowerAbility = extend(Ability, {
	update(unit){
		timer += Time.delta;

        if(timer >= 210){
            Units.nearby(unit.team, unit.x, unit.y, 20, other => {
                other.apply(bloodragePower, 80);
            });
            bloodEffect2.at(unit.x, unit.y, unit.rotation);
            timer = 0;
        }
    },
addStats(t){
        t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / 210, 2) + " " + StatUnit.perSecond.localized());
        t.row();
        t.add("[lightgray]" + Stat.shootRange.localized() + ": [white]" +  Strings.autoFixed(20 / Vars.tilesize, 2) + " " + StatUnit.blocks.localized());
        t.row();
        t.add(Core.bundle.format("stat.damagemultiplier2", Strings.autoFixed(140, 2)));
        t.row();
        t.add(Core.bundle.format("stat.speedmultiplier2", Strings.autoFixed(130, 2)));
        t.row();
        t.add(Core.bundle.format("stat.healthmultiplier2", Strings.autoFixed(85, 2)));
        t.row();
        t.add(Core.bundle.format("stat.reloadmultiplier2", Strings.autoFixed(120, 2)));
        t.row();
        t.add("[lightgray]" + effectDuration.localized() + "[white] ~" + Mathf.round(80 / 60) + "[lightgray] " + Core.bundle.get("unit.seconds"));
    },
localized(){
 	return Core.bundle.get("ability." + "bloodragepower")
 },
});

const scarletMoth = extend(UnitType, "scarlet-moth", {});
scarletMoth.constructor = () => extend(UnitEntity, {});
scarletMoth.abilities.addAll(bloodragePowerAbility, transformation);

const fight = extend(UnitType, "fight", {});
fight.constructor = () => extend(UnitEntity, {});

const secondChance = extend(UnitType, "second-chance", {});
secondChance.constructor = () => extend(MechUnit, {});

const war = extend(UnitType, "war", {});
war.constructor = () => extend(PayloadUnit, {});

const virus = extend(UnitType, "virus", {});
virus.constructor = () => extend(UnitEntity, {});

const energyField = extend(UnitType, "energy-field", {});
energyField.constructor = () => extend(BuildingTetherPayloadUnit, {});

const epitaph = extend(TankUnitType, "epitaph", {});
epitaph.constructor = () => extend(TankUnit, {});