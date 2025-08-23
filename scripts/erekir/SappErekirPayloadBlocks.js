const sappErekirUnits = require("erekir/SappErekirUnits");
const sappErekirWalls = require("erekir/SappErekirWalls");

const huntersFabricator = extend(UnitFactory, "hunters-fabricator", {});

const pacificationFactory = extend(UnitFactory, "pacification-factory", {});

const faithFabricator = extend(UnitFactory, "faith-fabricator", {});

const ghostFabricator = extend(UnitFactory, "ghost-fabricator", {});

const huntersRefabricator = extend(Reconstructor, "hunters-refabricator", {});

const sapphireRefabricator = extend(Reconstructor, "sapphire-refabricator", {});

const faithRefabricator = extend(Reconstructor, "faith-refabricator", {});

const ghostRefabricator = extend(Reconstructor, "ghost-refabricator", {});

const factionRefabricator = extend(Reconstructor, "faction-refabricator", {});

const huntersAssembler = extend(UnitAssembler, "hunters-assembler", {});
huntersAssembler.plans.add(
UnitAssembler.AssemblerUnitPlan(sappErekirUnits.raptor, 3600, PayloadStack.list(sappErekirUnits.hound, 5, sappErekirWalls.sapphireWallLarge, 8)),
UnitAssembler.AssemblerUnitPlan(sappErekirUnits.maw, 14400, PayloadStack.list(sappErekirUnits.rampage, 6, sappErekirWalls.carvedWallLarge, 8))
);

const sapphireShipsAssembler = extend(UnitAssembler, "sapphire-ships-assembler", {});
sapphireShipsAssembler.plans.add(
UnitAssembler.AssemblerUnitPlan(sappErekirUnits.obediencePhase1, 3600, PayloadStack.list(sappErekirUnits.pacificationMove, 3, sappErekirWalls.sapphireWall, 4)),
UnitAssembler.AssemblerUnitPlan(sappErekirUnits.subordinationPhase1, 14400, PayloadStack.list(sappErekirUnits.curbingPhase1, 4, sappErekirWalls.sapphireWallLarge, 6))
);

const faithAssembler = extend(UnitAssembler, "faith-assembler", {});
faithAssembler.plans.add(
UnitAssembler.AssemblerUnitPlan(sappErekirUnits.penance, 3600, PayloadStack.list(sappErekirUnits.phenomenon, 5, sappErekirWalls.sapphireWallLarge, 8)),
UnitAssembler.AssemblerUnitPlan(sappErekirUnits.milestone, 14400, PayloadStack.list(sappErekirUnits.loyalty, 6, sappErekirWalls.carvedWallLarge, 8))
);

const ghostAssembler = extend(UnitAssembler, "ghost-assembler", {});
ghostAssembler.plans.add(
UnitAssembler.AssemblerUnitPlan(sappErekirUnits.ooze, 3600, PayloadStack.list(sappErekirUnits.presence, 5, sappErekirWalls.sapphireWallLarge, 8)),
UnitAssembler.AssemblerUnitPlan(sappErekirUnits.gaze, 14400, PayloadStack.list(sappErekirUnits.apparition, 6, sappErekirWalls.carvedWallLarge, 8))
);

const advancedSapphireModule = extend(UnitAssemblerModule, "advanced-sapphire-module", {});

const customValue = method => new StatValue() {
    display: method
}

const differenceFactory = extend(UnitCargoLoader, "difference-factory", {
setStats(){
	this.super$setStats();
	this.stats.add(Stat.output, customValue(table => {
        	table.row();
            table.table(Styles.grayPanel, b => {
                b.image(sappErekirUnits.difference.uiIcon).size(40).pad(10).left().scaling(Scaling.fit);
                b.table(cons(info => {
                    info.add(sappErekirUnits.difference.localizedName).left();
                    info.row();
                    info.add(Strings.autoFixed(1500 / 60, 1) + " " + Core.bundle.get("unit.seconds")).color(Color.lightGray);
                })).left();
                b.button("?", Styles.flatBordert, () => Vars.ui.content.show(sappErekirUnits.difference)).size(40).pad(10).right().grow().visible(() => sappErekirUnits.difference.unlockedNow());
            }).growX().pad(5).row();
        }));
        }
});
differenceFactory.buildType = () => extend(UnitCargoLoader.UnitTransportSourceBuild, differenceFactory, {
	acceptItem(source, item){
		return this.items.get(item) < this.getMaximumAccepted(item);
		}
});

const rapixSpawner = extend(UnitCargoLoader, "rapix-spawn-point", {
	squareSprite: false,
setStats(){
	this.super$setStats();
	this.stats.add(Stat.output, customValue(table => {
        	table.row();
            table.table(Styles.grayPanel, b => {
                b.image(sappErekirUnits.rapix.uiIcon).size(40).pad(10).left().scaling(Scaling.fit);
                b.table(cons(info => {
                    info.add(sappErekirUnits.rapix.localizedName).left();
                    info.row();
                    info.add(Strings.autoFixed(1500 / 60, 1) + " " + Core.bundle.get("unit.seconds")).color(Color.lightGray);
                })).left();
                b.button("?", Styles.flatBordert, () => Vars.ui.content.show(sappErekirUnits.rapix)).size(40).pad(10).right().grow().visible(() => sappErekirUnits.rapix.unlockedNow());
            }).growX().pad(5).row();
        }));
        }
});

const erekirWalls = require("erekir/SappErekirWalls");
Blocks.constructor.filter = Seq.with(Blocks.tungstenWallLarge, Blocks.berylliumWallLarge, Blocks.carbideWallLarge, Blocks.reinforcedSurgeWallLarge, Blocks.reinforcedLiquidContainer, Blocks.reinforcedContainer, Blocks.beamNode, erekirWalls.sapphireWall, erekirWalls.sapphireWallLarge, erekirWalls.carvedWall, erekirWalls.carvedWallLarge);