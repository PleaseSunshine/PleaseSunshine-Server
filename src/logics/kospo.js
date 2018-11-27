const key = require("../../config/secretKey");
const env = require("../models/env");
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
const request = require('request');
var date = new Date();

module.exports = {
    getKospoAPI : async function () {
        
        let s_date = date.getFullYear()+""+ pad(date.getMonth()-1,2);
        let e_date = date.getFullYear()+""+ pad(date.getMonth(),2)
        let host = "http://dataopen.kospo.co.kr/openApi/Conce/AirPollutant"

        const requestUrl = `${host}?strOrgCd=5300&strSdate=${s_date}&strEdate=${e_date}&serviceKey=${key.api_key}`

        request.post(requestUrl, async (err,res,body) =>{
            if(err){return new Error('kospo openAPI server error')}
            else {
                if(res.statusCode == 200){
                    parser.parseString(body, async function (err, result) {
                        let airsox=0, airnox=0, airdst=0;
                        result.response.header.forEach(element => {
                            airsox += Number(element.avgair01)
                            airnox += Number(element.avgair02)
                            airdst += Number(element.avgair03)
                        });
                        console.log(airsox, airnox, airdst);
                        await env.insertEnv(airsox, airnox, airdst);
                    });
                }
            }
        })
    },
    getEnvData : async function(){
        let result = await env.selectEnv();
        return result;
    }
}

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }
//http://dataopen.kospo.co.kr/openApi/Conce/AirPollutant?strOrgCd=5300&strSdate=201809&strEdate=201810&serviceKey=F5dTXsyZ7k2Qbq40cBjb250GgOAREXU4SMnvSz38yhwksMKGWkmVl9OecMHZZPOKIgvKfzMgmWDreknn6mafZA%3D%3D