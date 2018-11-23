/*
    table [env]
    cado  // 이산화탄소
    nox //질소산화물
    udst // 초미세먼지
    source // 0-태양광 1- 남부발전 2- 화력발전
*/
const db = require('../lib/db');

const insertEnv = async(airsox, airnox, airdst) => {
    const sql = `UPDATE Env SET e_cado=?, e_nox=?, e_udst=? where e_source = 1`;
    const result = db.query(sql, [airsox, airnox, airdst]);
    return result;
}
const selectEnv = async() => {
    const sql = `SELECT * FROM Env order by e_source`
    const result = db.query(sql);
    console.log(result);
    return result;
}
module.exports ={insertEnv, selectEnv}
