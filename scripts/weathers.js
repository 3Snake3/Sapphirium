const cp = extend(RainWeather, "creotite-precipitation", {});

const statuses = require("statuses/statuses");

const lp = extend(RainWeather, "ledonite-precipitation", {
status: statuses.superFreezing,
statusDuration: 120,
});

module.exports = {
cp: cp,
lp: lp
}