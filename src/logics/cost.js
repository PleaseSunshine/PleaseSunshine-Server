const key = require("../../config/secretKey");
const pannelInfo = require("../models/pannelInfo")
const SaveMoneyCalculator = require("../lib/SaveMoneyCalculator")

module.exports = {
    getElecReduAvg :  async function (money) {
        let saveMoney = await SaveMoneyCalculator.calSavedMoney(money);
        console.log(saveMoney + " " + money)
        return saveMoney;
    },
    getInstallCost : async function (watt) {
        let installCostAvg = await pannelInfo.selectInstallPriceByWatt(watt);
        console.log(JSON.stringify(installCostAvg))
        // app.locals.g_installcost=installCostAvg.price; 전역변수로 저장하고 싶
        return installCostAvg.price
    },
    getBePoint : async function(watt, money){
        let bePoint = await SaveMoneyCalculator.calBePoint(watt, money);
        return bePoint;
    },
    getvolunteer : async function(watt){

    },
    getCoffee : async function(watt){

    },

}