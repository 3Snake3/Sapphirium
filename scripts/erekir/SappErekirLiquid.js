const topazLiquidJunction = extend(LiquidJunction, "topaz-liquid-junction", {});
const topazLiquidRouter = extend(LiquidRouter, "topaz-liquid-router", {});
const topazBridgeConduit = extend(LiquidBridge, "topaz-bridge-conduit", {
liquidCapacity: 35,
});
const topazConduit = extend(Conduit, "topaz-conduit", {
init(){
	this.super$init();
	if(this.junctionReplacement == null) this.junctionReplacement = topazLiquidJunction;
    if(this.bridgeReplacement == null) this.bridgeReplacement = topazBridgeConduit;
    }
});
topazConduit.junctionReplacement = topazLiquidJunction;
topazConduit.bridgeReplacement = topazBridgeConduit;
topazConduit.rotBridgeReplacement = topazBridgeConduit;