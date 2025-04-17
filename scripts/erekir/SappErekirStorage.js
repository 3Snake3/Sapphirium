const statuses = require("SappStatuses");
const items = require("SappItems");
const statss = require("erekir/SappErekirWalls");
//5 power units per tick * 60 ticks(1 sec.) = 300 units of power in the game per second
const powerProduction = 8;

var healingFunction = new Stat("healing-function", StatCat.function);

//sapphire branch
const tesla = extend(CoreBlock, "tesla", {
    hasPower: true,
    outputsPower: true,
    consumesPower: false,
    squareSprite: false,

	//for stats
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.basePowerGeneration, powerProduction * 60, StatUnit.powerSecond);
        this.stats.addPercent(healingFunction, (2.5 / 100));
    },
	//for bars
    setBars() {
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
        creload: 0,
	    updateTile(){
            this.super$updateTile();
            if(this.creload == 6 && this.damaged() && !this.isHealSuppressed() && !this.checkSuppression()){
                this.heal(this.maxHealth * 2.5 / 100);
                this.recentlyHealed();
                Fx.healBlockFull.at(this.x, this.y, this.block.size, Color.valueOf("ab8ea4"), this.block);
                this.creload = 0;
            }
            else this.creload++;
            return true;
        },
	//endowing the core with the ability to produce power
        getPowerProduction(){
            return powerProduction * productionEfficiency;
        }
    });
    
//amethyst branch
var fadingSparks = extend(ParticleEffect, {
    particles: 12,
    line: true,
    cone: 360,
    length: 36,
    lenFrom: 10,
    lenTo: 0,
    strokeFrom: 2,
    lifetime: 30,
    strokeTo: 0,
    colorFrom: Color.valueOf("c093fa"),
    colorTo: Color.valueOf("c093fa00"),
});
var purpleWave = extend(WaveEffect, {
    sides:4,
    sizeFrom: 24,
    sizeTo: 240,
    lifetime: 160,
    strokeFrom: 6,
    strokeTo: 2,
    colorFrom: Color.valueOf("c093fa"),
    colorTo: Color.valueOf("c093fa00"),
});
var waveSparks = extend(ParticleEffect, {
    particles: 8,
    line: true,
    cone: 360,
    length: 320,
    lenFrom:6,
    lenTo: 14,
    strokeFrom: 0,
    lifetime: 160,
    strokeTo: 2,
    colorFrom: Color.valueOf("c093fa"),
    colorTo: Color.valueOf("c093fa00"),
});
var mainstar = extend(ParticleEffect, {
    particles: 1,
    cone: 30,
    length: 0,
    lifetime: 60,
    sizeFrom: 7,
    sizeTo: 2,
    region:"sapphirium-star-effect",
    colorFrom: Color.valueOf("c093fa"),
    colorTo: Color.valueOf("ffffff00"),
});
var ObserStar = extend(BasicBulletType, {
	damage: 75,
	lifetime: 40,
	width: 5,
	length: 14,
	speed:4.5,
    pierceArmor: true,
    trailWidth: 1.7,
    trailLength: 100,
    homingPower: 0.4,
    homingRange: 46,
    sprite: "sapphirium-star-bullet",
    backColor: Color.valueOf("c093fa"),
    trailColor: Color.valueOf("c093fa"),
	hitColor: Color.valueOf("c093fa"),
	status: statuses.execute,
	despawnEffect: new MultiEffect(fadingSparks, mainstar),
});

var shellStat = new Stat("shell", StatCat.function);

const corePurpleNight = extend(CoreBlock, "core-purple-night", {
    squareSprite: false,
    setStats() {
        this.super$setStats();
    this.stats.add(shellStat, StatValues.ammo(ObjectMap.of(items.amethyst, ObserStar)));
    }
});

corePurpleNight.buildType = () => extend(CoreBlock.CoreBuild, corePurpleNight, {
    creload: 0,
	collision(bullet) {
        this.super$collision(bullet);
        this.creload++;
        if(this.creload == 16) {
            var randstar = Mathf.random(12, 19);
            for(var i = 0; i < randstar; i++) {
                var ObserStar_obj = ObserStar.create(this, this.x + Mathf.random(-3,3), this.y+ Mathf.random(-3,3), Mathf.range(0.0,360.0));
        	    ObserStar_obj.vel.scl(Mathf.random(0.6,1.8));
        	    purpleWave.at(this.x, this.y);
        	    waveSparks.at(this.x, this.y);
        	    Sounds.release.at(this);
            }
        }
        else if(this.creload >= 17) {
        	this.creload = 0;
        }
        return true;
    }
});

const energonShell = extend(BasicBulletType, 10, 80, {
	width: 16,
	height: 20,
	trailWidth: 3.30,
	trailLength: 18,
	backColor: Color.sky,
	hitColor: Color.sky,
	trailColor: Color.sky,
	frontColor: Color.white,
	hitEffect: Fx.hitBulletColor,
	despawnEffect: Fx.hitBulletColor,
	pierceCap: 2,
	knockback: 2,
	homingPower: 0.18,
	homingRange: 30 * Vars.tilesize,
	trailEffect: Fx.disperseTrail,
	trailChance: 0.5,
	bulletInterval: 20,
	intervalBullet: extend(LightningBulletType, {
		damage: 45,
		lightningLength: 3,
		llightningLengthRand: 5,
		llightningColor: Color.sky,
	}),
	hitSound: Sounds.spark,
});

const energonShootWave = extend(WaveEffect, {
	sizeTo: 8,
	strokeFrom: 3,
	strokeTo: 0.3,
	colorFrom: Color.sky,
	colorTo: Color.sky,
	lifetime: 20,
});

const energonShootSparks = extend(ParticleEffect, {
	line: true,
	length: 18,
	cone: 360,
	interp: Interp.pow2Out,
	lenFrom: 6,
	lenTo: 0,
	lifetime: 80,
	strokeFrom: 3,
	strokeTo: 0.3,
	colorFrom: Color.sky,
	colorTo: Color.sky,
});

const energonMulti = new MultiEffect(energonShootWave, energonShootSparks);

const superBlast = extend(ShrapnelBulletType, {
	length: 30 * Vars.tilesize,
	damage: 120,
	width: 8,
	toColor: Color.sky,
	serrations: 4,
});

const energonEnergyField = extend(EnergyFieldAbility, 80, 230, 30 * Vars.tilesize, {
	status: statuses.shockStun,
	statusDuration: 15,
	addStats(t){
		t.add(Core.bundle.get("ability." + "energyfield" + ".description")).wrap().width(350);
		t.row();
        t.add(Core.bundle.format("bullet.range", Strings.autoFixed(30 * Vars.tilesize, 2)));
        t.row();
        t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / 320, 2) + StatUnit.perSecond.localized());
        t.row();
        t.add(Core.bundle.format("bullet.damage", 80));
        t.row();
        t.add(statuses.shockStun.emoji() + statuses.shockStun.localizedName);
    },
    localized(){
    	return Core.bundle.get("ability.energyfield");
    }
});

const abilities = new Seq();
var abilitiesFunction = new Stat("abilities", StatCat.function);
var energonAbilities = abilities.add(energonEnergyField);

const energon = extend(CoreBlock, "core-energon", {
	health: 14000,
	armor: 52,
	size: 6,
	itemCapacity: 4800,
	thrusterLength: 48 / 4,
	incinerateNonBuildable: true,
	buildCostMultiplier: 0.5,
	requiresCoreZone: true,
	squareSprite: false,
	unitCapModifier: 18,
	researchCostMultiplier: 0.1,
	hasPower: true,
    outputsPower: true,
    consumesPower: false,
	setStats() {
        this.super$setStats();
        this.stats.add(Stat.basePowerGeneration, 20 * 60, StatUnit.powerSecond);
        this.stats.add(abilitiesFunction, StatValues.abilities(energonAbilities));
        this.stats.add(Stat.inaccuracy, 360, StatUnit.degrees);
        this.stats.add(Stat.reload, 60 / (200) * 4, StatUnit.perSecond);
        this.stats.add(Stat.weapons, StatValues.ammo(ObjectMap.of(this, energonShell)));
        this.stats.addPercent(healingFunction, (5 / 100));
    },
	setBars() {
        this.super$setBars();
        this.addBar("poweroutput", entity => new Bar(
            () => Core.bundle.format("bar.poweroutput", 20 * 60),
            () => Pal.powerBar,
            () => 1
	    ));
	}
});
energon.buildType = () => extend(CoreBlock.CoreBuild, energon, {
	creload: 0,
	draw(){
		this.super$draw();
		Draw.z(Layer.bullet - 0.001);
        Draw.color(Color.sky);
    
        var orbRadius = 3 * (1 + Mathf.absin(20, 0.1));

        Fill.circle(this.x, this.y, orbRadius);
        Draw.color();
        Fill.circle(this.x, this.y, orbRadius / 2);

        Lines.stroke((0.7 + Mathf.absin(20, 0.7)), Color.sky);

        for(var i = 0; i < 4; i++){
            var rot = this.rotation + i * 360/4 - Time.time * 1;
            Lines.arc(this.x, this.y, orbRadius + 3, 0.14, rot);
        }
        Units.nearbyEnemies(this.team, this.x, this.y, 30 * Vars.tilesize, other => {
        	if(other.type.targetable){
        Lines.stroke(Lines.getStroke() * 1);
            for(var i = 0; i < 4; i++){
                var rot = this.rotation + i * 360/4 + Time.time * 1;
                Lines.arc(this.x, this.y, 30 * Vars.tilesize, 0.14, rot);
                var otherRot = other.rotation + i * 360/4 + Time.time * 1;
                Lines.arc(other.x, other.y, other.type.hitSize + 3, 0.14, otherRot);
            }
        Drawf.light(this.x, this.y, (30 * Vars.tilesize) * 1.5, Color.sky, 1 * 0.8);
        Draw.reset();
        }
        });
        Draw.reset();
        },
	updateTile(){
		this.super$updateTile();
	    this.creload++;
	Units.nearbyEnemies(this.team, this.x, this.y, 30 * Vars.tilesize, other => {
	if(other.type.targetable){
		if(this.creload == 200){
			energonShell.create(this, this.team, this.x + 12, this.y + 12.25, Mathf.random(0, 360));
			energonMulti.at(this.x + 12, this.y + 12.25, Mathf.random(0, 360));
			}
		if(this.creload == 240){
			energonShell.create(this, this.team, this.x - 12, this.y + 12.25, Mathf.random(0, 360));
			energonMulti.at(this.x - 12, this.y + 12.25, Mathf.random(0, 360));
			}
		if(this.creload == 280){
			energonShell.create(this, this.team, this.x + 12, this.y - 12.25, Mathf.random(0, 360));
			energonMulti.at(this.x + 12, this.y - 12.25, Mathf.random(0, 360));
			}
		if(this.creload == 320){
			energonShell.create(this, this.team, this.x - 12, this.y - 12.25, Mathf.random(0, 360));
			energonMulti.at(this.x - 12, this.y - 12.25, Mathf.random(0, 360));
			other.damage(energonShell.damage * 2 * Vars.state.rules.unitDamage(this.team));
			other.apply(statuses.shockStun, 15);
			Fx.chainLightning.at(this.x, this.y, 0, Color.sky, other);
            energonMulti.at(other.x, other.y, this.angleTo(other), Color.sky);
			}
		else if(this.creload >= 320){
           this.creload = 0;
           }
         }
	});
	},
	collision(bullet){
		this.super$collision(bullet);
		if(Mathf.chance(0.05)){
			superBlast.create(this, this.team, this.x, this.y, bullet.rotation() + 180);
			this.heal(this.maxHealth * 5 / 100);
            this.recentlyHealed();
            Fx.healBlockFull.at(this.x, this.y, this.block.size, Color.sky, this.block);
			Sounds.shotgun.at(this);
		}
		return true;
	},
	getPowerProduction(){
            return 20 * productionEfficiency;
        }
	});