/*
    table [pannelInfo]
    cado  // 이산화탄소
    nox //질소산화물
    udst // 초미세먼지
    source // 0-태양광 1- 남부발전 2- 화력발전
*/
const db = require('../lib/db');

const selectInstallPriceByWatt = async(watt) => {
    const sql = `SELECT AVG(pi_installPrice) as price FROM PanelInfo where pi_watt=?`;
    const result = db.query(sql, watt);
    return result;
}

module.exports ={selectInstallPriceByWatt}
