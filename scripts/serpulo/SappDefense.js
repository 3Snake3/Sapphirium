const items = require("SappItems");
const statuses = require("SappStatuses");

var maxTargets = new Stat("max-targets");
const energyField = extend(EnergyFieldAbility, 80, 230, 30 * Vars.tilesize, {
	addStats(t){
		t.add(Core.bundle.get("ability." + "energyfield" + ".description")).wrap().width(350);
		t.row();
        t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / 120, 2) + " " + StatUnit.perSecond.localized());
        t.row();
        t.add(Core.bundle.format("bullet.range", Strings.autoFixed(120 / Vars.tilesize, 2)));
        t.row();
        t.add(Core.bundle.format("bullet.damage", 40));
        t.row();
        t.add(Core.bundle.format("bullet.healpercent", 1.5));
        t.row();
        t.add(Core.bundle.format("stat.max-targets", 3));
        t.row();
        t.add(statuses.shockStun.emoji() + statuses.shockStun.localizedName + "[lightgray] ~ [stat]" + (15 / 60) + " [lightgray]" + Core.bundle.get("unit.seconds"));
    },
    localized(){
    	return Core.bundle.get("ability.energyfield");
    }
});

const abilities = new Seq();
var abilitiesFunction = new Stat("abilities", StatCat.function);
var energyFieldSeq = abilities.add(energyField);

const energyFieldProjector = extend(DroneCenter, "energy-field-projector", {
	status: StatusEffects.none,
	droneRange: 140,
	droneConstructTime: 60,
	init() {
		this.super$init();
		this.droneType.aiController = () => extend(FlyingAI, {});
	},
	setStats(){
		this.super$setStats();
		this.stats.add(abilitiesFunction, StatValues.abilities(energyFieldSeq));
		}
});

const crystalAccelerator = extend(OverdriveProjector, "crystal-accelerator", {
    envDisabled: Env.scorching
});

const indigoBarrier = extend(ForceProjector, "indigo-barrier", {
    drawPlace(x, y, rotation, valid) {
        this.drawPotentialLinks(x, y);

        Draw.color(Pal.lancerLaser);
        Lines.stroke(3);
        Lines.poly(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, 8, this.radius);
        Draw.color(Pal.lancerLaser);
        Lines.stroke(1);
        Lines.poly(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, 8, this.radius);
        Draw.color();
    },
    envDisabled: Env.scorching
});
indigoBarrier.consumeItem(items.globium).boost();
indigoBarrier.consumePower(8);

indigoBarrier.buildType = () => extend(ForceProjector.ForceBuild, indigoBarrier, {
    drawShield() {
        if (!this.broken) {
            var radius = this.realRadius();

            var flash = 10 * (this.phaseHeat - 0.46);
            flash += flash * Time.delta;

            Draw.color(Pal.lancerLaser, Pal.lancerLaser, Mathf.absin(flash, 9, 1));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")) {
                Fill.poly(this.x, this.y, 8, radius);
            }
            else {
                Lines.stroke(1.5);
                Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
                Fill.poly(this.x, this.y, 8, radius);
                Draw.alpha(1);
                Lines.poly(this.x, this.y, 8, radius);
                Draw.reset();
            }
        }
        Draw.reset();
    }
});

const creostoneMine = extend(ShockMine, "creostone-mine", {});

const flashlight = extend(LightBlock, "flashlight", {});