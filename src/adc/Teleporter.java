package adc;

import mindustry.gen.Building;
import mindustry.world.Block;
import mindustry.world.meta.BlockGroup;

public class Teleporter extends Block {
    public Teleporter(String name) {
        super(name);
        update = true;
        solid = true;
        hasPower = true;
        group = BlockGroup.transportation;
        config(Integer.class, TeleporterBuild::setLinkFromRemote);
        configClear(TeleporterBuild::clearLinkFromRemote);
    }

    public class TeleporterBuild extends Building {
        public int link = -1;

        public void setLinkFromRemote(int link) {
            this.link = link;
        }
        public void clearLinkFromRemote() {
            this.link = -1;
        }

        @Override
        public boolean onConfigureBuildTapped(Building other) {
            if (this == other) {
                this.deselect();
                this.configure(null);
                return false;
            } else if (other instanceof TeleporterBuild) {
                TeleporterBuild target = (TeleporterBuild) other;
                return true;
            }
            return false;
        }
    }
}
