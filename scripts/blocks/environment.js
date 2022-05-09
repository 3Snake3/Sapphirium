const statuses = require("statuses/statuses");

const ledoniteLiquid = extendContent(Floor, "ledonite", {
	isLiquid: true,
	status: statuses.superFreezing,
	statusDuration: 240,
	drownTime: 150,
	speedMultiplier: 0.19,
	lightColor: Color.valueOf("c1f4ff"),
	});

const creosand = extend(Floor, "creo-sand", {});

const oreCreostone = extend(OreBlock, "ore-creostone", {});

const ledoniteSelections = extend(Floor, "ledonite-selections", {});

const granateGrowths = extend(Wall, "granate-growths", {});

