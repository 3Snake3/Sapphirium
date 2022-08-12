const smallDrill = extend(Drill, "smalldrill", {
	setStats(){
		this.super$setStats();
		this.stats.remove(Stat.boostEffect);
	},
	setBars(){
		this.super$setBars();
		this.removeBar("liquid");
		},
	liquidCapacity: 0
});

const oilPump = extend(SolidPump, "oil-pump", {});

const slagExtractor = extend(Fracker, "slag-extractor", {});

const sandMine = extend(GenericCrafter, "sand-mine", {});

const coalMine = extend(GenericCrafter, "coal-mine", {});

const sporeExtractor = extend(AttributeCrafter, "spore-extractor", {});

const titaniumExtractor = extend(GenericCrafter, "titanium-extractor", {});
  
const emeraldDrill = extend(GenericCrafter, "emerald-drill", {});

const tm = extend(AttributeCrafter, "thorium-mine", {
});

const granateDrill = extend(GenericCrafter, "granate-drill", {});

const lightCrystallizer = extend(AttributeCrafter, "light-crystallizer", {
    attribute: Attribute.water,
    maxBoost: 3
});

const creostoneDrill = extend(Drill, "creostone-drill", {});

const lightningDrill = extend(Drill, "lightning-drill", {});

const lightDrillingRig = extend(Drill, "light-drilling-rig", {});