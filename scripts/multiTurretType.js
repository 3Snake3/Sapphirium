module.exports = {
  newWeapon(b, n){
    /*Notes: Too lazy to do charging, or continuous.*/
    const mount = {
      x: 0,
      y: 0,
      shootX: 0,
      xRand: 0,
      shootY: 0,
      yRand: 0,
      width: 3,
      height: 3,
      elevation: 1,
      
      reloadTime: 30,
      bullet: b,
      ammoPerShot: 1,
      range: 80,
      rotateSpeed: 5,
      inaccuracy: 0,
      velocityInaccuracy: 0,
      shootCone: 8,
      targetAir: true,
      targetGround: true,
      
      recoilAmount: 1,
      restitution: 0.02,
      heatColor: Pal.turretHeat,
      cooldown: 0.02,
      
      name: n,
      title: "ohno",
      icon: "error",
      
      shootEffect: Fx.none,
      smokeEffect: Fx.none,
      coolEffect: Fx.fuelburn,
      ejectEffect: Fx.none,
      ejectX: 1,
      ejectY: -1,
      altEject: true,
      ejectRight: true,
      shootSound: Sounds.pew,
      loopSound: Sounds.none,
      loopVolume: 1,
      shootShake: 0,
      
      minRange: 0,
      shots: 1,
      barrels: 1,
      barrelSpacing: 0,
      sequential: false,
      spread: 0,
      burstSpacing: 0,
      
      unitSort: (u, x, y) => Mathf.dst(u.x, u.y, x, y)
    };
    
    return mount;
  },
  newMultiTurret(name, mounts, ammoItem, mainBullet, rangeTime, fadeTime, title){
    const amount = mounts.length;
    const totalRangeTime = rangeTime * amount;
    const newTurretStatListValue = require("newTurretStatListValue");
    
    const multiTur = extend(ItemTurret, name, {
      load(){
        this.teamRegion = Core.atlas.find("error");
        this.baseRegion = Core.atlas.find(this.name + "-base", "block-" + this.size);
        this.region = Core.atlas.find(this.name + "-baseTurret");
        this.heatRegion = Core.atlas.find(this.name + "-heat");
        this.outline = Core.atlas.find(this.name + "-outline");
        this.baseTurret = Core.atlas.find(this.name + "-baseTurret");
        this.turrets = [];
        for(var i = 0; i < amount; i++){
          //[Sprite, Outline, Heat, Fade Mask, Full]
          let mount = mounts[i];
          var sprites = [
            Core.atlas.find(mount.name), 
            Core.atlas.find(mount.name + "-outline"),
            Core.atlas.find(mount.name + "-heat"), 
            Core.atlas.find(mount.name + "-mask")
          ];
          this.turrets[i] = sprites;
        }
        
        this.loopSounds = [];
        for(var i = 0; i < amount; i++){
          this.loopSounds[i] = (mounts[i].loopSound == Sounds.none ? null : new SoundLoop(mounts[i].loopSound, mounts[i].loopVolume));
        }
      },
      drawPlace(x ,y ,rotation, valid){
        this.super$drawPlace(x, y, rotation, valid);
        for(var i = 0; i < amount; i++){
          var fade = Mathf.curve(Time.time % totalRangeTime, rangeTime * i, rangeTime * i + fadeTime) - Mathf.curve(Time.time % totalRangeTime, rangeTime * (i + 1) - fadeTime, rangeTime * (i + 1));
          var tX = x * Vars.tilesize + this.offset + mounts[i].x;
          var tY = y * Vars.tilesize + this.offset + mounts[i].y;
          //Drawf.dashCircle(Loc[0], Loc[1], mounts[i].range, Pal.placing); //I already know this'll be terrible in game.
          Lines.stroke(3, Pal.gray);
          Draw.alpha(fade);
          Lines.dashCircle(tX, tY, mounts[i].range);
          Lines.stroke(1, Vars.player.team().color);
          Draw.alpha(fade);
          Lines.dashCircle(tX, tY, mounts[i].range);
          
          Draw.color(Vars.player.team().color, fade);
          Draw.rect(this.turrets[i][3], tX, tY);
          Draw.reset();
        }
      },
      icons(){
        return[
          this.baseRegion,
          Core.atlas.find(this.name + "-icon")
        ]
      },
      setStats(){
        this.super$setStats();
        
        this.stats.remove(Stat.shootRange);
        this.stats.remove(Stat.inaccuracy);
        this.stats.remove(Stat.reload);
        this.stats.remove(Stat.ammoUse);
        
        this.stats.remove(Stat.ammo);
        const ammoStat = new StatValue({
          display(table){
            table.row();
            table.image(ammoItem.icon(Cicon.medium)).size(8 * 4).padRight(4).right().top();
            table.add(ammoItem.localizedName).padRight(10).left().top();
            table.table(Tex.underline, b => {
              b.left().defaults().padRight(3).left();
              
              b.add(Core.bundle.format("bullet.multiplier", mainBullet.ammoMultiplier));
            }).padTop(-9).left();
            table.row();
          }
        });
        this.stats.add(Stat.ammo, ammoStat);
        
        this.stats.remove(Stat.targetsAir);
        this.stats.remove(Stat.targetsGround);
        
        const wT = new StatValue({
          display(table){
            table.add();
            table.row();
            table.left();
            table.add("[lightgray]" + Core.bundle.get("stat.prog-mats.base-t")).fillX().padLeft(24);
            table.row();
            
            //Base Turret
            table.table(null, w => {
              const baseT = newTurretStatListValue(multiTur, multiTur.baseTurret, mainBullet, title);
              baseT.display(w);
              table.row();
            });
            
            table.row();
            table.left();
            table.add("[lightgray]" + Core.bundle.get("stat.prog-mats.mini-t")).fillX().padLeft(24);
            
            //Mounts
            table.table(null, w => {
              for(let i = 0; i < amount; i++){
                let mount = mounts[i];
                let baseT = newTurretStatListValue(mount, Core.atlas.find(mount.name + "-full"), mount.bullet, mount.title);
                baseT.display(w);
                table.row();
              }
            });
          }
        });
        
        this.stats.add(Stat.weapons, wT);
      }
    });
    
    multiTur.ammo(ammoItem, mainBullet);
    multiTur.mountTimer = multiTur.timers++;
    multiTur.mountInterval = 20;
    
    multiTur.buildType = ent => {
      ent = extend(ItemTurret.ItemTurretBuild, multiTur, {
        setEffs(){
          this._reloads = [];
          this._heats = [];
          this._recoils = [];
          this._shotCounters = [];
          this._rotations = [];
          this._targets = [];
          this._targetPoss = [];
          this._wasShootings = [];
          for(var i = 0; i < amount; i++){
            this._reloads[i] = 0;
            this._heats[i] = 0;
            this._recoils[i] = 0;
            this._shotCounters[i] = 0;
            this._rotations[i] = 90;
            this._targets[i] = null;
            this._targetPoss[i] = new Vec2();
            this._wasShootings[i] = false;
          }
        },
        drawSelect(){
          this.super$drawSelect();
          for(var i = 0; i < amount; i++){
            var fade = Mathf.curve(Time.time % totalRangeTime, rangeTime * i, rangeTime * i + fadeTime) - Mathf.curve(Time.time % totalRangeTime, rangeTime * (i + 1) - fadeTime, rangeTime * (i + 1));
            let loc = this.mountLocations(i);
            //Drawf.dashCircle(Loc[0], Loc[1], mounts[i].range, Pal.placing); //I already know this'll be terrible in game.
            Lines.stroke(3, Pal.gray);
            Draw.alpha(fade);
            Lines.dashCircle(loc[0], loc[1], mounts[i].range);
            Lines.stroke(1, this.team.color);
            Draw.alpha(fade);
            Lines.dashCircle(loc[0], loc[1], mounts[i].range);
          
            Draw.color(this.team.color, fade);
            Draw.rect(multiTur.turrets[i][3], loc[2], loc[3], this._rotations[i] - 90);
            Draw.reset();
          }
        },
        mountLocations(mount){
          Tmp.v1.trns(this.rotation - 90, mounts[mount].x, mounts[mount].y - this.recoil);
          Tmp.v1.add(this.x, this.y);
          Tmp.v2.trns(this._rotations[mount], -this._recoils[mount]);
          var i = (this._shotCounters[mount] % mounts[mount].barrels) - (mounts[mount].barrels - 1) / 2;
          Tmp.v3.trns(this._rotations[mount] - 90, mounts[mount].shootX + mounts[mount].barrelSpacing * i + mounts[mount].xRand, mounts[mount].shootY + mounts[mount].yRand);
          
          var x = Tmp.v1.x;
          var y = Tmp.v1.y;
          var rX = x + Tmp.v2.x;
          var rY = y + Tmp.v2.y;
          var sX = rX + Tmp.v3.x;
          var sY = rY + Tmp.v3.y;
          
          return [x, y, rX, rY, sX, sY];
        },
        draw(){
          Draw.rect(multiTur.baseRegion, this.x, this.y);
          
          Draw.z(Layer.turret);
          Tmp.v4.trns(this.rotation, -this.recoil);
          Tmp.v4.add(this.x, this.y);
          
          Drawf.shadow(multiTur.outline, Tmp.v4.x - (multiTur.size / 2), Tmp.v4.y - (multiTur.size / 2), this.rotation - 90);
          Draw.rect(multiTur.outline, Tmp.v4.x, Tmp.v4.y, this.rotation - 90);
          Draw.rect(multiTur.region, Tmp.v4.x, Tmp.v4.y, this.rotation - 90);
          
          if(multiTur.heatRegion != Core.atlas.find("error") && this._heat > 0.00001){
            Draw.color(multiTur.heatColor, this._heat);
            Draw.blend(Blending.additive);
            Draw.rect(multiTur.heatRegion, Tmp.v4.x, Tmp.v4.y, this.rotation - 90);
            Draw.blend();
            Draw.color();
          }
          
          for(var i = 0; i < amount; i++){
            let loc = this.mountLocations(i);
            
            Drawf.shadow(multiTur.turrets[i][1], loc[2] - mounts[i].elevation, loc[3] - mounts[i].elevation, this._rotations[i] - 90);
          }
          
          for(var i = 0; i < amount; i++){
            let loc = this.mountLocations(i);
            
            Draw.rect(multiTur.turrets[i][1], loc[2], loc[3], this._rotations[i] - 90);
            Draw.rect(multiTur.turrets[i][0], loc[2], loc[3], this._rotations[i] - 90);
            
            if(multiTur.turrets[i][2] != Core.atlas.find("error") && this._heats[i] > 0.00001){
              Draw.color(mounts[i].heatColor, this._heats[i]);
              Draw.blend(Blending.additive);
              Draw.rect(multiTur.turrets[i][2], loc[2], loc[3], this._rotations[i] - 90);
              Draw.blend();
              Draw.color();
            }
          }
        },
        update(){
          this.super$update();
          
          for(var i = 0; i < amount; i++){
            if(!Vars.headless){
              let loc = this.mountLocations(i);
                
              if(multiTur.loopSounds[i] != null){
                multiTur.loopSounds[i].update(loc[4], loc[5], this.mountLoopSound(i));
              }
            }
          }
        },
        updateTile(){
          this.super$updateTile();
          
          for(var i = 0; i < amount; i++){
            this._wasShootings[i] = false;
            this._recoils[i] = Mathf.lerpDelta(this._recoils[i], 0, mounts[i].restitution);
            this._heats[i] = Mathf.lerpDelta(this._heats[i], 0, mounts[i].cooldown);
            
            if(!this.validateMountTarget(i)) this._targets[i] = null;
          }
          
          if(this.hasAmmo()){
            if(this.timer.get(multiTur.mountTimer, multiTur.mountInterval)){
              for(var i = 0; i < amount; i++){
                let loc = this.mountLocations(i);
                
                this._targets[i] = this.findMountTargets(i);
              }
            }
            
            for(var i = 0; i < amount; i++){
              let loc = this.mountLocations(i);
              
              if(this.validateMountTarget(i)){
                var canShoot = true;

                if(this.isControlled()){ //player behavior
                  this._targetPoss[i].set(this.unit.aimX, this.unit.aimY);
                  canShoot = this.unit.isShooting;
                }else if(this.logicControlled()){ //logic behavior
                  this._targetPoss[i] = this.targetPos;
                  canShoot = this.logicShooting;
                }else{ //default AI behavior
                  this.mountTargetPosition(i, this._targets[i], loc[0], loc[1]);

                  if(isNaN(this._rotations[i])){
                    this._rotations[i] = 0;
                  }
                }

                var targetRot = Angles.angle(loc[0], loc[1], this._targetPoss[i].x, this._targetPoss[i].y);

                this.mountTurnToTarget(i, targetRot);

                if(Angles.angleDist(this._rotations[i], targetRot) < mounts[i].shootCone && canShoot){
                  this.wasShooting = true;
                  this._wasShootings[i] = true;
                  this.updateMountShooting(i);
                }
              }
            }
          }
        },
        turnToTarget(target){
          this.super$turnToTarget(target);
          var speed = multiTur.rotateSpeed * this.delta() * this.baseReloadSpeed()
          var dist = Math.abs(Angles.angleDist(this.rotation, target));
          
          if(dist < speed) return;
          var angle = Mathf.mod(this.rotation, 360);
          var to = Mathf.mod(target, 360);

          if((angle > to && Angles.backwardDistance(angle, to) > Angles.forwardDistance(angle, to)) || (angle < to && Angles.backwardDistance(angle, to) < Angles.forwardDistance(angle, to))){
            var allRot = -speed;
          }else{
            var allRot = speed;
          }
          
          for(var i = 0; i < amount; i++){
            this._rotations[i] = (this._rotations[i] + allRot) % 360;;
          }
        },
        mountTurnToTarget(mount, target){
          this._rotations[mount] = Angles.moveToward(this._rotations[mount], target, mounts[mount].rotateSpeed * this.delta() * this.baseReloadSpeed());
        },
        findMountTargets(mount){
          let loc = this.mountLocations(mount);
          
          if(mounts[mount].targetAir && !mounts[mount].targetGround){
            return Units.bestEnemy(this.team, loc[0], loc[1], mounts[mount].range, e => !e.dead && !e.isGrounded(), mounts[mount].unitSort);
          }else{
            return Units.bestTarget(this.team, loc[0], loc[1], mounts[mount].range, e => !e.dead && (e.isGrounded() || mounts[mount].targetAir) && (!e.isGrounded() || mounts[mount].targetGround), b => true, mounts[mount].unitSort);
          }
        },
        validateMountTarget(mount){
          let loc = this.mountLocations(mount);
          
          return !Units.invalidateTarget(this._targets[mount], this.team, loc[0], loc[1]) || this.isControlled() || this.logicControlled();
        },
        mountTargetPosition(mount, pos, x, y){
          if(!this.hasAmmo()) return;
          var bullet = mounts[mount].bullet;
          var speed = bullet.speed;
          //slow bullets never intersect
          if(speed < 0.1) speed = 9999999;
          
          this._targetPoss[mount].set(Predict.intercept(Tmp.v4.set(x, y), pos, speed));
          
          if(this._targetPoss[mount].isZero()){
            this._targetPoss[mount].set(this._targets[mount]);
          }
        },
        updateMountShooting(mount){
          if(this._reloads[mount] >= mounts[mount].reloadTime){
            const type = mounts[mount].bullet;
            
            this.mountShoot(mount, type);
            
            this._reloads[mount] = 0;
          }else{
            this._reloads[mount] += this.delta() * mounts[mount].bullet.reloadMultiplier * this.baseReloadSpeed();
          }
        },
        updateCooling(){
          this.super$updateCooling();
          
          var maxUsed = multiTur.consumes.get(ConsumeType.liquid).amount / amount;

          var liquid = this.liquids.current();
          
          for(var i = 0; i < amount; i++){
            var used = Math.min(Math.min(this.liquids.get(liquid), maxUsed * Time.delta), Math.max(0, ((mounts[i].reloadTime - this._reloads[i]) / multiTur.coolantMultiplier) / liquid.heatCapacity)) * this.baseReloadSpeed();
            this._reloads[i] += used * liquid.heatCapacity * multiTur.coolantMultiplier;
            
            this.liquids.remove(liquid, used);
            
            let loc = this.mountLocations(i);
            
            if(Mathf.chance(0.06 / amount * used)){
              mounts[i].coolEffect.at(loc[0] + Mathf.range(mounts[i].width), loc[1] + Mathf.range(mounts[i].height));
            }
          }
        },
        mountShoot(mount, type){
          for(var j = 0; j < mounts[mount].shots; j++){
            const spreadAmount = j;
            Time.run(mounts[mount].burstSpacing * j, () => {
              if(!this.isValid() || !this.hasAmmo()) return;
              
              let loc = this.mountLocations(mount);
              
              if(mounts[mount].shootShake > 0){
                Effect.shake(mounts[mount].shootShake, mounts[mount].shootShake, loc[4], loc[y]);
              }
              
              var fshootEffect = mounts[mount].shootEffect == Fx.none ? type.shootEffect : mounts[mount].shootEffect;
              var fsmokeEffect = mounts[mount].smokeEffect == Fx.none ? type.smokeEffect : mounts[mount].smokeEffect;

              fshootEffect.at(loc[4], loc[5], this._rotations[mount]);
              fsmokeEffect.at(loc[4], loc[5], this._rotations[mount]);
              
              mounts[mount].shootSound.at(loc[4], loc[5], Mathf.random(0.9, 1.1));
              
              this._recoils[mount] = mounts[mount].recoilAmount;
              this._heats[mount] = 1;
              
              this.mountUseAmmo(mount);
              if(mounts[mount].loopSound != Sounds.none){
                multiTur.loopSounds[mount].update(loc[4], loc[5], true);
              }
              
              var velScl = 1 + Mathf.range(mounts[mount].velocityInaccuracy);
              var lifeScl = type.scaleVelocity ? Mathf.clamp(Mathf.dst(loc[4], loc[5], this._targetPoss[mount].x, this._targetPoss[mount].y) / type.range(), mounts[mount].minRange / type.range(), mounts[mount].range / type.range()) : 1;
              var angle = this._rotations[mount] + Mathf.range(mounts[mount].inaccuracy + type.inaccuracy) + (spreadAmount - (mounts[mount].shots / 2)) * mounts[mount].spread;
              
              type.create(this, this.team, loc[4], loc[5], angle, velScl, lifeScl);
              
              if(mounts[mount].sequential){
                this._shotCounters[mount]++;
              }
            });
          }
          
          if(!mounts[mount].sequential){
            this._shotCounters[mount]++;
          }
        },
        mountUseAmmo(mount){
          if(this.cheating()) return this.peekAmmo();

          const entry = this.ammo.peek();
          entry.amount -= mounts[mount].ammoPerShot;
          if(entry.amount <= 0) this.ammo.pop();
          this.totalAmmo -= mounts[mount].ammoPerShot;
          this.totalAmmo = Mathf.maxZero(this.totalAmmo);
          this.mountEjectEffects(mount);
          return entry.type();
        },
        mountEjectEffects(mount){
          if(!this.isValid()) return;
          
          var side = mounts[mount].altEject ? Mathf.signs[this._shotCounters[mount] % 2] : mounts[mount].ejectRight;
          let loc = this.mountLocations(mount);
          
          mounts[mount].ejectEffect.at(loc[4], loc[5], this._rotations[mount] * side);
        },
        mountLoopSound(mount){
          return this._wasShootings[mount];
        }
      });
      ent.setEffs();
      return ent;
    }
    return multiTur;
  }
};