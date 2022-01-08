const cp = extend(RainWeather, "creotite-precipitation", {});

const statuses = require("statuses/statuses");

const lp = extend(RainWeather, "ledonite-precipitation", {
status: statuses.superFreezing,
statusDuration: 120,
});

const rf = extend(ParticleWeather, "radioactive-fog", {
duration: 17 * Time.toMinutes
});

module.exports = {
cp: cp,
lp: lp,
rf: rf
}