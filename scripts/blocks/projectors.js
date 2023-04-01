const items = require("items");

const energyFieldProjector = extend(DroneCenter, "energy-field-projector", {
	status: StatusEffects.none,
	droneRange: 140,
	droneConstructTime: 60,
	init(){
		this.super$init();
		this.droneType.aiController = () => extend(FlyingAI, {});
		},
	});

const pushWave = new Effect(15, 180, e => {
        Draw.color(Color.white, Pal.lancerLaser, e.fin());
        Lines.stroke(e.fout() * 2 + 0.3);
        Lines.square(e.x, e.y, e.fin() * 20);
    });

const pushProjector = extend(PowerTurret, "push-projector", {});
pushProjector.shootEffect = pushWave;

const flashlight = extend(LightBlock, "flashlight", {});

const creostoneMine = extend(ShockMine, "creostone-mine", {});

const indBar = extend(ForceProjector, "indigo-barrier", {
  drawPlace(x, y, rotation, valid){
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

/*ndBar.itemConsumer = consumeItem(items.globium).boost();*/
indBar.consumePower(8);

indBar.buildType = () => extend(ForceProjector.ForceBuild, indBar, {
    drawShield(){
        if(!this.broken){
            var radius = this.realRadius();

            var flash = 10 * (this.phaseHeat - 0.46);
            flash += flash * Time.delta;

            Draw.color(Pal.lancerLaser, Pal.lancerLaser, Mathf.absin(flash, 9, 1));

            Draw.z(Layer.shields);
            if(Core.settings.getBool("animatedshields")){
                Fill.poly(this.x, this.y, 8, radius);
            }else{
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

const crystalAccelerator = extend(OverdriveProjector, "crystal-accelerator", {
envDisabled: Env.scorching
});