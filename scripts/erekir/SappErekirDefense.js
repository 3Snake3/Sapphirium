const statuses = require("SappStatuses");
const sappErekirUnits = require("erekir/SappErekirUnits");

const sapphireRestorer = extend(MendProjector, "sapphire-restorer", {});

const customValue = method => new StatValue() {
    display: method
}
const abilities = new Seq();
var abilitiesFunction = new Stat("abilities", StatCat.function);

const energyFieldAbility = extend(EnergyFieldAbility, 180, 60, 800, {
	status: statuses.shockStun,
	statusDuration: 1,
	hitBuildings: false,
	healPercent: 2,
	maxTargets: 40,
	addStats(t){
		t.add(Core.bundle.get("ability." + "energyfield" + ".description")).wrap().width(350);
		t.row();
        t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / 60, 2) + " " + StatUnit.perSecond.localized());
        t.row();
        t.add(Core.bundle.format("bullet.range", Strings.autoFixed(800 / Vars.tilesize, 2)));
        t.row();
        t.add(Core.bundle.format("bullet.damage", 180));
        t.row();
        t.add(Core.bundle.format("bullet.healpercent", 2));
        t.row();
        t.add(Core.bundle.format("stat.max-targets", 3));
        t.row();
        t.add(statuses.shockStun.emoji() + statuses.shockStun.localizedName + "[lightgray] ~ [stat]" + (1 / 60) + " [lightgray]" + Core.bundle.get("unit.seconds"));
	},
	localized(){
		return Core.bundle.get("ability.energyfield");
		}
});

var carvedShieldRegen = extend(ShieldRegenFieldAbility, 80, 800, 180, 800, {
  localized(){
    return Core.bundle.get("ability.shieldregenfield")
  }
});
var carvedForceField = extend(ForceFieldAbility, 800, 0.2, 800, 600, {
  localized() {
    return Core.bundle.get("ability.forcefield")
  }
});

var carvedAbilities = abilities.addAll(energyFieldAbility, carvedShieldRegen, carvedForceField);

const energyFieldEr = extend(UnitCargoLoader, "energy-field-projector-erekir", {
setStats(){
	this.super$setStats();
this.stats.add(abilitiesFunction, StatValues.abilities(carvedAbilities));
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