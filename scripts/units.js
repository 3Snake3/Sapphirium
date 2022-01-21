const lambda = extend(UnitType, "lambda", {});
lambda.constructor = () => extend(UnitEntity, {});
lambda.defaultController = () => extend(BuilderAI, {});

const sm = extend(UnitType, "scarlet-moth", {});
sm.constructor = () => extend(UnitEntity, {});
sm.defaultController = () => extend(BuilderAI, {});







const exampleEngines = [
  {
    name: "main-massive-engine",
    power: 10,
    
    size: 5,
    
    offsetX: 20,
    offsetY: 10,
    
    mainColor: (unit) => unit.team.color,
    innerColor: Color.valueOf('#888888'),
  },
  
  {
    name: "left-turntable",
    power: 10,
    
    size: 3,
    
    offsetX: 10,
    offsetY: 12,
    
    mainColor: (unit) => unit.team.color,
    innerColor: Color.valueOf('#888888'),
  },
  
  {
    name: "right-turntable",
    power: 10,
    
    size: 3,
    
    offsetX: 30,
    offsetY: 12,
    
    mainColor: (unit) => unit.team.color,
    innerColor: Color.valueOf('#888888'),
  },
];



function drawMultyEngine(unit, engines){
  for(let engine of engines){
    
    let scale = unit.elevation;
    
    let offsetX = engine.offsetX/2 + engine.offsetX/2*scale;
    let offsetY = engine.offsetY/2 + engine.offsetY/2*scale;

    let engineSize = engine.size;
    
    Draw.color(engine.mainColor(unit));
    Fill.circle(
      unit.x + Angles.trnsx(unit.rotation + 180, offsetX),
      unit.y + Angles.trnsy(unit.rotation + 180, offsetY),
      (engineSize + Mathf.absin(Time.time, 2, engineSize / 4)) * scale
    );
    
    Draw.color(engine.innerColor);
    Fill.circle(
      unit.x + Angles.trnsx(unit.rotation + 180, offsetX - 1),
      unit.y + Angles.trnsy(unit.rotation + 180, offsetY - 1),
      (engineSize + Mathf.absin(Time.time, 2, engineSize / 4)) / 2 * scale
    );
    
    Draw.color();
  }
};
