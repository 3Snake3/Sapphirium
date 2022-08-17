package adc;

import arc.math.Mathf;
import arc.util.io.Reads;
import arc.util.io.Writes;
import mindustry.graphics.Pal;
import mindustry.ui.Bar;
import mindustry.world.blocks.heat.HeatBlock;
import mindustry.world.blocks.production.AttributeCrafter;
import mindustry.world.draw.DrawDefault;
import mindustry.world.draw.DrawHeatOutput;
import mindustry.world.draw.DrawMulti;
import mindustry.world.meta.Stat;
import mindustry.world.meta.StatUnit;

public class GeothermalHeater extends AttributeCrafter {
    public float heatOutput = 5f;
    public float heatOutputVisualMax = 20f;

    public GeothermalHeater(String name) {
        super(name);
        drawer = new DrawMulti(new DrawDefault(), new DrawHeatOutput());
        rotateDraw = false;
        rotate = true;
        canOverdrive = false;
        drawArrow = true;
        floating = true;
        baseEfficiency = 0f;
        minEfficiency = 0.0001f;
    }

    @Override
    public void setStats() {
        super.setStats();
        stats.add(Stat.output, heatOutput, StatUnit.heatUnits);
    }

    @Override
    public void setBars() {
        super.setBars();
        addBar("heat", (GeothermalHeaterBuild entity) -> new Bar("bar.heat", Pal.lightOrange, entity::heatVisualFrac));
    }


    public class GeothermalHeaterBuild extends AttributeCrafterBuild implements HeatBlock {
        public float heat = 0f;

        @Override
        public void updateTile() {
            super.updateTile();
            float realEff = efficiency * efficiencyScale();
            //heat approaches target at the same speed regardless of efficiency
            heat = Mathf.approachDelta(heat, heatOutput * realEff, warmupSpeed);
        }

        @Override
        public float heat() {
            return heat;
        }

        @Override
        public float heatFrac() {
            return heat / heatOutput;
        }

        public float heatVisualFrac() {
            return heat / heatOutputVisualMax;
        }

        @Override
        public void write(Writes write) {
            super.write(write);
            write.f(heat);
        }

        @Override
        public void read(Reads read, byte revision) {
            super.read(read, revision);
            heat = read.f();
        }
    }
}
