const statuses = require("SappStatuses");

const ledonite = extend(Liquid, "ledonite-liquid", {
    effect: statuses.superFreezing,
});

const creotite = extend(Liquid, "creotite", {
    effect: StatusEffects.melting,
});

const acid = extend(Liquid, "acid", {
    effect: statuses.acidCorrosion,
    color: Pal.heal,
    coolant: false,
    explosiveness: 0.7,
    hidden: true,
});

const charge = 1;
const surgeMass = extend(Liquid, "surge-mass", {
	setStats() {
		this.super$setStats();
	    this.stats.addPercent(Stat.charge, charge);
	},
	temperature: 1,
	viscosity: 0.8,
	effect: statuses.overload,
	color: Pal.surge,
	lightColor: Color.valueOf("fff8a5"),
});

const argon = extend(Liquid, "argon", {});

module.exports = {
    surgeMass: surgeMass,
    ledonite: ledonite,
    creotite: creotite,
    argon: argon,
    acid: acid
}