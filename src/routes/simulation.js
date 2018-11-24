var express = require('express');
var simulation = express.Router();
const controller = require("../controller/simulationController")

simulation.get("/energy/", controller.getEnergy)
// simulation.get("/energy/", controller.getEnergy)
simulation.get("/environment", controller.getEnv)
simulation.get("/cost/", controller.getCost)

module.exports = simulation;

/*
튜토리얼- 첫 사용인지 확인 /isFirst
module - 공공데이터 가져오기 (한달에 한번씩 ) - module/kospo 
여기에서 계산하기 - /simulation/energy
환경 - /environment
비용 - /cost
*/