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
	
const oreEmerald = extend(OreBlock, "ore-emerald", {});

const oreRuby = extend(OreBlock, "ore-ruby", {});

const oreDiamond = extend(OreBlock, "ore-diamond", {});

const oreCreostone = extend(OreBlock, "ore-creostone", {});

const ledoniteSecretions = extend(Floor, "ledonite-secretions", {});

const rubyGrowths = extend(Wall, "ruby-growths", {});

const sapphiricFloor = extend(Floor, "sapphiric-floor", {
variants: 4
});

const markingWall = extend(StaticWall, "marking-wall", {
variants: 3
});

const plateWall = extend(StaticWall, "plate-wall", {
variants: 2
});

const metalTree = extend(TallBlock, "metal-tree", {
variants: 1,
clipSize: 160,
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