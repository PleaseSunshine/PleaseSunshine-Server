/*
    위도	경도	kWh/m2
*/  
const key = require("../../config/secretKey");
const env = require("../models/env");
const EnergyCalculator = require("../lib/EnergyCalculator")

module.exports = {
    //lat, lon 로 일사량 평균 구함 
    //e1, e2, e3 과 angle로 태양광 구함
    getSunshine : async function (lat, lon, angle) {
        
    },
    getEnergy : async function (energy, angle) {
        return Number(EnergyCalculator(energy, angle))
    },
    getPercentage : async function () {
        return 70
    },
}