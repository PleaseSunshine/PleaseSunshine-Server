/*
여기에서 계산하기 - /simulation/energy
환경 - /simulation/environment
비용 - /simulation/cost
*/
const { respondJson, respondOnError } = require('../lib/response');
const energy = require("../logics/energy");
const kospo = require("../logics/kospo");
const cost = require("../logics/cost");

var date = new Date();

/* /simulation/energy/:lat/:lon/:angle */
const getEnergy = async(req, res) => {
    try{
        let {lat,lon,angle} = req.params;
        let e = await energy.getSunshine(lat, lon, angle)
        let subnshine = await energy.getEnergy(e, angle)
        respondJson("Success", subnshine, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    } 
}

/* /simulation/environment */
const getEnv = async(req, res) => {
    try{
         //매월 1일에만 계산하여 db에 저장. 
        //나머지 일에는 db저장된 값 꺼내오깅
        if(date.getDay() == 1) await kospo.getKospoAPI();
        var raw_result  = await kospo.getEnvData();

        let result = { "cado":{}, "nox" :{}, "udst":{}};
        var i=0;
        var source = ["sun", "kospo", "thermal_power"];
        await raw_result.forEach(element => {
            if(element.key="e_cado") result.cado[source[i]] = element.e_cado;
            if(element.key="e_nox") result.nox[source[i]] = element.e_nox;
            if(element.key="e_udst") result.udst[source[i]] = element.e_udst;
            console.log(result.cado);
            i++;
        });
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        if(err.message == 'kospo openAPI server error') respondOnError(err.message, res, 500);
        respondOnError(err.message, res, err.statusCode);
    } 
}
/* /simulation/cost/:watt */
const getCost = async(req, res) => {
    try{
        let watt = Number(req.params.watt);

        console.log("cost: " + watt)
        let savedMoney = await cost.getElecReduAvg(1000000);
        let installCostAvg = await cost.getInstallCost(watt);
        let bePoint = await cost.getBePoint(watt);
        // let volunteer = await cost.getvolunteer(watt);
        // let coffee = await cost.getCoffee(watt);

        let result = {
            watt, 
            savedMoney, 
            installCostAvg,
            bePoint
        //     "volunteer" : volunteer + "명의 아이들", 
        //     "coffee":coffee + "잔의 커피"
        }
        respondJson("Success", result, res, 200);
        // respondJson("Success", installCostAvg, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    } 
}
module.exports={getEnergy, getEnv, getCost};
