///CONST///

let isDev = true;

///FUNCTIONS///

///CONTENT///

const testPlanet = extend(Planet, "test", Planets.sun, 3, 1, {});

//tesPlanet.generator = testGenerator;
testPlanet.startSector = 78;

//Planet.hasAtmosphere = true;
testPlanet.atmosphereRadIn = 0.019;
testPlanet.atmosphereRadOut = 0.29;
testPlanet.atmosphereColor = Color.valueOf("7B5959FF");
	
testPlanet.meshLoader = () => new HexMesh(Planet, 6);
	
testPlanet.orbitRadius = 20.4;
testPlanet.rotateTime = 10200;
testPlanet.orbitTime = Mathf.pow((1.0 + 10.0 + 0.76), 1.5) * 80;

if(isDev){
testPlanet.accessible = true
}else{
testPlanet.accessible = false
}		
