/*
여기에서 계산하기 - /simulation/energy
환경 - /simulation/environment
비용 - /simulation/cost
*/
const { respondJson, respondOnError } = require('../lib/response');
const kospo = require("../lib/env_kospo")
const energy = require("../lib/energy")

const getEnergy = async(req, res) => {
    try{
        let lat = req.params.lat;
        let lon = req.params.lon;
        let angle = req.params.angle;
        let result = await energy(lat, lon, angle)
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    } 
}
/* api */
const getEnv = async(req, res) => {
    try{
        let result = await kospo()
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    } 
}

const getCost = async(req, res) => {
    try{
        let user_id = req.params.user_id;
        let result = await usersLogic.getUserById(user_id);
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    } 
}

module.exports={getEnergy, getEnv, getCost};
