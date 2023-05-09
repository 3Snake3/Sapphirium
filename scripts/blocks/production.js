/*const multi = require("multi-crafter/lib");*/

const denseSmelter = extend(GenericCrafter, "dense-smelter", {});

const bigDenseSmelter = extend(GenericCrafter, "big-dense-smelter", {});

/*const freezer = multi.MultiCrafter("freezer");*/

const creotiteMixer = extend(GenericCrafter, "creotite-mixer", {});

const creotiteMegaMixer = extend(GenericCrafter, "creotite-megamixer", {});

const creostoneSmelter = extend(GenericCrafter, "creostone-smelter", {});
creostoneSmelter.envDisabled = Env.scorching;

const creotiteConverter = extend(AttributeCrafter, "creotite-converter", {});
creotiteConverter.envDisabled = Env.scorching;

const cryofluidMegamixer = extend(GenericCrafter, "cryofluid-megamixer", {});

const ledoniteMixer = extend(GenericCrafter, "ledonite-mixer", {});

const globiumSmelter = extend(AttributeCrafter, "globium-smelter", {});
globiumSmelter.envDisabled = Env.scorching;

const diamondPress = extend(AttributeCrafter, "diamond-press", {
    attribute: Attribute.heat,
});

const tinoriumCrystallizer = extend(AttributeCrafter, "tinorium-crystallizer", {});
tinoriumCrystallizer.envDisabled = Env.scorching;

const bigBlastMixer = extend(GenericCrafter, "big-blast-mixer", {});

const plastaniumPress = extend(AttributeCrafter, "plastanium-press", {});

const phaseSewingFactory = extend(GenericCrafter, "phase-sewing-factory", {});

const impulseKineticSmelter = extend(AttributeCrafter, "impulse-kinetic-smelter", {});

const electromixer = extend(GenericCrafter, "electromixer", {});

const surgeMassSynthesizer = extend(GenericCrafter, "surge-mass-synthesizer", {});