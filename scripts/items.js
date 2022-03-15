const iceCube = extend(Item, "ice-cube", {});
const cryoCube = extend(Item, "cryocube", {});
const cinderblock = extend(Item, "cinderblock", {});
const creostone = extend(Item, "creostone", {});
const creosand = extend(Item, "creosand", {});
const globium = extend(Item, "globium", {});
const tinorium = extend(Item, "tinorium", {
cost: 1.2,
flammability: 1.09,
radioactivity: 0.7,
explosiveness: 0.4
});
const granate = extend(Item, "granate", {});
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