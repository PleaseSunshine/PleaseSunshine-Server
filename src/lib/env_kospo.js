const moment = require('moment');
const key = require("../../config/secretKey");
const convert = require('xml-js');
const request = require('request');
var date = new Date();

module.exports = function() {
    //매월 1일에만 계산하여 db에 저장. 
    //나머지 일에는 db저장된 값 꺼내오깅
    if(date.getDay() == 1){
        let s_date = date.getFullYear()+""+ pad(date.getMonth()-1,2);
        let e_date = date.getFullYear()+""+ pad(date.getMonth(),2)
        let host = "http://dataopen.kospo.co.kr/openApi/Conce/AirPollutant"

        console.log(s_date, e_date);
        const requestUrl = `${host}?strOrgCd=5300&strSdate=${s_date}&strEdate=${e_date}&serviceKey=${key.api_key}`
        console.log(requestUrl);
        request.post(requestUrl, (err,res,body) =>{
            if(err){
                console.log(`err => ${err}`)
            }
            else {
                if(res.statusCode == 200){
                    var result = body
                    console.log(`body data => ${result}`)
                    var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
                    console.log(`xml to json => ${xmlToJson}`)
                }
            }   
        })
    }
    
}

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }
//http://dataopen.kospo.co.kr/openApi/Conce/AirPollutant?strOrgCd=5300&strSdate=201809&strEdate=201810&serviceKey=F5dTXsyZ7k2Qbq40cBjb250GgOAREXU4SMnvSz38yhwksMKGWkmVl9OecMHZZPOKIgvKfzMgmWDreknn6mafZA%3D%3D