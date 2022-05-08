const smallDrill = extend(Drill, "smalldrill", {
	setStats(){
		this.super$setStats();
		this.stats.remove(Stat.boostEffect);
	},
	setBars(){
		this.super$setBars();
		this.bars.remove("liquid");
		},
	liquidCapacity: 0
});

const oilPump = extend(SolidPump, "oil-pump", {});

const slagExtractor = extend(Fracker, "slag-extractor", {});

const sandMine = extend(GenericCrafter, "sand-mine", {});

const coalMine = extend(GenericCrafter, "coal-mine", {});

const sporeExtractor = extend(AttributeCrafter, "spore-extractor", {});

const titaniumExtractor = extend(GenericCrafter, "titanium-extractor", {
	load(){
this.super$load();
this.region = Core.atlas.find(this.name + "-bottom");
this.liquidRegion = Core.atlas.find(this.name + "-liquid");
this.glowRegion = Core.atlas.find(this.name + "-glow");
this.topRegion = Core.atlas.find(this.name + "-top");
},
icons(){
    return [
      this.region,
      this.topRegion
      ]
  }
});

titaniumExtractor.buildType = () => extendContent(GenericCrafter.GenericCrafterBuild, titaniumExtractor, {
draw(){
      var glowwAmount = 0.9;
      var glowwScale = 3;
      Draw.rect(titaniumExtractor.region, this.x, this.y);
      Drawf.liquid(titaniumExtractor.liquidRegion, this.x, this.y, this.liquids.total() / titaniumExtractor.liquidCapacity, this.liquids.current().color);
      Draw.alpha(Mathf.absin(this.totalProgress, glowwScale, glowwAmount) * this.warmup);
      Draw.rect(titaniumExtractor.glowRegion, this.x, this.y);
      Draw.reset();
      Draw.rect(titaniumExtractor.topRegion, this.x, this.y);
    }
  });
  
const emeraldDrill = extend(GenericCrafter, "emerald-drill", {});

const tm = extend(AttributeCrafter, "thorium-mine", {
	load(){
this.super$load();
this.region = Core.atlas.find(this.name);
this.liquidRegion = Core.atlas.find(this.name + "-liquid");
this.bottomGlow = Core.atlas.find(this.name + "-bottom-glow");
this.rotatorRegion = Core.atlas.find(this.name + "-rotator");
this.topRegion = Core.atlas.find(this.name + "-top");
},
icons(){
    return [
      this.region,
      this.rotatorRegion,
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
      Drawf.spinSprite(tm.rotatorRegion, this.x, this.y, this.totalProgress * rotateSpeed);
      Draw.rect(tm.topRegion, this.x, this.y);
    }
  });

const granateDrill = extend(GenericCrafter, "granate-drill", {});

const lightCrystallizer = extend(AttributeCrafter, "light-crystallizer", {
    attribute: Attribute.water,
    maxBoost: 3
});

const creostoneDrill = extend(Drill, "creostone-drill", {});

const lightningDrill = extend(Drill, "lightning-drill", {});

const lightDrillingRig = extend(Drill, "light-drilling-rig", {});