const lambda = extend(UnitType, "lambda", {});
lambda.constructor = () => extend(UnitEntity, {});
lambda.defaultController = () => extend(BuilderAI, {});