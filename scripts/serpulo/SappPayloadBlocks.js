const baseFabricator = extend(UnitFactory, "base-fabricator", {
    envDisabled: Env.scorching
});
const adoptiveReconstructor = extend(Reconstructor, "adoptive-reconstructor", {
    envDisabled: Env.scorching
});
const logicEncoder = extend(Reconstructor, "logic-encoder", {
    envDisabled: Env.scorching
});
const electronicModifier = extend(Reconstructor, "electronic-modifier", {
    envDisabled: Env.scorching
});
const innardDecrypter = extend(Reconstructor, "innard-decrypter", {
    envDisabled: Env.scorching
});

const regen = extend(ParticleEffect, {
	region: "sapphirium-rhombus",
	length: 0,
	sizeFrom: 4,
	sizeTo: 0,
	lifetime: 35,
	colorFrom: Pal.heal,
	colorTo: Pal.heal,
	particles: 1
});

const regeneration = extend(StatusEffect, "regeneration", {
	speedMultiplier: 1.35,
	damageMultiplier: 1.35,
	relooadMultiplier: 1.35,
	healthMultiplier: 0.7,
	damage: -0.2,
	effect: regen,
	effectChance: 0.07,
	color: Pal.heal,
});

var activeEffect = extend(WaveEffect, {
   sides: 8,
   strokeFrom: 4,
   strokeTo: 0,
   sizeFrom: 0,
   sizeTo: 160,
   lifetime: 180,
   interp: Interp.circleOut,
   colorFrom: Pal.heal,
   colorTo: Pal.heal,
});
var healRhombus = extend(ParticleEffect, {
	particles: 1,
	sizeFrom: 14,
	sizeTo: 0,
	spin: 7,
	colorFrom: Pal.heal,
    colorTo: Pal.heal,
    lifetime: 180,
    length: 0,
});
	
var status = new Stat("status", StatCat.function);
var time = new Stat("time", StatCat.function);
var placeholder = extend(ExplosionBulletType, {
	killShooter: false,
	splashDamage: 0,
	splashDamageRadius: 160,
	hitEffect: Fx.none,
	despawnEffect: Fx.none,
	shootEffect: Fx.none,
	smokeEffect: Fx.none,
});

var timer = 1;
const regenFielder = extend(PowerTurret, "regen-fielder", {
	reload: 1,
	rotateSpeed: 360,
	shootCone: 360,
	shootSound: Sounds.none,
	range: 160,
	shootY: 0,
	alwaysShooting: true,
	recoil: 0,
	playerControllable: false,
	logicControllable: false,
	shootType: placeholder,
	setStats(){
		this.super$setStats();
			this.stats.remove(Stat.ammo);
			this.stats.remove(Stat.inaccuracy);
			this.stats.remove(Stat.reload);
			this.stats.remove(Stat.targetsAir);
            this.stats.remove(Stat.targetsGround);
			this.stats.add(status, StatValues.content(regeneration));
		    this.stats.add(time, (355 / 60), StatUnit.seconds);
		}
	});
regenFielder.consumePower(6.5);
regenFielder.buildType = () => extend(PowerTurret.PowerTurretBuild, regenFielder, {
	updateTile(){
		this.super$updateTile();
		let rf = this.isShooting() && this.hasAmmo() && this.power.status >= 0.1;
		timer += Time.delta;
		if(rf){
			if(timer >= 180){
				Units.nearby(this.team, this.x, this.y, 160, unit => {
					if(unit.damaged()){
						unit.apply(regeneration, 355);
						activeEffect.at(this.x, this.y);
						healRhombus.at(this.x, this.y);
				}
			});
			timer = 0;
				}
			}
		}
	});
