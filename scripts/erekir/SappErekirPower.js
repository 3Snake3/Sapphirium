const statuses = require("SappItems");
const liquids = require("SappLiquids");
const sappItemsStats = require("SappItemsStats");
const sappLiquidsStats = require("SappLiquidsStats");
const environment = require("SappEnvironment");

const creostoneBeamNode = extend(BeamNode, "creostone-beam-node", {
    squareSprite: false,
});
const creostoneBeamTower = extend(BeamNode, "creostone-beam-tower", {
    squareSprite: false,
});
const riftBorehole = extend(ThermalGenerator, "rift-borehole", {
attribute: environment.argonAttr,
powerProduction: 4 / 9,
displayEfficiencyScale: 1 / 9,
outputLiquid: new LiquidStack(liquids.argon, 6 / 60 / 9)
});

var minEfficiency = 8.999;
var displayEfficiencyScale = 0.111111111;
var displayEfficiency = false;
var attribute = Attribute.steam;
var sum = 1;
const creotineCombustionChamber = extend(ConsumeGenerator, "creotine-combustion-chamber", {
	canPlaceOn(tile, team, rotation){
        //make sure there's such a tiles at this location
        return tile.getLinkedTilesAs(this, this.tempTiles).sumf(other => other.floor().attributes.get(attribute)) > minEfficiency;
    },
    floating: true,
    setStats(){
    	this.super$setStats();
    this.stats.add(Stat.tiles, attribute, this.floating, this.size * this.size * displayEfficiencyScale, !displayEfficiency);
    }
});

//attribute and consume combined power generation
/*creotineCombustionChamber.buildType = () => extend(ConsumeGenerator.ConsumeGeneratorBuild, creotineCombustionChamber, {
	updateTile(){
		this.super$updateTile();
		this.productionEfficiency = this.efficiency * this.efficiencyMultiplier + sum + attribute.env();
	},
	onProximityAdded(){
            this.super$onProximityAdded();
            sum = this.block.sumAttribute(attribute, this.tile.x, this.tile.y);
        }
});*/

const rubyCleaver = extend(ConsumeGenerator, "ruby-cleaver", {});

const mineralizer = extend(ImpactReactor, "mineralizer", {});
mineralizer.buildType = () => extend(ImpactReactor.ImpactReactorBuild, mineralizer, {
	updateTile(){
		this.super$updateTile();
		if(Mathf.chance(0.01 * this.efficiency)){
			Lightning.create(Team.get(99), Color.valueOf("c093fa"), 30, this.x, this.y, Mathf.random(0.0, 360.0), 4);
			}
		},
		onDestroyed(){
			this.super$onDestroyed();
			if(this.efficiency > 0 && Vars.state.rules.reactorExplosions){
				Damage.status(Team.get(99), this.x, this.y, 120, StatusEffects.burning, 120, true, true);
				Damage.status(Team.get(99), this.x, this.y, 120, StatusEffects.sapped, 120, true, true);
			    Damage.damage(Team.get(99), this.x, this.y, 120, 5700, true, true);
			    mineralizer.explosionEffect.at(this);
			    Sounds.explosionBig.at(this);
			    Effect.shake(4, 30, this.x, this.y);
			}
			}
	});

const ElectricColor = Color.valueOf("A480FF09");
const ElectricColorMulled = Color.valueOf("A480FF18");
const Distance = Core.camera.width + Core.camera.height + 50 * Vars.tilesize;

const ElectricExplosionPart1 = new Effect(20, Distance, e => {
    Draw.color(Color.white, ElectricColor, e.fin());
    Lines.stroke(e.fout() * 10.0 + 0.5);
    Lines.circle(e.x, e.y, e.fin() * 250.0);
});

const ElectricExplosionPart2 = new Effect(120, Distance, e => {
    Draw.color(ElectricColor, ElectricColorMulled, e.fslope());
    Draw.alpha(e.fout() / 120.0);
    Draw.rect("collos-flash", e.x, e.y, 150.0 + 400.0 * e.fin(), 150.0 + 400.0 * e.fin());
    Draw.color();
});

const ElectricExplosionPart3 = new Effect(120, Distance, e => {
    Draw.color(ElectricColor, ElectricColorMulled, e.fslope());
    Draw.alpha(e.fout() / 120);
    Draw.rect("collos-FlareWhite", e.x, e.y, 350 + 400 * e.fin(), 350 + 400 * e.fin());
    Draw.color();
});

const LightCloud1 = new Effect(1800, 100, e => {
    if(e.time> 300){
        if(Mathf.chance(0.2) && Vars.state.paused == 0){
            var randx = Mathf.range(15);
            var randy = Mathf.range(15);
            Lines.circle(e.x + randx * Vars.tilesize, e.y + randy * Vars.tilesize, e.fin() * 4);
            Sounds.spark.at(e.x + randx * Vars.tilesize,e.y + randy * Vars.tilesize);
            Lightning.create(Team.get(99), Color.valueOf("#2E0C37"), 160, e.x + randx * Vars.tilesize, e.y + randy * Vars.tilesize, Mathf.random(0.0, 360.0), 8 + Mathf.random(-4,6));
        }
    };
});

const LightCloud2 = new Effect(2200, 100, e => {
    if(e.time> 800){
        if(Mathf.chance(0.1) && Vars.state.paused == 0){
            var randx = Mathf.range(25);
            var randy = Mathf.range(25);
            Lines.circle(e.x + randx * Vars.tilesize, e.y + randy * Vars.tilesize, e.fin() * 3);
            Sounds.spark.at(e.x + randx * Vars.tilesize,e.y + randy * Vars.tilesize);
            Lightning.create(Team.get(99), Color.valueOf("#2E0C37"), 180, e.x + randx * Vars.tilesize, e.y + randy * Vars.tilesize, Mathf.random(0.0, 360.0), 8 + Mathf.random(-3,7));
        }
    };
});

const LightCloud3 = new Effect(500, 100, e => {
if(e.time < 300){
    if(Mathf.chance(0.3) && Vars.state.paused == 0){
        var randx = Mathf.range(6);
        var randy = Mathf.range(6);
        Lines.circle(e.x + randx * Vars.tilesize, e.y + randy * Vars.tilesize, e.fin() * 4);
        Sounds.spark.at(e.x + randx * Vars.tilesize,e.y + randy * Vars.tilesize);
        Lightning.create(Team.get(99), Color.valueOf("#2E0C37"), 250, e.x + randx * Vars.tilesize, e.y + randy * Vars.tilesize, Mathf.random(0.0, 360.0), 8 + Mathf.random(-4,6));
    }
};
});

const LightCloud4 = new Effect(2700, 100, e => {
    if(e.time < 2200){
        if(Mathf.chance(0.02) && Vars.state.paused == 0){
            var randx = Mathf.range(35);
            var randy = Mathf.range(35);
            Lines.circle(e.x + randx * Vars.tilesize, e.y + randy * Vars.tilesize, e.fin() * 4);
            Sounds.spark.at(e.x + randx * Vars.tilesize,e.y + randy * Vars.tilesize);
            Lightning.create(Team.get(99), Color.valueOf("#2E0C37"), 100, e.x + randx * Vars.tilesize, e.y + randy * Vars.tilesize, Mathf.random(0.0, 360.0), 8 + Mathf.random(-4,6));
        }
    };
});
var ExpWave = extend(WaveEffect, {
    sides:5,
    sizeFrom: 58,
    sizeTo: 460,
    lifetime: 900,
    strokeFrom: 4,
    strokeTo: 33,
    colorFrom: Color.valueOf("938EE2C0"),
    colorTo: Color.valueOf("2E0C3700"),
});
var SecExpWave = extend(WaveEffect, {
    sides:8,
    sizeFrom: 44,
    sizeTo: 540,
    lifetime: 1260,
    strokeFrom: 4,
    strokeTo: 44,
    colorFrom: Color.valueOf("938EE2C0"),
    colorTo: Color.valueOf("2E0C3700"),
});
var darkexpSmoke = extend(ParticleEffect, {
    particles: 142,
    cone: 360,
    length: 480 * 3,
    lifetime: 4000,
    sizeFrom: 23,
    sizeTo: 29,
    layer:100.1,
    colorFrom: Color.valueOf("5D2B54"),
    colorTo: Color.valueOf("2E0C3700"),
});
var midexpSmoke = extend(ParticleEffect, {
    particles: 106,
    cone: 360,
    length: 390 * 3,
    lifetime: 4000,
    sizeFrom: 18,
    sizeTo: 24,
    layer:100.2,
    colorFrom: Color.valueOf("894E82"),
    colorTo: Color.valueOf("2E0C3700"),
});
var midsecexpSmoke = extend(ParticleEffect, {
    particles: 206,
    cone: 360,
    length: 390 * 3,
    lifetime: 3600,
    sizeFrom: 9,
    sizeTo: 16,
    layer:100.2,
    colorFrom: Color.valueOf("894E82"),
    colorTo: Color.valueOf("2E0C3700"),
});
var lightexpSmoke = extend(ParticleEffect, {
    particles: 65,
    cone: 360,
    length: 280 * 3,
    lifetime: 4000,
    sizeFrom: 13,
    sizeTo: 21,
    layer:100.3,
    colorFrom: Color.valueOf("938EE2C0"),
    colorTo: Color.valueOf("2E0C3700"),
});

const ConsumeLiquidTemperature = extend(ConsumeLiquidFilter, {
	    amount: 0.2,
        efficiencyMultiplier(build){
        var liq = this.getConsumed(build);
        return liq == null ? 0 : liq.temperature;
    },
    display(stats){}
});
ConsumeLiquidTemperature.filter = liquid => liquid.temperature >= 0;

const ConsumeItemCost = extend(ConsumeItemFilter, {
	    amount: 0.2,
        efficiencyMultiplier(build){
        var item = this.getConsumed(build);
        return item == null ? 0 : item.cost;
    },
    display(stats){}
});
ConsumeItemCost.filter = item => item.cost >= 0;

var powerProduction = 1;
var productionEfficiency = 1.0;
var efficiencyPowerProduction = 0.0;
var drawBottom = new DrawRegion("-bottom");
var drawLiquid = new DrawLiquidTile(Liquids.water, 3);
var drawLiquid2 = new DrawLiquidTile(Liquids.arkycite, 3);
var drawLiquid3 = new DrawLiquidTile(Liquids.neoplasm, 3);
var drawLiquid4 = new DrawLiquidTile(Liquids.slag, 3);
var drawDefault = new DrawDefault();
var drawGlow = new DrawGlowRegion();
var drawLights = new DrawHeatRegion("-lights");
const matterCollapser = extend(ConsumeGenerator, "matter-collapser", {
    outputsPower: true,
    itemCapacity: 25,
    liquidCapacity: 75,
    hasItems: true,
    hasLiquids: true,
    hasPower: true,
    size: 6,
    category: Category.power,
    itemDuration: 60,
    requirements: ItemStack.with(Items.silicon, 950, Items.carbide, 670, Items.surgeAlloy, 450, Items.graphite, 1275),
    buildVisibility: BuildVisibility.shown,
    squareSprite: false,
    setStats() {
    	this.super$setStats();
        this.stats.remove(this.generationType);
        this.stats.add(Stat.basePowerGeneration, powerProduction, StatUnit.powerSecond);
        
        for (let i = 0; i < sappItemsStats.itemStats.length; i += 2) {
            this.stats.add(sappItemsStats.itemStats[i+1], StatValues.content(sappItemsStats.itemStats[i]));
        }
        
        for (let i = 0; i < sappLiquidsStats.liquidStats.length; i += 2) {
            this.stats.add(sappLiquidsStats.liquidStats[i+1], StatValues.content(sappLiquidsStats.liquidStats[i]));
        }
    },

    setBars() {
        this.super$setBars();

        this.addBar("efficiency", entity => new Bar(
            () => Core.bundle.format("bar.efficiency", efficiencyPowerProduction),
            () => Pal.powerBar,
            () => efficiencyPowerProduction / 100
	    ));
    }
});

matterCollapser.drawer = new DrawMulti(drawBottom, drawLiquid, drawLiquid2, drawLiquid3, drawLiquid4, drawDefault, drawGlow, drawLights);
matterCollapser.consume(ConsumeItemCost);
matterCollapser.consume(ConsumeLiquidTemperature);

matterCollapser.buildType = () => extend(ConsumeGenerator.ConsumeGeneratorBuild, matterCollapser, {
    init(tile, team, shouldAdd, rotation) {
        if (!this.initialized) this.create(tile.block(), this.team);

        this.rotation = rotation;
        this.tile = tile;
        this.set(tile.drawx(), tile.drawy());
        if (shouldAdd) this.add();
        this.created();
        this.workst = 0;

        this.setItem(null);
        this.setLiquid(null);
        this.setWork(false);
        this.setEfficiency(1);

        return this;
    },

    updateTile() {
    	this.super$updateTile();

        let item = this.getItem();
        let liquid = this.getLiquid();
        let workst = this.getWorkState();

        if (this.items.total() == 0) this.setItem(null);
        if (this.liquids.currentAmount() == 0) this.setLiquid(null);
        if (this.items.total() == 0 && this.liquids.currentAmount() == 0 && this.getWorkState>0) this.setWork(false);

        if (item != null && liquid != null && this.getWork() != false) {
            
            var num = this.efficiency * this.efficiencyMultiplier * liquid.temperature;
            var damage = 40 + 0.03 * num * ((item.cost < 1) ? 1 : item.cost) * Mathf.random(1,1.5) * this.workst;
            var time = 70 / ((item.cost < 1.2) ? 1.2 * 2.2 : item.cost * 2);
            var lmax = (0.7 + Mathf.random(0.0, (item.cost < 1) ? 1 : item.cost)) * this.workst;
            var lrange = Mathf.random(1,4.5) * this.workst;

            if (this.timer.get(time)) {
                Sounds.spark.at(this);
                Lightning.create(Team.get(99), Color.valueOf("#A480FF"), damage, this.x + Mathf.range(2.7) * Vars.tilesize, this.y + Mathf.range(2.7) * Vars.tilesize, Mathf.random(0.0, 360.0), 5 + 4 * lmax);
                Lightning.create(Team.get(99), Color.valueOf("#A480FF"), damage, this.x + Mathf.range(2.5) * Vars.tilesize, this.y + Mathf.range(2.5) * Vars.tilesize, Mathf.random(0.0, 360.0), 4 + 6 * lmax);
                var xrandtim = Mathf.round(Mathf.random(2,6) * this.workst)
                for (var x = 0; x < xrandtim; x++) {
                    Lightning.create(Team.get(99), Color.valueOf("#A480FF"), damage/xrandtim, this.x + Mathf.random(-4.0 - lrange,4.0 + lrange) * Vars.tilesize, this.y + Mathf.random(-4.0 - lrange,4.0 + lrange) * Vars.tilesize, Mathf.random(0.0, 360.0), 4 + (4 * lmax / xrandtim * Mathf.random(1,3)));
                }
            }
        }
    },

    onDestroyed() {
        this.super$onDestroyed();
        if (!this.getWork()) return;
        if(this.efficiency > 0) {
            ElectricExplosionPart1.at(this.x, this.y);
            ElectricExplosionPart2.at(this.x, this.y);
            ElectricExplosionPart3.at(this.x, this.y);
            var Edamage = (100 + Mathf.pow(3, Mathf.round(this.getEfficiency()))) * Mathf.random(0.7,1.7);
            var Elmax = 0.4 + Mathf.random(0.0,2.6);
            for (var x = 0; x < 42; x++) {
                Lightning.create(Team.get(99), Color.valueOf("#A480FF"), Edamage*2 , this.x + Mathf.range(2.5) * Vars.tilesize, this.y + Mathf.range(2.5) * Vars.tilesize, Mathf.random(0.0, 360.0), 35.0 + Mathf.range(15.0) * Elmax);
            };
            Damage.damage(this.x, this.y, 17 * Vars.tilesize, 2500+Edamage*3);
            Sounds.explosionbig.at(this);
            LightCloud1.at(this);
            LightCloud2.at(this);
            LightCloud3.at(this);
            ExpWave.at(this);
            SecExpWave.at(this);
            darkexpSmoke.at(this);
            midexpSmoke.at(this);
            midsecexpSmoke.at(this);
            lightexpSmoke.at(this);
            Sounds.largeExplosion.at(this);
            for (var x = 0; x < 40; x++) {
                var v = new Vec2();
                v.trns(Mathf.random(360.0), Mathf.random(100.0));
                var tile = Vars.world.tileWorld(this.x + v.x, this.y + v.y)
                Puddles.deposit(tile, Vars.world.tileWorld(this.x, this.y), this.getLiquid(), this.getEfficiency() * 10);
            }
        }
    },

    getPowerProduction() {
        let item = this.getItem();
        let liquid = this.getLiquid();
        let workst = this.getWorkState();
        if (Vars.state.paused == 0){
            if (item != null && liquid != null) {
                this.workst = (this.workst >= 1) ? 1 : this.workst + (0.0001 * item.cost);
                this.setWork(true);
                if (item.cost >= 2) {
                    efficiencyPowerProduction = 180.0;
                } 
                else if (item.cost >= 1.5) {
                    efficiencyPowerProduction = 140.0;
                } 
                else if (item.cost >= 1) {
                    efficiencyPowerProduction = 90.0;
                } 
                else if (item.cost < 1) {
                    efficiencyPowerProduction = 120.0;
                }
                return item.cost * efficiencyPowerProduction *  liquid.temperature * powerProduction * productionEfficiency * this.workst;
            } else {
                this.setWork(0);
                this.workst = (this.workst <= 0) ? 0 : this.workst - 0.002;
                efficiencyPowerProduction = 0.0;
                return 0;
            }
        }
    },


    acceptItem(source, item) {
        if (this == null || this.items == null) return false;
        if (this.items.get(item) >= this.getMaximumAccepted(item)) return false;
        if (this.items.total() >= this.getMaximumAccepted(item)) return false;
        if (item.cost == null) return false;

        if (item.cost >= 0.1) {
            if (this.timer.get(this.block.itemDuration)) {
                this.items.remove(item, Mathf.round(Mathf.clamp(0, 1, this.items.total())));
            }
            this.setItem(item);
            return true;
        }
    },

    acceptLiquid(source, liquid) {
        if (this == null || this.liquids == null) return false;
        if (this.liquids.get(liquid) >= this.liquidCapacity) return false;
        if (this.liquids.currentAmount() >= this.liquidCapacity) return false;

        if (liquid.temperature != null && liquid.heatCapacity != null && !liquid.gas) {
            if (liquid.temperature >= 0.0 && liquid.heatCapacity <= 0.5) {
                if (this.getLiquid() != null && this.getLiquid() != liquid) {
                    this.liquids.remove(this.getLiquid(), this.liquids.currentAmount());
                };
                this.setLiquid(liquid);
                return true;
            }
        } else {
            return false;
        }
    },

    writeBase(write) {
        this.super$writeBase(write);

        write.i(this._item != null ? this._item.id : -1);
        write.i(this._efficiency);
        write.i(this._liquid != null ? this._liquid.id : -1);
    },

    readBase(read) {
        this.super$readBase(read);

        var itemid = read.i()
        this._item = itemid != -1 ? Vars.content.getByID(ContentType.item, itemid) : null;
        this._efficiency = read.i();

        var liquidid = read.i()
        this._liquid = liquidid != -1 ? Vars.content.getByID(ContentType.liquid, liquidid) : null;
        
    },

    getItem() {
        return this._item;
    },

    setItem(a) {
        this._item = a;
    },

    getLiquid() {
        return this._liquid;
    },

    setLiquid(a) {
        this._liquid = a;
    },

    getWork() {
        return this._work;
    },

    setWork(a) {
        this._work = a;
    },

    getEfficiency() {
        return this._efficiency;
    },

    getWorkState() {
        return this._workst;
    },

    setEfficiency(a) {
        this._efficiency = a;
    }
});

    
