const exampleEngines = [
  {
    name: "main-massive-engine",
    power: 10,
    
    size: 5,
    innerSize: 4,
    
    offsetX: 0,
    offsetY: 10,
    
    mainColor: (unit) => unit.team.color,
    innerColor: Color.valueOf('#FFFFFF'),
  },
  
  {
    name: "left-turntable",
    power: 10,
    
    size: 3,
    innerSize: 2,
    
    offsetX: -5,
    offsetY: 9,
    
    mainColor: (unit) => unit.team.color,
    innerColor: Color.valueOf('#FFFFFF'),
  },
  
  {
    name: "right-turntable",
    power: 10,
    
    size: 3,
    innerSize: 2,
    
    offsetX: 5,
    offsetY: 9,
    
    mainColor: (unit) => unit.team.color,
    innerColor: Color.valueOf('#FFFFFF'),
  },
];



function drawMultyEngine(unit, engines){
  for(let engine of engines){
    
    let scale = unit.elevation;
    
    let offsetX = engine.offsetX/2 + engine.offsetX/2*scale;
    let offsetY = engine.offsetY/2 + engine.offsetY/2*scale;

    let engineSize = engine.size;
    let innerSize = engine.innerSize;
	
    //let part = Math.ceil( (unit.rotation+0.001)/45 );
    //let isVertic = !( part == 8 ||  part == 1 || part == 4 || part == 5 );
    
    Draw.color(engine.mainColor(unit));
        Fill.circle(
            unit.x + Angles.trnsx(unit.rotation + 180, offsetY) + Angles.trnsx(unit.rotation + 90, offsetX),
            unit.y + Angles.trnsy(unit.rotation + 180, offsetY) + Angles.trnsy(unit.rotation + 90, offsetX),
           (engineSize + Mathf.absin(Time.time, 2, engineSize / 4)) * scale
        );
    
    Draw.color(engine.innerColor);
        Fill.circle(
	    unit.x + Angles.trnsx(unit.rotation + 180, offsetY-1) + Angles.trnsx(unit.rotation + 90, offsetX),
	    unit.y + Angles.trnsy(unit.rotation + 180, offsetY-1) + Angles.trnsy(unit.rotation + 90, offsetX),
           ((innerSize + Mathf.absin(Time.time, 2, innerSize / 4))) * scale
        );
    
    Draw.color();
  }
};




const lambda = extend(UnitType, "lambda", {
	drawEngine(unit){
		drawMultyEngine( unit, exampleEngines );
	}
});
lambda.constructor = () => extend(UnitEntity, {});
lambda.defaultController = () => extend(BuilderAI, {});

const sm = extend(UnitType, "scarlet-moth", {});
sm.constructor = () => extend(UnitEntity, {});
sm.defaultController = () => extend(BuilderAI, {});
