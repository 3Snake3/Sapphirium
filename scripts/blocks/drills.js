const smallDrill = extend(Drill, "smalldrill", {
	setStats(){
		this.super$setStats();
		this.stats.remove(Stat.boostEffect);
	},
	setBars(){
		this.super$setBars();
		this.bars.remove("liquid");
		}
});

const oilPump = extend(SolidPump, "oil-pump", {});

const slagExtractor = extend(Fracker, "slag-extractor", {});

const sandMine = extend(GenericCrafter, "sand-mine", {});

const sporeExtractor = extend(AttributeCrafter, "spore-extractor", {});

const tm = extend(AttributeCrafter, "thorium-mine", {
	load(){
this.super$load();
this.region = Core.atlas.find(this.name);
this.liquidRegion = Core.atlas.find(this.name + "-liquid");
this.bottomGlow = Core.atlas.find(this.name + "-bottom-glow");
this.rotatorRegion = Core.atlas.find(this.name + "-rotator");
this.rotatorRegion2 = Core.atlas.find(this.name + "-rotator2");
this.topRegion = Core.atlas.find(this.name + "-top");
},
icons(){
    return [
      this.region,
      this.rotatorRegion,
      this.rotatorRegion2,
      this.topRegion
      ]
  }
});

tm.buildType = () => extendContent(AttributeCrafter.AttributeCrafterBuild, tm, {
draw(){
      var rotateSpeed = 5;
      var rotateSpeed2 = 7;
      var glowAmount = 0.9;
      var glowScale = 3;
      Draw.rect(tm.region, this.x, this.y);
      Drawf.liquid(tm.liquidRegion, this.x, this.y, this.liquids.total() / tm.liquidCapacity, this.liquids.current().color);
      Draw.alpha(Mathf.absin(this.totalProgress, glowScale, glowAmount) * this.warmup);
      Draw.rect(tm.bottomGlow, this.x, this.y);
      Draw.reset();
      if(this.block.drawSpinSprite){
      Drawf.spinSprite(tm.rotatorRegion, this.x, this.y, this.totalProgress * rotateSpeed);
      Drawf.spinSprite(tm.rotatorRegion2, this.x, this.y, -this.totalProgress * rotateSpeed2);
      }else{
      Draw.rect(tm.rotatorRegion, this.x, this.y, this.totalProgress * rotateSpeed);
      Draw.rect(tm.rotatorRegion2, this.x, this.y, -this.totalProgress * rotateSpeed2);
      }
      Draw.rect(tm.topRegion, this.x, this.y);
    }
  });

const granateDrill = extend(GenericCrafter, "granate-drill", {});

const lightningDrill = extend(Drill, "lightning-drill", {});

const laserCrushingPlant = extend(Drill, "laser-crushing-plant", {});
