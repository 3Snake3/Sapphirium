const statuses = require("SappStatuses");
const sappErekirUnits = require("erekir/SappErekirUnits");

const sapphireRestorer = extend(MendProjector, "sapphire-restorer", {});

const customValue = method => new StatValue() {
    display: method
}
var abilitiesFunction = new Stat("abilities", StatCat.function);

const energyFieldAbility = extend(EnergyFieldAbility, 180, 180, 800, {
	status: statuses.shockStun,
	statusDuration: 25,
	hitBuildings: false,
	healPercent: 0,
	maxTargets: 180,
	localized(){
		return Core.bundle.get("ability.energyfield");
		}
});

const energyFieldEr = extend(UnitCargoLoader, "energy-field-projector-erekir", {
setStats(){
	this.super$setStats();
this.stats.add(abilitiesFunction, StatValues.abilities(energyFieldAbility));
	this.stats.add(Stat.output, customValue(table => {
        	table.row();
            table.table(Styles.grayPanel, b => {
                b.image(sappErekirUnits.thunderbolt.uiIcon).size(40).pad(10).left().scaling(Scaling.fit);
                b.table(cons(info => {
                    info.add(sappErekirUnits.thunderbolt.localizedName).left();
                    info.row();
                    info.add(Strings.autoFixed(18000 / 60, 1) + " " + Core.bundle.get("unit.seconds")).color(Color.lightGray);
                })).left();
                b.button("?", Styles.flatBordert, () => Vars.ui.content.show(sappErekirUnits.thunderbolt)).size(40).pad(10).right().grow().visible(() => sappErekirUnits.thunderbolt.unlockedNow());
            }).growX().pad(5).row();
        }));
        }
});