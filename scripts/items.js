const leadedCopper = extend(Item, "leaded-copper", {
cost: 0.9,
color: Color.valueOf("ffe18f")
});
const iceCube = extend(Item, "ice-cube", {
lowPriority: true
});
const cryoCube = extend(Item, "cryocube", {});
const ledoniteCube = extend(Item, "ledonite-cube", {});
const cinderblock = extend(Item, "cinderblock", {});
const creostone = extend(Item, "creostone", {});
const creosand = extend(Item, "creosand", {
lowPriority: true
});
const globium = extend(Item, "globium", {});
const tinorium = extend(Item, "tinorium", {
cost: 1.2,
flammability: 1.09,
radioactivity: 0.7,
explosiveness: 0.4
});
const granate = extend(Item, "granate", {});
const emerald = extend(Item, "emerald", {
cost: 1.6,
color: Color.valueOf("84f591")
});
const lightCrystall = extend(Item, "light-crystall", {
cost: 2,
color: Color.valueOf("ededed")
});
const surgeStone = extend(Item, "surge-stone", {});
const chgStick = extend(Item, "charged-stick", {});
const chgLead = extend(Item, "charged-lead", {});
const chgIngot = extend(Item, "charged-ingot", {});
const chgCyl = extend(Item, "charged-cylinder", {});

module.exports = {
surgeStone: surgeStone,
creostone: creostone,
globium: globium,
granate: granate
}