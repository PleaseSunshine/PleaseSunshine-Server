const key = require("../../config/secretKey");
const pannelInfo = require("../models/pannelInfo")
const SaveMoneyCalculator = require("../lib/SaveMoneyCalculator")

module.exports = {
    getElecReduAvg :  async function (money, watt) {
        let saveMoney = await SaveMoneyCalculator.calSavedMoney(money, watt);
        return saveMoney;
    },
    getInstallCostAvg : async function (watt) {
        let installCostAvg = await pannelInfo.selectInstallPriceByWatt(watt);
        // result = JSON.stringify(installCostAvg)
        // console.log(result)
        // app.locals.g_installcost=installCostAvg.price; 전역변수로 저장하고 싶
        if(!installCostAvg[0].price) return 0
        return installCostAvg[0].price
    },
    /* 지원금 데이터 추가되면 수정 예정 */
    getBePoint : async function(savedMoney, installCostAvg){
        
        let bePoint = await SaveMoneyCalculator.calBePoint(savedMoney, installCostAvg);
        return Number(bePoint);
    },
    getvolunteer : async function(watt){
        return 7
    },
    getCoffee : async function(watt){
        return 65
    }

}