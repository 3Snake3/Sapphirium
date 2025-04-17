const upgPump = extend(Pump, "upgraded-pump", {});
const strongConduit = extend(Conduit, "strong-conduit", {});
const creostoneBridgeConduit = extend(LiquidBridge, "creostone-bridge-conduit", {});
const creostoneLiquidJunction = extend(LiquidJunction, "creostone-liquid-junction", {});
const creostoneLiquidRouter = extend(LiquidRouter, "creostone-liquid-router", {});
const creostoneConduit = extend(Conduit, "creostone-conduit", {
init(){
	this.super$init();
	if(this.junctionReplacement == null) this.junctionReplacement = creostoneLiquidJunction;
    if(this.bridgeReplacement == null) this.bridgeReplacement = creostoneBridgeConduit;
    }
});
creostoneConduit.junctionReplacement = creostoneLiquidJunction;
creostoneConduit.bridgeReplacement = creostoneBridgeConduit;
creostoneConduit.rotBridgeReplacement = creostoneBridgeConduit;
const globiumConduit = extend(ArmoredConduit, "globium-conduit", {});
const armoredLiquidContainer = extend(LiquidRouter, "armored-liquid-container", {});
const armoredLiquidTank = extend(LiquidRouter, "armored-liquid-tank", {});