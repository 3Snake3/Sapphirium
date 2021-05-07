const freezerframes = new DrawAnimation();

freezerframes.frameCount = 10;

const freezer = extendContent(GenericCrafter, "freezer",{});

freezer.drawer = freezerframes;