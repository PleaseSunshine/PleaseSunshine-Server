/*
여기에서 계산하기 - /simulation/energy
환경 - /simulation/environment
비용 - /simulation/cost
*/
const { respondJson, respondOnError } = require('../lib/response');
const kospo = require("../lib/kospo")
const energy = require("../lib/energy")
const cost = require("../lib/cost")
var date = new Date();

const getEnergy = async(req, res) => {
    try{
        let lat = req.params.lat;
        let lon = req.params.lon;
        let angle = req.params.angle;
        let energy = await cost.getSunshine(lat, lon, angle)
        // let subnshine = awaut cost.getEnergy(energy)
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    } 
}

const getEnv = async(req, res) => {
    try{
         //매월 1일에만 계산하여 db에 저장. 
        //나머지 일에는 db저장된 값 꺼내오깅
        if(date.getDay() == 1){ await kospo.getKospoAPI()}
        var raw_result  = await kospo.getEnvData()

        let result = { "cado":[], "nox" :[], "udst":[] }
        var i=0;
        var source = ["sun", "kospo", "thermal_power"]
        await raw_result.forEach(element => {
            if(element.key="cado") result.cado.push(`${source[i]}:${element.cado}`);
            if(element.key="nox") result.nox.push(`${source[i]}:${element.nox}`);
            if(element.key="udst") result.udst.push(`${source[i]}:${element.udst}`);
            i++
        });
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        if(err.message == 'kospo openAPI server error') respondOnError(err.message, res, 500);
        respondOnError(err.message, res, err.statusCode);
    } 
}
const getCost = async(req, res) => {
    try{
        let watt = req.params.watt;

        console.log("cost: " + watt)
        // let ElecReduAvg = await cost.getElecReduAvg(watt);
        let installCostAvg = await cost.getInstallCost(watt);
        // let bePoint = await cost.getBePoint(watt);
        // let volunteer = await cost.getvolunteer(watt);
        // let coffee = await cost.getCoffee(watt);

        // let result = {
        //     "watt": watt, 
        //     "ElecReduAvg":ElecReduAvg, 
        //     "installCostAvg" : installCostAvg + "원", 
        //     "bePoint": bePoint + "개월", 
        //     "volunteer" : volunteer + "명의 아이들", 
        //     "coffee":coffee + "잔의 커피"
        // }
        // respondJson("Success", result, res, 200);
        respondJson("Success", installCostAvg, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    } 
}
module.exports={getEnergy, getEnv, getCost};
