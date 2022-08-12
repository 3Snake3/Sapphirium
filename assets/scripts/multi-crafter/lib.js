const loader = Vars.mods.mainLoader();
const scripts = Vars.mods.scripts;
const NativeJavaClass = Packages.rhino.NativeJavaClass;
function getClass(name){
	return NativeJavaClass(scripts.scope, loader.loadClass(name));
};

const multiCrafterClz = getClass("multicraft.MultiCrafter")
module.exports = {
    MultiCrafter : multiCrafterClz
}