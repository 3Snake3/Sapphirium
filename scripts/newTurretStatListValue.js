const newAmmoListValue = require("newAmmoListValue");
module.exports = (weapon, icon, bullet, title) => {
  const w = new StatValue({
    display(table){
      table.row();
      
      table.add(title).padRight(10).right().top();
      table.row();
      table.image(icon).size(60).scaling(Scaling.bounded).right().top();
      
      table.table(Tex.underline, w => {
        w.left().defaults().padRight(3).left();
        
        if(weapon.inaccuracy > 0){
          w.add("[lightgray]" + Stat.inaccuracy.localized() + ": [white]" + weapon.inaccuracy + " " + StatUnit.degrees.localized());
        }
        if(weapon.range > 0){
          // this.sep(w, "[lightgray]" + Stat.shootRange.localized() + ": [white]" + Strings.fixed(weapon.range / Vars.tilesize, 1) + " " + StatUnit.blocks);
          w.row()
          w.add("[lightgray]" + Stat.shootRange.localized() + ": [white]" + Strings.fixed(weapon.range / Vars.tilesize, 1) + " " + StatUnit.blocks);
        }
        // this.sep(w, "[lightgray]" + Core.bundle.get("stat.prog-mats.ammo-shot") + ": [white]" + weapon.ammoPerShot);
        // this.sep(w, "[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / weapon.reloadTime * weapon.shots, 1));
        
        // this.sep(w, "[lightgray]" + Stat.targetsAir.localized() + ": [white]" + (!weapon.targetAir ? Core.bundle.get("no") : Core.bundle.get("yes")));
        // this.sep(w, "[lightgray]" + Stat.targetsGround.localized() + ": [white]" + (!weapon.targetGround ? Core.bundle.get("no") : Core.bundle.get("yes")));
        
        w.row();
        w.add("[lightgray]" + Stat.ammoUse.localized() + ": [white]" + weapon.ammoPerShot + StatUnit.perShot.localized());
        w.row();
        w.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / weapon.reloadTime * weapon.shots, 1));
        
        w.row();
        w.add("[lightgray]" + Stat.targetsAir.localized() + ": [white]" + (!weapon.targetAir ? Core.bundle.get("no") : Core.bundle.get("yes")));
        w.row();
        w.add("[lightgray]" + Stat.targetsGround.localized() + ": [white]" + (!weapon.targetGround ? Core.bundle.get("no") : Core.bundle.get("yes")));
        
        const b = newAmmoListValue(bullet);
        b.display(w);
      }).padTop(-15).left();
      table.row();
    }/*,
    sep(table, text){
      table.row();
      table.add(text);
    }*/
    // Apparently attempting to call this doesn't work on some devices.
  });
  
  return w;
};