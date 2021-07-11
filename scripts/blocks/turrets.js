const statuses = require("statuses/statuses");

const spear = extend(LaserBoltBulletType, {});
spear.width = 6;
spear.height = 35;
spear.frontColor = Color.valueOf("ffffff");
spear.backColor = Color.valueOf("0096FF");
spear.damage = 80;
spear.speed = 8;
spear.lifetime = 36.3;
spear.pierce = true;
spear.hittable = false;
spear.absorbable = false;
spear.reflectable = false;
spear.keepVelocity = false;
spear.hitSize = 4;
spear.lightning = 4;
spear.lightningLength = 15;
spear.lightningCone = 90;
spear.lightningDamage = 20;
spear.lightningColor = Color.valueOf("0096FF");
spear.hitSound = Sounds.spark;
spear.pierceBuilding = true;
spear.status = statuses.weakened;
spear.statusDuration = 70;
spear.splashDamageRadius = 25;
spear.splashDamage = 45;
spear.buildingDamageMultiplier = 0.15;

const impaler = extendContent(PowerTurret, "impaler", {});
impaler.shootType = spear;

const waveCreotite = extend(LiquidBulletType, {});
waveCreotite.speed = 3;
waveCreotite.status = statuses.superMelting;
waveCreotite.knockback = 0.9;
waveCreotite.pierceCap = 12;
waveCreotite.pierce = true;
waveCreotite.liquid = creotiteLiquid;

const tsunamiCreotite = extend(LiquidBulletType, {});
tsunamiCreotite.speed = 5;
tsunamiCreotite.status = statuses.superMelting;
tsunamiCreotite.lifetime = 54;
tsunamiCreotite.knockback = 1.09;
tsunamiCreotite.pierceCap = 20;
tsunamiCreotite.pierce = true;
tsunamiCreotite.liquid = creotiteLiquid;

Events.on(ClientLoadEvent, cons(e=>{
   const creotiteLiquid = Vars.content.getByName(ContentType.liquid, "adc-creotite");
  
   Blocks.wave.ammo(
      Liquids.water, Bullets.waterShot, 
      Liquids.slag, Bullets.slagShot, 
      Liquids.oil, Bullets.oilShot, 
      Liquids.cryofluid, Bullets.cryoShot, 
      creotiteLiquid, waveCreotite
   );

   Blocks.tsunami.ammo(
      Liquids.water, Bullets.heavyWaterShot, 
      Liquids.slag, Bullets.heavySlagShot, 
      Liquids.oil, Bullets.heavyOilShot, 
      Liquids.cryofluid, Bullets.heavyCryoShot, 
      creotiteLiquid, tsunamiCreotite
   );

}));
