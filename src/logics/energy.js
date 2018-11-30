const EnergyCalculator = require("../lib/EnergyCalculator");
const busanSun  = require("../models/busanSun");

module.exports = {
    //lat, lon 로 일사량 평균 구함 
    //e1, e2, e3 과 angle로 태양광 구함
    getSunshine : async function (lat, lon) {
        let result = await busanSun.selectMinSunshine(lat, lon);
        if(!result[0].sunshine) return 0
        return Number(result[0].sunshine)
    },
    getEnergy : async function (energy, angle) {
        return Number(await EnergyCalculator(energy, angle))
    },
    getPercentage : async function (localEnergy) {
        return parseInt(((localEnergy * 100) / 2100).toFixed(0));
    },
} 