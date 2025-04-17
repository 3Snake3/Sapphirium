const sapphireSynthesizer = extend(HeatCrafter, "sapphire-synthesizer", {});
const neoplasmConverter = extend(GenericCrafter, "neoplasm-converter", {});
const creostoneCrucible = extend(GenericCrafter, "creostone-crucible", {});
var ExpWave = extend(WaveEffect, {
    sizeFrom: 24,
    sizeTo: 340,
    lifetime: 200,
    strokeFrom: 3,
    strokeTo: 14,
    colorFrom: Color.valueOf("F98F4A"),
    colorTo: Color.valueOf("9E172C00"),
});
var SecExpWave = extend(WaveEffect, {
    sides:8,
    sizeFrom: 44,
    sizeTo: 340,
    lifetime: 160,
    strokeFrom: 4,
    strokeTo: 12,
    colorFrom: Color.valueOf("F98F4A"),
    colorTo: Color.valueOf("9E172C00"),
});
var darkexpRomb = extend(ParticleEffect, {
    particles: 92,
    cone: 360,
    length: 400,
    lifetime: 520,
    sizeFrom: 23,
    sizeTo: 29,
    layer:100.1,
    colorFrom: Color.valueOf("9E172C"),
    colorTo: Color.valueOf("9E172C00"),
});
var midexpRomb = extend(ParticleEffect, {
    particles: 76,
    cone: 360,
    length: 350,
    lifetime: 460,
    sizeFrom: 18,
    sizeTo: 24,
    layer:100.2,
    colorFrom: Color.valueOf("E05438"),
    colorTo: Color.valueOf("9E172C00"),
});
var lightexpRomb = extend(ParticleEffect, {
    particles: 45,
    cone: 360,
    length: 240,
    lifetime: 400,
    sizeFrom: 13,
    sizeTo: 21,
    layer:100.3,
    colorFrom: Color.valueOf("F98F4A"),
    colorTo: Color.valueOf("9E172C00"),
});
const ExplodeBullet = extend(BasicBulletType, {
    width: 1,
    height: 1,
    lifetime: 1,
    speed:0,
    pierceCap: 2,
    pierce: true,
    damage: 99999,
    sprite: "sapphirium-none-bullet",
    splashDamage: 2000,
    buildingDamageMultiplier: 2,
    splashDamageRadius: 192,
    hitEffect: new MultiEffect(ExpWave,SecExpWave),
    despawnEffect: new MultiEffect(ExpWave,SecExpWave,darkexpRomb,midexpRomb,lightexpRomb),
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    backColor: Color.valueOf("ffe18f"),
    hitColor: Color.valueOf("ffe18f"),
    frontColor: Color.white,
});
const neoplasmFurnace = extend(HeatCrafter, "neoplasm-furnace", {
    squareSprite: false,
});
neoplasmFurnace.buildType = () => extend(HeatCrafter.HeatCrafterBuild, neoplasmFurnace, {
	updateTile() {
		this.super$updateTile();
		if(this.liquids.get(Liquids.neoplasm) >= 1680) {
            ExplodeBullet.create(this, Team.get(0), this.x, this.y, Mathf.range(0.0, 360.0));
            Sounds.largeExplosion.at(this);
        }
    },
    onDestroyed() {
        this.super$onDestroyed();
        if(this.efficiency > 0) {
            ExplodeBullet.create(this, Team.get(0), this.x, this.y, Mathf.range(0.0, 360.0));
            Sounds.largeExplosion.at(this);
        }
    },
});