const epitaph = extend(TankUnitType, "epitaph", {});
epitaph.constructor = () => extend(TankUnit, {});

const fatum = extend(ErekirUnitType, "fatum", {});
fatum.constructor = () => extend(LegsUnit, {});