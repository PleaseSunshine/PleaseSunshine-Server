var express = require('express');
var simulation = express.Router();
const controller = require("../controller/simulationController")

simulation.get("/energy/", controller.getEnergy)
simulation.get("/environment/", controller.getEnv)
simulation.get("/cost/", controller.getCost)

module.exports = simulation;
