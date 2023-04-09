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
harpoon.constructor = () => extend(UnitEntity, {});

const lambda = extend(UnitType, "lambda", {});
lambda.constructor = () => extend(UnitEntity, {});
lambda.aiController = () => extend(BuilderAI, {});

const snowflake = extend(UnitType, "snowflake", {});
snowflake.constructor = () => extend(UnitEntity, {});

const iceBomb = extend(UnitType, "ice-bomb", {});
iceBomb.constructor = () => extend(MechUnit, {});

const scarletMoth = extend(UnitType, "scarlet-moth", {});
scarletMoth.constructor = () => extend(UnitEntity, {});

const scarletGuard = extend(UnitType, "scarlet-guard", {});
scarletGuard.constructor = () => extend(LegsUnit, {});

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