/*const multi = require("multi-crafter/lib");*/

const denseSmelter = extend(GenericCrafter, "dense-smelter", {});

const bigDenseSmelter = extend(GenericCrafter, "big-dense-smelter", {});

const metalMeltingFurnace = extend(GenericCrafter, "metal-melting-furnace", {});

/*const freezer = multi.MultiCrafter("freezer");*/

const creotiteMixer = extend(GenericCrafter, "creotite-mixer", {});

const creotiteMegaMixer = extend(GenericCrafter, "creotite-megamixer", {});

const creostoneSmelter = extend(GenericCrafter, "creostone-smelter", {});

const creotiteConverter = extend(AttributeCrafter, "creotite-converter", {});

const cryofluidMegamixer = extend(GenericCrafter, "cryofluid-megamixer", {});

const ledoniteMixer = extend(GenericCrafter, "ledonite-mixer", {});

const globiumSmelter = extend(AttributeCrafter, "globium-smelter", {});

const diamondPress = extend(AttributeCrafter, "diamond-press", {
    attribute: Attribute.heat,
});

const tinoriumCrystallizer = extend(AttributeCrafter, "tinorium-crystallizer", {});

const bigBlastMixer = extend(GenericCrafter, "big-blast-mixer", {});

const plastaniumPress = extend(AttributeCrafter, "plastanium-press", {});

const phaseSewingFactory = extend(GenericCrafter, "phase-sewing-factory", {});

const impulseKineticSmelter = extend(AttributeCrafter, "impulse-kinetic-smelter", {});

const electromixer = extend(GenericCrafter, "electromixer", {});

const surgeMassSynthesizer = extend(GenericCrafter, "surge-mass-synthesizer", {});