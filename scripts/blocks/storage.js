const powerProduction = 9;
const generationType = Stat.basePowerGeneration;

const coreCage = extend(CoreBlock, "core-cage", {
	
    hasPower: true,
    outputsPower: true,
    consumesPower: false,
	
    setStats(){
        this.super$setStats();
        this.stats.add(generationType, powerProduction * 60, StatUnit.powerSecond);
    },
	
    setBars(){
        this.super$setBars();
        this.bars.add("poweroutput", entity => new Bar(
	    () => Core.bundle.format("bar.poweroutput", powerProduction * 60), 
	    () => Pal.powerBar, 
	    () => 1
	));
    },

    baseExplosiveness: 10,
    thrusterLength: 46/4,
});

const productionEfficiency = 1.0;
coreCage.buildType = () => extendContent(CoreBlock.CoreBuild, coreCage, {
        getPowerProduction(){
            return powerProduction * productionEfficiency;
        }
    });

const creostoneStorage = extend(StorageBlock, "creostone-storage", {});
    
const scarlet = extend(CoreBlock, "scarlet-gem", {
	health: 3400,
	size: 4,
	itemCapacity: 2000,
	unitCapModifier: 2,
	thrusterLength: 34/4,
	researchCostMultiplier: 0.05,
	canPlaceOn(tile, team, rotation){
        return true;
    },
    canBreak(tile){
    	return true;
    },
    setStats(){
this.super$setStats();
if(this.canBeBuilt() && this.requirements.length > 0){
this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
        }
     }
 });
 
 var LC = 0.08;
var LD = 80;
var LL = 25;
var LCO = Pal.lancerLaser;
var LS = Sounds.spark;
 const indigo = extend(CoreBlock, "indigo", {
	health: 5000,
	size: 4,
	itemCapacity: 3000,
	unitCapModifier: 3,
	thrusterLength: 34/4,
	researchCostMultiplier: 0.07,
	canPlaceOn(tile, team, rotation){
        return true;
    },
    canReplace(other){
    if(other instanceof CoreBlock) return false;
    return this.super$canReplace(other);
},
    canBreak(tile){
    	return true;
    },
    setStats(){
this.super$setStats();
if(this.canBeBuilt() && this.requirements.length > 0){
this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
        }
if(LC > 0){
            this.stats.add(Stat.lightningChance, LC * 100, StatUnit.percent);
            this.stats.add(Stat.lightningDamage, LD, StatUnit.none);
        }
    }
 });
indigo.buildType = () => extendContent(CoreBlock.CoreBuild, indigo, {
	collision(bullet){
            this.super$collision(bullet);
            var hitl = 1;
            //create lightning if necessary
            if(LC > 0){
                if(Mathf.chance(LC)){
                    Lightning.create(this.team, LCO, LD, this.x, this.y, bullet.rotation() + 180, LL);
                    LS.at(this.tile, Mathf.random(0.9, 1.1));
                }
            }
      return true;
}
});

const victory = extend(CoreBlock, "core-victory", {});

const triumph = extend(CoreBlock, "core-triumph", {});