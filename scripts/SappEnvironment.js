const statuses = require("SappStatuses");
const items = require("SappItems");

//Attributes
const topazAttr = Attribute.add("topazAttr");
const argonAttr = Attribute.add("argonAttr");

//Liquid tiles
const ledoniteLiquid = extend(Floor, "ledonite", {
	isLiquid: true,
	status: statuses.superFreezing,
	statusDuration: 240,
	drownTime: 150,
	speedMultiplier: 0.19,
	lightColor: Color.valueOf("c1f4ff"),
});

//Floors
const metalHexFloor = extend(Floor, "metal-hex-floor", {
    variants: 1
});

const ledoniteSecretions = extend(Floor, "ledonite-secretions", {});

const topazVeins = extend(Floor, "topaz-veins", {
    variants: 3,
});
topazVeins.attributes.set(topazAttr, 1);

const smoothTopaz = extend(Floor, "smooth-topaz", {
    variants: 3,
});
smoothTopaz.attributes.set(topazAttr, 1.25);

const amber = extend(Floor, "amber", {
    variants: 3,
});

const sapphiricStone = extend(Floor, "sapphiric-stone", {
    variants: 4
});

const smoothSapphire = extend(Floor, "smooth-sapphire", {
    variants: 3
});

const blueStone = extend(Floor, "blue-stone", {
    variants: 3
});

const denseBlueStone = extend(Floor, "dense-blue-stone", {
    variants: 3
});

const amethystFloor = extend(Floor, "amethyst-floor", {
	variants: 3,
});

const purpleStone = extend(Floor, "purple-stone", {
	variants: 3,
});

const rubyFloor = extend(Floor, "ruby-floor", {
	variants: 3,
});

const spinel = extend(Floor, "spinel", {
	variants: 3,
});

//Vents
const topazVent = extend(SteamVent, "topaz-vent", {
	parent: topazVeins,
	blendGroup: topazVeins,
	variants: 2
});
topazVent.attributes.set(Attribute.steam, 1);

const amberVent = extend(SteamVent, "amber-vent", {
	parent: amber,
	blendGroup: amber,
	variants: 2
});
amberVent.attributes.set(Attribute.steam, 1);

const sapphiricVent = extend(SteamVent, "sapphiric-vent", {
	parent: sapphiricStone,
	blendGroup: sapphiricStone,
	variants: 2
});
sapphiricVent.attributes.set(Attribute.steam, 1.2);

const blueStoneVent = extend(SteamVent, "blue-stone-vent", {
	parent: denseBlueStone,
	blendGroup: denseBlueStone,
	variants: 2
});
blueStoneVent.attributes.set(Attribute.steam, 1.2);

const amethystVent = extend(SteamVent, "amethyst-vent", {
	parent: amethystFloor,
	blendGroup: amethystFloor,
	variants: 2
});
amethystVent.attributes.set(Attribute.steam, 1);

const purpleStoneVent = extend(SteamVent, "purple-stone-vent", {
	parent: purpleStone,
	blendGroup: purpleStone,
	variants: 2
});
purpleStoneVent.attributes.set(Attribute.steam, 1);

const rubyVent = extend(SteamVent, "ruby-vent", {
	parent: rubyFloor,
	blendGroup: rubyFloor,
	variants: 2
});
rubyVent.attributes.set(Attribute.steam, 1);

const spinelVent = extend(SteamVent, "spinel-vent", {
	parent: spinel,
	blendGroup: spinel,
	variants: 2
});
spinelVent.attributes.set(Attribute.steam, 1);

//Argon Rifts
const rhyoliteArgonRift = extend(SteamVent, "rhyolite-argon-rift", {
	parent: Blocks.rhyolite,
	blendGroup: Blocks.rhyolite,
	effect: Fx.none,
	variants: 2
});
rhyoliteArgonRift.attributes.set(argonAttr, 1);

const carbonArgonRift = extend(SteamVent, "carbon-argon-rift", {
	parent: Blocks.carbonStone,
	blendGroup: Blocks.carbonStone,
	effect: Fx.none,
	variants: 2
});
carbonArgonRift.attributes.set(argonAttr, 1);

const arkyicArgonRift = extend(SteamVent, "arkyic-argon-rift", {
	parent: Blocks.arkyicStone,
	blendGroup: Blocks.arkyicStone,
	effect: Fx.none,
	variants: 2
});
arkyicArgonRift.attributes.set(argonAttr, 1);

const yellowStoneArgonRift = extend(SteamVent, "yellow-stone-argon-rift", {
	parent: Blocks.yellowStone,
	blendGroup: Blocks.yellowStone,
	effect: Fx.none,
	variants: 2
});
yellowStoneArgonRift.attributes.set(argonAttr, 1);

const redStoneArgonRift = extend(SteamVent, "red-stone-argon-rift", {
	parent: Blocks.denseRedStone,
	blendGroup: Blocks.denseRedStone,
	effect: Fx.none,
	variants: 2
});
redStoneArgonRift.attributes.set(argonAttr, 1);

const crystallineArgonRift = extend(SteamVent, "crystalline-argon-rift", {
	parent: Blocks.crystallineStone,
	blendGroup: Blocks.crystallineStone,
	effect: Fx.none,
	variants: 2
});
crystallineArgonRift.attributes.set(argonAttr, 1);

const topazArgonRift = extend(SteamVent, "topaz-argon-rift", {
	parent: topazVeins,
	blendGroup: topazVeins,
	effect: Fx.none,
	variants: 2
});
topazArgonRift.attributes.set(argonAttr, 1);

const amberArgonRift = extend(SteamVent, "amber-argon-rift", {
	parent: amber,
	blendGroup: amber,
	effect: Fx.none,
	variants: 2
});
amberArgonRift.attributes.set(argonAttr, 1);

const sapphiricArgonRift = extend(SteamVent, "sapphiric-argon-rift", {
	parent: sapphiricStone,
	blendGroup: sapphiricStone,
	effect: Fx.none,
	variants: 2
});
sapphiricArgonRift.attributes.set(argonAttr, 1);

const blueStoneArgonRift = extend(SteamVent, "blue-stone-argon-rift", {
	parent: denseBlueStone,
	blendGroup: denseBlueStone,
	effect: Fx.none,
});
blueStoneArgonRift.attributes.set(argonAttr, 1);

const amethystArgonRift = extend(SteamVent, "amethyst-argon-rift", {
	parent: amethystFloor,
	blendGroup: amethystFloor,
	effect: Fx.none,
});
amethystArgonRift.attributes.set(argonAttr, 1.2);

const purpleStoneArgonRift = extend(SteamVent, "purple-stone-argon-rift", {
	parent: purpleStone,
	blendGroup: purpleStone,
	effect: Fx.none,
});
purpleStoneArgonRift.attributes.set(argonAttr, 1.2);

const rubyArgonRift = extend(SteamVent, "ruby-argon-rift", {
	parent: rubyFloor,
	blendGroup: rubyFloor,
	effect: Fx.none,
	variants: 2
});
rubyArgonRift.attributes.set(argonAttr, 1);

const spinelArgonRift = extend(SteamVent, "spinel-argon-rift", {
	parent: spinel,
	blendGroup: spinel,
	effect: Fx.none,
	variants: 2
});
spinelArgonRift.attributes.set(argonAttr, 1);

//Static Walls
const markingWall = extend(StaticWall, "marking-wall", {
    variants: 3
});

const plateWall = extend(StaticWall, "plate-wall", {
    variants: 2
});

const topazWall = extend(StaticWall, "topaz-wall", {});
topazVeins.asFloor().wall = topazWall;

const amberWall = extend(StaticWall, "amber-wall", {});
amber.asFloor().wall = amberWall;

const sapphiricStaticWall = extend(StaticWall, "sapphiric-static-wall", {});
sapphiricStone.asFloor().wall = sapphiricStaticWall;
smoothSapphire.asFloor().wall = sapphiricStaticWall;

const blueStoneWall = extend(StaticWall, "blue-stone-wall", {});
blueStone.asFloor().wall = blueStoneWall;
denseBlueStone.asFloor().wall = blueStoneWall;

const amethystWall = extend(StaticWall, "amethyst-wall", {
	variants: 3,
});
amethystFloor.asFloor().wall = amethystWall;

const purpleStoneWall = extend(StaticWall, "purple-stone-wall", {
	variants: 3,
});
purpleStone.asFloor().wall = purpleStoneWall;

const rubyStone = extend(StaticWall, "ruby-stone", {
    variants: 2
});
rubyFloor.asFloor().wall = rubyStone;

const spinelWall = extend(StaticWall, "spinel-wall", {
    variants: 2
});
spinel.asFloor().wall = spinelWall;

//Decoration
const topazBoulder = extend(Prop, "topaz-boulder", {
	variants: 2,
});
topazVeins.asFloor().decoration = topazBoulder;
smoothTopaz.asFloor().decoration = topazBoulder;

const amberBoulder = extend(Prop, "amber-boulder", {
	variants: 2,
});
amber.asFloor().decoration = amberBoulder;

const sapphiricBoulder = extend(Prop, "sapphiric-boulder", {
	variants: 2,
});
sapphiricStone.asFloor().decoration = sapphiricBoulder;
smoothSapphire.asFloor().decoration = sapphiricBoulder;

const blueStoneBoulder = extend(Prop, "blue-stone-boulder", {
	variants: 4,
});
blueStone.asFloor().decoration = blueStoneBoulder;
denseBlueStone.asFloor().decoration = blueStoneBoulder;

const amethystBoulder = extend(Prop, "amethyst-boulder", {
	variants: 2,
});
amethystFloor.asFloor().decoration = amethystBoulder;

const purpleStoneBoulder = extend(Prop, "purple-stone-boulder", {
	variants: 2,
});
purpleStone.asFloor().decoration = purpleStoneBoulder;

const rubyBoulder = extend(Prop, "ruby-boulder", {
	variants: 3,
});
rubyFloor.asFloor().decoration = rubyBoulder;

const spinelBoulder = extend(Prop, "spinel-boulder", {
	variants: 2,
});
spinel.asFloor().decoration = spinelBoulder;

const metalTree = extend(TreeBlock, "metal-tree", {
    variants: 1
});

const topazBlocks = extend(TallBlock, "topaz-block", {
    variants: 2,
    clipSize: 128,
    shadowAlpha: 0.5,
    shadowOffset: -2.5
});

const sapphiricRock = extend(TallBlock, "sapphiric-rock", {
    variants: 0,
    clipSize: 128,
    shadowAlpha: 0.5,
    shadowOffset: -2.5
});

const sapphiricRockLarge = extend(TallBlock, "sapphiric-rock-large", {
    variants: 0,
    clipSize: 128,
    shadowAlpha: 0.5,
    shadowOffset: -2.5
});

const rubyGrowths = extend(TallBlock, "ruby-growths", {
    variants: 0,
    clipSize: 128,
    shadowAlpha: 0.5,
    shadowOffset: -2.5
});

//Ores
const oreEmerald = extend(OreBlock, "ore-emerald", {});

const oreRuby = extend(OreBlock, "ore-ruby", {});

const oreDiamond = extend(OreBlock, "ore-diamond", {});

const oreCreostone = extend(OreBlock, "ore-creostone", {});

const oreSapphire = extend(OreBlock, "ore-sapphire", {
	itemDrop: items.sapphire,
});

const wallOreSapphire = extend(OreBlock, "ore-wall-sapphire", {
	wallOre: true,
	itemDrop: items.sapphire,
});

const oreAmethyst = extend(OreBlock, "ore-amethyst", {
	itemDrop: items.amethyst,
});

const wallOreAmethyst = extend(OreBlock, "ore-wall-amethyst", {
	wallOre: true,
	itemDrop: items.amethyst,
});

const wallOreRuby = extend(OreBlock, "ore-wall-ruby", {
	wallOre: true,
	itemDrop: items.ruby,
});

module.exports = {
	topazAttr: topazAttr,
	argonAttr: argonAttr,
}