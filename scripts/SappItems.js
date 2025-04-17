const denseAlloy = extend(Item, "dense-alloy", {
    cost: 0.9,
    color: Color.valueOf("b2c5d1")
});

const iceCube = extend(Item, "ice-cube", {
    lowPriority: true
});
const cryoCube = extend(Item, "cryo-cube", {});
const ledoniteCube = extend(Item, "ledonite-cube", {});
const stone = extend(Item, "stone", {});

const emerald = extend(Item, "emerald", {
    cost: 1.25,
    color: Color.valueOf("84f591")
});

const globium = extend(Item, "globium", {});
const creostone = extend(Item, "creostone", {});

const tinorium = extend(Item, "tinorium", {
    cost: 1.6,
    flammability: 1.09,
    radioactivity: 0.7,
    explosiveness: 0.4
});

const topaz = extend(Item, "topaz", {
    color: Color.valueOf("ffe18f")
});

const sapphire = extend(Item, "sapphire", {
    cost: 1.4,
    color: Color.valueOf("8ba9e8"),
    hardness: 3,
    healthScaling: 0.7
});

const amethyst = extend(Item, "amethyst", {
hardness: 3,
});

const ruby = extend(Item, "ruby", {});

const diamond = extend(Item, "diamond", {
    cost: 4,
    color: Color.valueOf("ededed")
});

const surgeStone = extend(Item, "surge-stone", {});
const chgStick = extend(Item, "charged-stick", {});
const chgLead = extend(Item, "charged-lead", {});
const chgIngot = extend(Item, "charged-ingot", {});
const chgCyl = extend(Item, "charged-cylinder", {});

const carvedAlloy = extend(Item, "carved-alloy", {
    charge: 2.0
});

module.exports = {
    surgeStone: surgeStone,
    creostone: creostone,
    globium: globium,
    ruby: ruby,
    sapphire: sapphire,
    topaz: topaz,
    diamond: diamond,
    amethyst: amethyst,
    carvedAlloy: carvedAlloy,
    emerald: emerald
}