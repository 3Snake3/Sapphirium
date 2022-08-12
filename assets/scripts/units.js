const trident = extend(UnitType, "trident", {});
trident.constructor = () => extend(UnitEntity, {});
trident.payloadCapacity = 1;
trident.ammoType = new PowerAmmoType(700);
trident.abilities.add(new RepairFieldAbility(30, 600, 100), new ForceFieldAbility(30, 0.1, 50, 80));
trident.immunities = ObjectSet.with(StatusEffects.freezing, StatusEffects.wet);

const lambda = extend(UnitType, "lambda", {
});
lambda.constructor = () => extend(UnitEntity, {});
lambda.controller = (u) => extend(BuilderAI, {});

const sm = extend(UnitType, "scarlet-moth", {});
sm.constructor = () => extend(UnitEntity, {});
sm.controller = (u) => extend(BuilderAI, {});
