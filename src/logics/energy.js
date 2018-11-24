/*
    위도	경도	kWh/m2
*/  
const key = require("../../config/secretKey");
const env = require("../models/env");
const EnergyCalculator = require("../lib/EnergyCalculator");
const busanSun  = require("../models/busanSun");

module.exports = {
    //lat, lon 로 일사량 평균 구함 
    //e1, e2, e3 과 angle로 태양광 구함
    getSunshine : async function (lat, lon) {
        let result = await busanSun.selectMinSunshine(lat, lon);
        console.log(result)
        if(!result[0].sunshine) return 0
        return Number(result[0].sunshine)
    },
    getEnergy : async function (energy, angle) {
        return Number(await EnergyCalculator(energy, angle))
    },
    getPercentage : async function () {
        return 70
    },
}