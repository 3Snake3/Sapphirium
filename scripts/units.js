const lambda = extend(UnitType, "lambda", {});
lambda.constructor = () => extend(UnitEntity, {});
lambda.defaultController = () => extend(BuilderAI, {});

const sm = extend(UnitType, "scarlet-moth", {});
sm.constructor = () => extend(UnitEntity, {});
sm.defaultController = () => extend(BuilderAI, {});