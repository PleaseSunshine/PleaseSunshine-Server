const pannelInfo = require("../models/pannelInfo")
const SaveMoneyCalculator = require("../lib/SaveMoneyCalculator")

module.exports = {
    getElecReduAvg :  async function (money, watt) {
        let saveMoney = await SaveMoneyCalculator.calSavedMoney(money, watt);
        return parseInt(saveMoney);
    },
    getInstallCostAvg : async function (watt, supportMoney) {
        let installCostAvg = await pannelInfo.selectInstallPriceByWatt(watt);
        // app.locals.g_installcost=installCostAvg.price; 전역변수로 저장하고 싶
        if(!installCostAvg[0].price) return 0
        return Math.floor(installCostAvg[0].price/10000)*10000 - supportMoney;
    },
    /* 지원금 데이터 추가되면 수정 예정 */
    getBePoint : async function(savedMoney, installCostAvg){
        let bePoint = await SaveMoneyCalculator.calBePoint(savedMoney, installCostAvg);
        return bePoint;
    },
    getRefrigerator : async function(watt){
        return parseInt((watt * 3.6 * 365)/ (369800 / 365));
    },
    getCoffee : async function(savedMoney){
        return (savedMoney*12/4100).toFixed(1);
    }
}