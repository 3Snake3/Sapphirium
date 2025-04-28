const environment = require("SappEnvironment");
const graphiticCliffCrusher = extend(WallCrafter, "graphitic-cliff-crusher", {
	attribute: environment.graphiteAttr,
	output: Items.graphite,
	drillTime: 130,
	size: 2,
	fogRadius: 2,
	ambientSound: Sounds.drill,
	ambientSoundVolume: 0.04,
});
graphiticCliffCrusher.consumePower(13 / 60);
const argonBorehole = extend(AttributeCrafter, "argon-borehole", {
	attribute: environment.argonAttr,
});
const topazMine = extend(AttributeCrafter, "topaz-mine", {
    baseEfficiency: 0,
    minEfficiency: 8.999,
    displayEfficiency: false,
    boostScale: 1 / 9,
    attribute: environment.topazAttr,
});