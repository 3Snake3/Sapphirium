var liquidsTemp = new StatCat("liquidstemp");
var waterTemp = new Stat("watertemp", liquidsTemp);
var arkysTemp = new Stat("arkysTemp", liquidsTemp);
var neoplasmTemp = new Stat("neoplasmtemp", liquidsTemp);
var slagTemp = new Stat("slagtemp", liquidsTemp);

var liquidStats = [
    Liquids.water, waterTemp,
    Liquids.arkycite, arkysTemp,
    Liquids.neoplasm, neoplasmTemp,
    Liquids.slag, slagTemp
];

module.exports = {
    liquidStats: liquidStats
}