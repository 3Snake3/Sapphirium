const difference = extend(ErekirUnitType, "difference", {
defaultCommand: UnitCommand.moveCommand,
});
difference.constructor = () => extend(BuildingTetherPayloadUnit, {});

const differenceFactory = extend(DroneCenter, "difference-factory", {
	status: StatusEffects.none,
	droneRange: 140,
	configurable: false,
	init(){
		this.super$init();
		this.droneType.aiController = () => extend(FlyingAI, {});
		},
	});

const reinforcedCreostoneConduit = extend(ArmoredConduit, "reinforced-creostone-conduit", {});
const coolingChamber = extend(GenericCrafter, "cooling-chamber", {});
const creotiteSynthesizer = extend(GenericCrafter, "creotite-synthesizer", {});
const creostoneCrucible = extend(GenericCrafter, "creostone-crucible", {});
const creostoneBeamNode = extend(PowerNode, "creostone-beam-node", {});
const creostoneBeamTower = extend(PowerNode, "creostone-beam-tower", {});
const hydroconverter = extend(ThermalGenerator, "hydroconverter", {});
const chemicalReactor = extend(ConsumeGenerator, "chemical-reactor", {});
const creotiteCombustionChamber = extend(ConsumeGenerator, "creotite-combustion-chamber", {});
const energySphereGenerator = extend(DroneCenter, "energy-sphere-generator", {
	status: StatusEffects.none,
	absorbLasers: true,
	droneRange: 140,
	configurable: false,
	init(){
		this.super$init();
		this.droneType.aiController = () => extend(FlyingAI, {});
		},
	});
const meltingProjector = extend(LiquidTurret, "melting-projector", {});
const amethystOverdriver = extend(OverdriveProjector, "amethyst-overdriver", {});
const blastMine = extend(ShockMine, "blast-mine", {});
const conductor = extend(ItemTurret, "conductor", {});
const fang = extend(ItemTurret, "fang", {});
const disarmament = extend(ItemTurret, "disarmament", {});
const aspiration = extend(ItemTurret, "aspiration", {});
const suffocation = extend(ItemTurret, "suffocation", {});
suffocation.envDisabled = Env.spores | Env.groundOil | Env.groundWater | Env.oxygen;
const branch = extend(PowerTurret, "branch", {});
const silence = extend(ItemTurret, "silence", {});
const crackle = extend(ItemTurret, "crackle", {});
const tranquilizer = extend(PowerTurret, "tranquilizer", {});
const corkscrew = extend(PowerTurret, "corkscrew", {});
const crucifix = extend(PowerTurret, "crucifix", {});
const attraction = extend(ItemTurret, "attraction", {});
const balance = extend(LiquidTurret, "balance", {});
const stoneTurret = extend(ItemTurret, "stone-turret", {});
const push = extend(ItemTurret, "push", {});
const multimortar = extend(ItemTurret, "multimortar", {});
const reaper = extend(ItemTurret, "reaper", {});
const neutron = extend(ItemTurret, "neutron", {});
const dublicity = extend(ItemTurret, "dublicity", {});
const reinforcedCreostoneWall = extend(Wall, "reinforced-creostone-wall", {});
const reinforcedCreostoneWallLarge = extend(Wall, "reinforced-creostone-wall-large", {});
const regenPurple = new Effect(100, e => {
        Draw.color(Color.valueOf("f08dd5"));
        Fill.square(e.x, e.y, e.fslope() * 1.5 + 0.14, 45);
    });
const amethystWall = extend(RegenProjector, "amethyst-wall", {});
amethystWall.effect = regenPurple;
const amethystWallLarge = extend(RegenProjector, "amethyst-wall-large", {
size: 2
});
amethystWallLarge.effect = regenPurple;

//5 power units per tick * 60 ticks(1 sec.) = 300 units of power in the game per second
const powerProduction = 5;
//for stats
const generationType = Stat.basePowerGeneration;

const tesla = extend(CoreBlock, "tesla", {
	
    hasPower: true,
    outputsPower: true,
    consumesPower: false,
	
	//for stats
    setStats(){
        this.super$setStats();
        this.stats.add(generationType, powerProduction * 60, StatUnit.powerSecond);
    },
	
	//for bars
    setBars(){
    this.super$setBars();
        this.addBar("poweroutput", entity => new Bar(
	    () => Core.bundle.format("bar.poweroutput", powerProduction * 60), 
	    () => Pal.powerBar, 
	    () => 1
	));
    },

    baseExplosiveness: 10,
});

//efficiency multiplier 
const productionEfficiency = 1.0;
tesla.buildType = () => extend(CoreBlock.CoreBuild, tesla, {
	//endowing the core with the ability to produce power
        getPowerProduction(){
            return powerProduction * productionEfficiency;
        }
    });
    
const corePurpleNight = extend(CoreBlock, "core-purple-night", {});
    
const firmament = extend(ErekirUnitType, "firmament", {});
firmament.constructor = () => extend(PayloadUnit, {});

const observer = extend(ErekirUnitType, "observer", {});
observer.constructor = () => extend(PayloadUnit, {});

const energySphere = extend(ErekirUnitType, "energy-sphere", {});
energySphere.constructor = () => extend(BuildingTetherPayloadUnit, {});

const composure = extend(ErekirUnitType, "composure", {});
composure.constructor = () => extend(BuildingTetherPayloadUnit, {});

const mourning = extend(ErekirUnitType, "mourning", {});
mourning.constructor = () => extend(BuildingTetherPayloadUnit, {});

const fatum = extend(ErekirUnitType, "fatum", {});
fatum.constructor = () => extend(LegsUnit, {});

const sapphireExtractor = extend(GenericCrafter, "sapphire-extractor", {});
const amethystMine = extend(GenericCrafter, "amethyst-mine", {});
const rubyExtractor = extend(GenericCrafter, "ruby-extractor", {});