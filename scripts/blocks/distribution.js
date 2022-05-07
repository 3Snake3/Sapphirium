const strongConveyor = extend(Conveyor, "strong-conveyor", {});

const strongRouter = extend(Router, "strong-router", {});

const strongJunction = extend(Junction, "strong-junction", {});

const creostoneConveyor = extend(Conveyor, "creostone-conveyor", {});

const globiumConveyor = extend(ArmoredConveyor, "globium-conveyor", {});

const globiumStackConveyor = extend(StackConveyor, "globium-stack-conveyor", {
	speed: 6 / 60
});

const creostoneBridgeConveyor = extend(BufferedItemBridge, "creostone-bridge-conveyor", {});

const massBullet = extend(MassDriverBolt, {
	draw(b){
		var w = 0.001;
		var h = 0.001;

        Draw.color(Pal.bulletYellowBack);
        Draw.rect("shell-back", b.x, b.y, w, h, b.rotation() + 90);

        Draw.color(Pal.bulletYellow);
        Draw.rect("shell", b.x, b.y, w, h, b.rotation() + 90);

        Draw.reset();
    },
    despawnEffect: Fx.none,
    hitEffect: Fx.none,
    collides: false,
});
const teleporter = extend(MassDriver, "teleporter", {
bullet: massBullet
});

const massDriver = extendContent(MassDriver, "compact-driver", {});
massDriver.bullet = extend(MassDriverBolt, {});

/*function newNode(parent, content, req, objectives){
	
    var parnode = TechTree.get(parent);
    var node = new TechTree.TechNode(parnode, content, req = null ? content.researchRequirements() : req);
    var used = new ObjectSet();
  
    node.objectives.addAll(objectives = null ? null : objectives);
}

newNode(Blocks.massDriver, teleporter, ItemStack.with(Items.titanium, 2000, Items.silicon, 4000, Items.plastanium, 1200), Seq.with(new Objectives.SectorComplete(SectorPresets.impact0078)));*/