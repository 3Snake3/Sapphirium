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

const sandMine = extend(GenericCrafter, "sand-mine", {});

const sporeExtractor = extend(AttributeCrafter, "spore-extractor", {});

const titaniumExtractor = extend(GenericCrafter, "titanium-extractor", {});
  
const emeraldDrill = extend(GenericCrafter, "emerald-drill", {});

const thoriumMine = extend(AttributeCrafter, "thorium-mine", {});

const rubyDrill = extend(GenericCrafter, "ruby-drill", {});
rubyDrill.envDisabled = Env.scorching;

const creostoneDrill = extend(Drill, "creostone-drill", {});
creostoneDrill.envDisabled = Env.scorching;

const lightningDrill = extend(Drill, "lightning-drill", {});
lightningDrill.envDisabled = Env.scorching;

const lightDrillingRig = extend(Drill, "light-drilling-rig", {});
lightDrillingRig.envDisabled = Env.scorching;