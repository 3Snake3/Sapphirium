const statuses = require("statuses/statuses");
const items = require("items");

const ledoniteLiquid = extend(Floor, "ledonite", {
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

const sapphiricFloor = extend(Floor, "sapphiric-floor", {
variants: 4
});

const sapphiricWall = extend(StaticWall, "sapphiric-wall", {});
sapphiricFloor.asFloor().wall = sapphiricWall;
sapphiricWall.attributes.set(Attribute.sand, 0.9);

const oreSapphire = extend(OreBlock, "ore-sapphire", {
	itemDrop: items.sapphire,
});

const wallOreSapphire = extend(OreBlock, "ore-wall-sapphire", {
	itemDrop: items.sapphire,
	wallOre: true
});

