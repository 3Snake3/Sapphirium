/*const multi = require("multi-crafter/lib");*/
const denseSmelter = extend(GenericCrafter, "dense-smelter", {});
const freezer = extend(AttributeCrafter, "freezer", {
attribute: Attribute.water,
boostScale: 0.8,
maxBoost: 1.5,
});
const solidificationChamber = extend(AttributeCrafter, "solidification-chamber", {
attribute: Attribute.water,
boostScale: 0.5,
});
const bigDenseSmelter = extend(GenericCrafter, "big-dense-smelter", {});
const cryochamber = extend(AttributeCrafter, "cryochamber", {
attribute: Attribute.water,
boostScale: 1,
maxBoost: 2,
});
const ledochamber = extend(AttributeCrafter, "ledochamber", {
attribute: Attribute.water,
boostScale: 0.8,
});
const hyperchargeTransformer = extend(AttributeCrafter, "hypercharge-transformer", {
boostScale: 0.4,
maxBoost: 1.5,
});
const plastaniumPress = extend(AttributeCrafter, "plastanium-press", {});
const phaseSewingFactory = extend(GenericCrafter, "phase-sewing-factory", {});
const impulseSurgeSmelter = extend(AttributeCrafter, "impulse-surge-smelter", {});
const globiumSmelter = extend(AttributeCrafter, "globium-smelter", {
    envDisabled: Env.scorching
});
const tinoriumCrystallizer = extend(AttributeCrafter, "tinorium-crystallizer", {
    envDisabled: Env.scorching
});
const diamondPress = extend(AttributeCrafter, "diamond-press", {
    attribute: Attribute.heat,
});
const creostoneSmelter = extend(GenericCrafter, "creostone-smelter", {
    envDisabled: Env.scorching
});
const creotiteConverter = extend(AttributeCrafter, "creotite-converter", {
    envDisabled: Env.scorching
});
const bigBlastMixer = extend(GenericCrafter, "big-blast-mixer", {});
const weakCharger = extend(AttributeCrafter, "weak-charger", {});
const mediumCharger = extend(AttributeCrafter, "medium-charger", {});
const mightyCharger = extend(AttributeCrafter, "mighty-charger", {});
const multicharger = extend(AttributeCrafter, "multi-charger", {});
const cryofluidMegamixer = extend(GenericCrafter, "cryofluid-megamixer", {});
const ledoniteMixer = extend(GenericCrafter, "ledonite-mixer", {});
const creotiteMixer = extend(GenericCrafter, "creotite-mixer", {});
const creotiteMegaMixer = extend(GenericCrafter, "creotite-megamixer", {});
const electromixer = extend(GenericCrafter, "electromixer", {});
const surgeMassSynthesizer = extend(GenericCrafter, "surge-mass-synthesizer", {
    envDisabled: Env.scorching
});