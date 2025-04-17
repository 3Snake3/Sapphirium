const strongRouter = extend(Router, "strong-router", {});
const strongJunction = extend(Junction, "strong-junction", {});
const strongConveyor = extend(Conveyor, "strong-conveyor", {
init(){
	this.super$init();
	if(this.junctionReplacement == null) this.junctionReplacement = strongJunction;
    }
});
strongConveyor.junctionReplacement = strongJunction;

const creostoneRouter = extend(Router, "creostone-router", {});
const creostoneJunction = extend(Junction, "creostone-junction", {});
const creostoneBridgeConveyor = extend(BufferedItemBridge, "creostone-bridge-conveyor", {});
const creostoneConveyor = extend(Conveyor, "creostone-conveyor", {
init(){
	this.super$init();
	if(this.junctionReplacement == null) this.junctionReplacement = creostoneJunction;
    if(this.bridgeReplacement == null) this.bridgeReplacement = creostoneBridgeConveyor;
    }
});
creostoneConveyor.junctionReplacement = creostoneJunction;
creostoneConveyor.bridgeReplacement = creostoneBridgeConveyor;
creostoneConveyor.rotBridgeReplacement = creostoneBridgeConveyor;

const globiumConveyor = extend(ArmoredConveyor, "globium-conveyor", {});
const globiumStackConveyor = extend(StackConveyor, "globium-stack-conveyor", {
	speed: 6 / 60
});

const massBullet = extend(MassDriverBolt, {
	draw(b) {
		var w = 0.001;
		var h = 0.001;

        Draw.color(Pal.bulletYellowBack);
        Draw.rect("sapphirium-none-bullet-back", b.x, b.y, w, h, b.rotation() + 90);

        Draw.color(Pal.bulletYellow);
        Draw.rect("sapphirium-none-bullet", b.x, b.y, w, h, b.rotation() + 90);

        Draw.reset();
    },
    despawnEffect: Fx.none,
    hitEffect: Fx.none,
    collides: false,
});

const compactMassDriver = extend(MassDriver, "compact-driver", {});
compactMassDriver.bullet = extend(MassDriverBolt, {});
const teleporter = extend(MassDriver, "teleporter", {
    bullet: massBullet,
    envDisabled: Env.scorching
});