const liquidUnloader = extendContent(LiquidBlock, 'liquid-unloader', {
	
	//keys
	
	localizedName : "Liquid Unloader",
	description: "Хуй",
	
	buildVisibility: BuildVisibility.shown,
	
	health: 60,
        speed: 1,
	liquidCapacity: 50,
		
	update: true,
	unloadable: false,
	noUpdateDisabled: true,
	configurable: true,
        saveConfig: true,
	solid: true,
	
	envEnabled: Env.any,


        //functs

        setStats(){
                this.super$setStats();
                this.stats.add(Stat.speed, 60 / this.speed, StatUnit.liquidSecond);
        },

        /*drawRequestConfig(req, list){
                this.drawRequestConfigCenter(req, req.config, "liquid-unloader-center");
        }*/

        setBars(){
                this.super$setBars();
                bars.remove("liquids");
        },
		
	init(){
		this.super$init();
		
		this.config( Liquid.class, (tile, liquid) => tile.sortLiquid = liquid );
		this.configClear( (tile) => tile.sortLiquid = null );
	}
});

liquidUnloader.buildType = () => extend(LiquidBlock.LiquidBlockBuild, this, {
	unloadTimer = 0;
	rotations = 0;
	offset = 0;
			
	sortLiquid = null;
	possibleBlocks = new Seq();
			
	lastUsed = []
			
			
        updateTile(){
		//what is delta() ? && what is proximity ?
                if( ((this.unloadTimer += this.delta()) < this.block.speed) || (this.proximity.size < 2) ) return;
                let liquid = null;
                let any = false;
                let liquidslength = Vars.content.liquids().size;

                //initialize possibleBlocks only if the new size is bigger than the previous, to avoid unnecessary allocations
                if(this.possibleBlocks.size != this.proximity.size){
                        let tmp = this.possibleBlocks.size;
                        this.possibleBlocks.setSize(this.proximity.size);
						
                        for(let i = tmp; i < this.proximity.size; i++){
                                this.possibleBlocks.set(i, new Unloader.UnloaderBuild.ContainerStat() );
                        }
                        this.lastUsed = this.proximity.size;
                }

                if(this.sortLiquid != null){
                        liquid = sortLiquid;

                        for(let pos = 0; pos < this.proximity.size; pos++){
                                var other = this.proximity.get(pos);
                                let interactable = other.interactable(this.team);

                                //set the stats of all buildings in possibleBlocks
                                let pb = this.possibleBlocks.get(pos);
                                pb.building = other;
                                pb.canUnload = interactable && other.canUnload() && other.liquids != null && other.liquids.has(sortLiquid);
                                pb.canLoad = interactable && !(other.block instanceof LiquidBlock) && other.acceptLiquid(this, sortLiquid);
                                pb.index = pos;
                        } 
                }else{
                        //select the next item for nulloaders
                        for(int i = 0; i < this.liquidslength; i++){
                                let total = (this.rotations + i + 1) % this.liquidslength;
                                let hasProvider = false;
                                let hasReceiver = false;
                                let isDistinct = false;
								
                                let possibleLiquid = Vars.content.liquid(total);

                                for(let pos = 0; pos < this.proximity.size; pos++){
                                        var other = this.proximity.get(pos);
                                        let interactable = other.interactable(this.team);

                                        //set the stats of all buildings in possibleBlocks while we are at it
                                        pb = this.possibleBlocks.get(pos);
                                        pb.building = other;
                                        pb.canUnload = interactable && other.canUnload() && other.liquids != null && other.liquids.has(possibleLiquid);
                                        pb.canLoad = interactable && !(other.block instanceof LiquidBlock) && other.acceptLiquid(this, possibleLiquid);
                                        pb.index = pos;

                                        //the part handling framerate issues and slow conveyor belts, to avoid skipping items
                                        if(hasProvider && pb.canLoad) isDistinct = true;
                                        if(hasReceiver && pb.canUnload) isDistinct = true;
                                        hasProvider = hasProvider || pb.canUnload;
                                        hasReceiver = hasReceiver || pb.canLoad;
                                }
								
                                if(isDistinct){
                                        liquid = possibleLiquid;
                                        break;
                                }
                        }
                }

                if(liquid != null){
                        //only compute the load factor if a transfer is possible
                        for(let pos = 0; pos < this.proximity.size; pos++){
                                pb = this.possibleBlocks.get(pos);
                                var other = pb.building;
                                pb.loadFactor = (other.getMaximumAccepted(liquid) == 0) || (other.liquids == null) ? 0 : other.liquids.get(liquid) / other.getMaximumAccepted(liquid);
                        }

                        //sort so it gives full priority to blocks that can give but not receive (stackConveyors and Storage), and then by load, and then by last use
                        this.possibleBlocks.sort(
                                Structs.comps(
                                        Structs.comps(
                                                Structs.comparingBool(e => e.building.block.highUnloadPriority && !e.canLoad),
                                                Structs.comparingBool(e => e.canUnload && !e.canLoad)
                                        ),
                                        Structs.comps(
                                                Structs.comparingFloat(e => e.loadFactor),
                                                Structs.comparingInt(e => -this.lastUsed[e.index])
                                        )
                                )
                        );

                        let dumpingFrom = null;
                        let dumpingTo = null;

                        //choose the building to accept the liquid
                        for(let i = 0; i < this.possibleBlocks.size; i++){
                                if(this.possibleBlocks.get(i).canLoad){
                                        dumpingTo = possibleBlocks.get(i);
                                        break;
                                }
                        }

                        //choose the building to give the liquid
                        for(let i = this.possibleBlocks.size - 1; i >= 0; i--){
                                if(this.possibleBlocks.get(i).canUnload){
                                        dumpingFrom = possibleBlocks.get(i);
                                        break;
                                }
                        }

                        //increment the priority if not used
                        for(let i = 0; i < this.possibleBlocks.size; i++){
                                this.lastUsed[i] = (this.lastUsed[i] + 1 ) % 2147483647;
                        }

                        //trade the items
                        if(dumpingFrom != null && dumpingTo != null && (dumpingFrom.loadFactor != dumpingTo.loadFactor || !dumpingFrom.canLoad)){
				dumpingFrom.building.transferLiquid(this, this.block.speed, liquid);
				this.transferLiquid(dumpingTo, this.block.speed, liquid);
                                this.lastUsed[dumpingFrom.index] = 0;
                                this.lastUsed[dumpingTo.index] = 0;
								
                                this.any = true;
                        }
						
                        if(this.sortLiquid == null) this.rotations = liquid.id;
                }

                if(this.any){
                        this.unloadTimer %= this.block.speed;
                }else{
                        this.unloadTimer = Math.min(unloadTimer, this.block.speed);
                }

                if(this.proximity.size > 0){
                        this.offset++;
                        this.offset %= this.proximity.size;
                }
        }

        draw(){
                this.super$draw();

                /*Draw.color(this.sortLiquid == null ? Color.clear : this.sortLiquid.color);
                Draw.rect('unloader-center', x, y);
                Draw.color();*/
        }
		
        buildConfiguration(table){
                ItemSelection.buildTable(LiquidBlock.this, table, Vars.content.liquids(), () => this.sortLiquid, () => this.configure);
        }

        onConfigureTileTapped(other){
                if(this == other){
                        this.deselect();
                        this.configure(null);
                        return false;
                }
                return true;
        }

        config(){
            return this.sortLiquid;
        }

        version(){
            return 1;
        }

        write(write){
                this.super$write(write);
                write.s(this.sortItem == null ? -1 : this.sortLiquid.id);
        }

        read(read, revision){
                this.super$read(read, revision);
                let id = revision == 1 ? read.s() : read.b();
                this.sortLiquid = id == -1 ? null : Vars.content.liquids().get(id);
        }
});