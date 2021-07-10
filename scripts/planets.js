///CONST///

isDev = true;

///FUNCTIONS///

///CONTENT///

const Planet = extend(Planet, "test", Planets.sun, 3, 1, {});

Planet.generator = testGenerator;
Planet.startSector = 78;

//Planet.hasAtmosphere = true;
Planet.atmosphereRadIn = 0.019;
Planet.atmosphereRadOut = 0.29;
Planet.atmosphereColor = Color.valueOf("7B5959FF");
	
Planet.meshLoader = () => new HexMesh(Planet, 6);
	
Planet.orbitRadius = 20.4;
Planet.rotateTime = 10200;
Planet.orbitTime = Mathf.pow((1.0 + 10.0 + 0.76), 1.5) * 80;

if(isDev){
Planet.accessible = true
}else{
Planet.accessible = false
}		
