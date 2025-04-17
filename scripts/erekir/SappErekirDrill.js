const environment = require("SappEnvironment");
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