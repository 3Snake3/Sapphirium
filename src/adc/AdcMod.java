package adc;

import mindustry.mod.Mod;
import mindustry.type.Category;
import mindustry.type.ItemStack;
import mindustry.world.meta.BuildVisibility;

public class AdcMod extends Mod {
    public boolean debug = false;

    @Override
    public void loadContent() {
        if (debug) {
            new GeothermalHeater("test") {{
                requirements(Category.crafting, BuildVisibility.shown, ItemStack.empty);
                size = 3;
                maxBoost = 10f;
            }};
        }
    }
}
