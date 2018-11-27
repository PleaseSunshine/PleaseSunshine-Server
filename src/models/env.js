/*
    table [env]
*/
const db = require('../lib/db');

const insertEnv = async(airsox, airnox, airdst) => {
    const sql = `UPDATE Environment SET e_cado=?, e_nox=?, e_udst=? where e_source = 1`;
    const result = db.query(sql, [airsox, airnox, airdst]);

    return result;
}
const selectEnv = async() => {
    const sql = `SELECT * FROM Environment order by e_source`
    const result = db.query(sql);
    
    return result;
}
module.exports ={insertEnv, selectEnv}
