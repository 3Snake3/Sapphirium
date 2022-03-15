const creostoneConduit = extend(Conduit, "creostone-conduit", {});

const globiumConduit = extend(ArmoredConduit, "globium-conduit", {});

const creostoneBridgeConduit = extend(LiquidExtendingBridge, "creostone-bridge-conduit", {
/*load(){
this.super$load();
this.region = Core.atlas.find(this.name);
this.liquidRegion = Core.atlas.find(this.name + "-liquid");
this.endRegion = Core.atlas.find(this.name + "-end");
this.bridgeRegion = Core.atlas.find(this.name + "-bridge");
this.arrowRegion = Core.atlas.find(this.name + "-arrow");
},
icons(){
    return [
      this.region,
      ]
  }*/
});
/*creostoneBridgeConduit.buildType = () => extendContent(LiquidExtendingBridge.LiquidExtendingBridgeBuild, creostoneBridgeConduit, {
	draw(){
		Draw.rect(creostoneBridgeConduit.region, this.x, this.y);
      Drawf.liquid(creostoneBridgeConduit.liquidRegion, this.x, this.y, this.liquids.total() / creostoneBridgeConduit.liquidCapacity, this.liquids.current().color);
},
drawRequestConfigTop(req, list){
        this.otherReq = null;
        list.each(other -> {
            if(other.block == this && req != other && req.config instanceof this.p && p.equals(other.x - req.x, other.y - req.y)){
                otherReq = other;
            }
        });

        if(otherReq != null){
            drawBridge(req, otherReq.drawx(), otherReq.drawy(), 0);
        }
    },
drawBridge(req, ox, oy, flip){
        if(Mathf.zero(Renderer.bridgeOpacity)) return;
        Draw.alpha(Renderer.bridgeOpacity);

        Lines.stroke(8);

        Tmp.v1.set(ox, oy).sub(req.drawx(), req.drawy()).setLength(Vars.tilesize/2);

        Lines.line(
        this.bridgeRegion,
        req.drawx() + Tmp.v1.x,
        req.drawy() + Tmp.v1.y,
        ox - Tmp.v1.x,
        oy - Tmp.v1.y, false
        );

        Draw.rect(this.arrowRegion, (req.drawx() + ox) / 2, (req.drawy() + oy) / 2,
        Angles.angle(req.drawx(), req.drawy(), ox, oy) + flip);

        Draw.reset();
    }
});*/


const upgPump = extend(Pump, "upgraded-pump", {});