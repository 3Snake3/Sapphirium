const reinforcedCreostoneConduit = extend(ArmoredConduit, "reinforced-creostone-conduit", {});
/*const bigReinforcedPump = extend(Pump, "big-reinforced-pump", {});*/
const coolingChamber = extend(GenericCrafter, "cooling-chamber", {});
const creotiteSynthesizer = extend(GenericCrafter, "creotite-synthesizer", {});
const creostoneCrucible = extend(GenericCrafter, "creostone-crucible", {});
const creostoneBeamNode = extend(PowerNode, "creostone-beam-node", {});
const creostoneBeamTower = extend(PowerNode, "creostone-beam-tower", {});
const hydroconverter = extend(ThermalGenerator, "hydroconverter", {});
const chemicalReactor = extend(ConsumeGenerator, "chemical-reactor", {});
const creotiteCombustionChamber = extend(ConsumeGenerator, "creotite-combustion-chamber", {});
const meltingProjector = extend(LiquidTurret, "melting-projector", {});
const blastMine = extend(ShockMine, "blast-mine", {});
const conductor = extend(ItemTurret, "conductor", {});
const fang = extend(ItemTurret, "fang", {});
const disarmament = extend(ItemTurret, "disarmament", {});
const aspiration = extend(ItemTurret, "aspiration", {});
const suffocation = extend(PowerTurret, "suffocation", {});
const branch = extend(PowerTurret, "branch", {});
const silence = extend(ItemTurret, "silence", {});
const crackle = extend(ItemTurret, "crackle", {});
const tranquilizer = extend(PowerTurret, "tranquilizer", {});
const corkscrew = extend(PowerTurret, "corkscrew", {});
const balance = extend(LiquidTurret, "balance", {});
const stoneTurret = extend(ItemTurret, "stone-turret", {});
const push = extend(ItemTurret, "push", {});
const multimortar = extend(ItemTurret, "multimortar", {});
const reaper = extend(ItemTurret, "reaper", {});
const neutron = extend(ItemTurret, "neutron", {});
const dublicity = extend(ItemTurret, "dublicity", {});
const reinforcedCreostoneWall = extend(Wall, "reinforced-creostone-wall", {});
const reinforcedCreostoneWallLarge = extend(Wall, "reinforced-creostone-wall-large", {});
//5 power units per tick * 60 ticks(1 sec.) = 300 units of power in the game per second
const powerProduction = 5;
//for stats
const generationType = Stat.basePowerGeneration;

const reinforcedCoreIndigo = extend(CoreBlock, "reinforced-core-indigo", {
	
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
reinforcedCoreIndigo.buildType = () => extend(CoreBlock.CoreBuild, reinforcedCoreIndigo, {
	//endowing the core with the ability to produce power
        getPowerProduction(){
            return powerProduction * productionEfficiency;
        }
    });
    
const firmament = extend(ErekirUnitType, "firmament", {});
firmament.constructor = () => extend(PayloadUnit, {});

const sapphireExtractor = extend(GenericCrafter, "sapphire-extractor", {});
const garnetExtractor = extend(GenericCrafter, "garnet-extractor", {});