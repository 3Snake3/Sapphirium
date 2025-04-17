const squareEffect = new Effect(100, e => {
    Draw.color(Color.valueOf("ab8ea4"));
    Fill.square(e.x, e.y, e.fslope() * 1.5 + 0.14, 45);
});
    
const sapphireWall = extend(RegenProjector, "sapphire-wall", {});
const sapphireWallLarge = extend(RegenProjector, "sapphire-wall-large", {});

const carvedWall = extend(Wall, "carved-wall", {
    setStats() {
        this.super$setStats();
        this.stats.addPercent(Stat.healing, (2 / 100));
    }
});
carvedWall.buildType = () => extend(Wall.WallBuild, carvedWall, {
	creload: 0,
	collision(bullet) {
        this.super$collision(bullet);
        if(this.creload == 1 && this.damaged()) {
            this.heal(this.maxHealth * 2 / 100);
            this.recentlyHealed();
            Fx.healBlockFull.at(this.x, this.y, this.block.size, Color.valueOf("ab8ea4"), this.block);
            squareEffect.at(this.x, this.y, this.block.size, Color.valueOf("ab8ea4"), this.block);
            this.creload = 0;
        } 
        else this.creload++;
        return true;
    }
});

const carvedWallLarge = extend(Wall, "carved-wall-large", {
    setStats() {
        this.super$setStats();
        this.stats.addPercent(Stat.healing, (4.5 / 100));
    }
});
carvedWallLarge.buildType = () => extend(Wall.WallBuild, carvedWallLarge, {
	creload: 0,
	collision(bullet) {
        this.super$collision(bullet);
        if(this.creload == 1 && this.damaged()) {
            this.heal(this.maxHealth * 4.5 / 100);
            this.recentlyHealed();
            Fx.healBlockFull.at(this.x, this.y, this.block.size, Color.valueOf("ab8ea4"), this.block);
            squareEffect.at(this.x, this.y, this.block.size, Color.valueOf("ab8ea4"), this.block);
            this.creload = 0;
        } 
        else this.creload++;
        return true;
    }
});

var blastDamage = new Stat("blast-damage");
var blast = extend(ShrapnelBulletType, {
	damage: 220,
	lifetime: 35,
	width: 12,
	length: 38,
	serrations: 5,
	serrationWidth: 5,
	serrationSpacing: 12,
	ammoMultiplier: 0,
	fromColor: Color.valueOf("ab8ea4"),
	toColor: Color.valueOf("58495c"),
	hitColor: Color.valueOf("ab8ea4"),
});

const carvedMonolith = extend(Wall, "carved-monolith", {
    setStats() {
        this.super$setStats();
        this.stats.add(blastDamage, 220);
        this.stats.addPercent(Stat.healing, (5 / 100));
    }
});
carvedMonolith.buildType = () => extend(Wall.WallBuild, carvedMonolith, {
	creload: 0,
	collision(bullet){
        this.super$collision(bullet);
        if(this.creload == 2 && this.damaged()) {
            this.heal(this.maxHealth * 5 / 100);
            this.recentlyHealed();
            Fx.healBlockFull.at(this.x, this.y, this.block.size, Color.valueOf("ab8ea4"), this.block);
            squareEffect.at(this.x, this.y, this.block.size, Color.valueOf("ab8ea4"), this.block);
            this.creload++;
        }
        if(this.creload == 4) {
            Sounds.shotgun.at(this);
            for(var i = 0; i < 6; i++) {
                blast.create(this, this.x, this.y, (330 / 6) * i + Mathf.random(30));
            }
            this.creload++;
        }
        else if(this.creload >= 5) {
            this.creload = 0;
        } 
        else this.creload++;
        return true;
    }
});

module.exports = {
	sapphireWallLarge: sapphireWallLarge
	}