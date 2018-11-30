/*
여기에서 계산하기 - /energy
환경 - /environment
비용 - /cost?watt=?
비용 한눈 - /cost
*/
const { respondJson, respondOnError } = require('../lib/response');
const energy = require("../logics/energy");
const kospo = require("../logics/kospo");
const cost = require("../logics/cost");

var date = new Date();

/* /energy?lat=&lon=&angle= */
const getEnergy = async(req, res) => {
    try{
        let {lat,lon,angle} = req.query;

        let e = await energy.getSunshine(lat, lon);
        let sunshine = await energy.getEnergy(e, angle);
        let persent = await energy.getPercentage(sunshine);

        let result = {sunshine, persent};
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        if(err.message=='Bad Request') respondOnError(err.message, res, 400);
        else respondOnError(err.message, res, err.statusCode);
    } 
}
/* /environment */
const getEnv = async(req, res) => {
    try{
         //매월 1일에만 계산하여 db에 저장. 
        //나머지 일에는 db저장된 값 꺼냄
        if(date.getDay() == 1) await kospo.getKospoAPI();
        var raw_result  = await kospo.getEnvData();

        let result = { "nox":{}, "sox" :{}, "udst":{}, "busansox":{} };
        var i=0;
        var source = ["sun", "kospo", "thermal_power"];

        for(let i = 0 ; i < 3 ; i++){
            if(raw_result[i].key="e_nox") result.nox[source[i]] = raw_result[i].e_nox;
            if(raw_result[i].key="e_sox") result.sox[source[i]] = raw_result[i].e_sox;
            if(raw_result[i].key="e_udst") result.udst[source[i]] = raw_result[i].e_udst;
        }
        result.busansox = raw_result[3].e_sox;

        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        if(err.message == 'kospo openAPI server error') respondOnError(err.message, res, 500);
        respondOnError(err.message, res, err.statusCode);
    } 
}

// /* /cost?watt= */
// /* /cost */
const getCost = async(req, res)=>{
    try{
        if(req.query.watt) watts =[req.query.watt];

        else var watts = [250, 260, 270, 300];
        const supportMoney = [510000, 530000, 550000, 610000];
        var result =[];
        var i=0;

        while(i<watts.length){
            var watt = parseInt(watts[i]);
            const savedMoney = await cost.getElecReduAvg(1000000, watt);
            const installCostAvg = await cost.getInstallCostAvg(watt, parseInt(supportMoney[i]));
            const bePoint = await cost.getBePoint(savedMoney, installCostAvg);

            console.log(typeof(savedMoney) + typeof(installCostAvg)+ typeof(savedMoney))
            if(watts.length==1){
                var volunteer = await cost.getRefrigerator(watt);
                var coffee = await cost.getCoffee(savedMoney);
                result.push({watt, savedMoney, installCostAvg, bePoint, volunteer, coffee})
            }else result.push({watt, savedMoney, installCostAvg,bePoint})
            i++;
        }

        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    }  
}
module.exports={getEnergy, getEnv, getCost};
