const db = require('../lib/db');

const selectMinSunshine = async(slat, slon) => {
    const sql = `SELECT dis.sunshine FROM (SELECT lat, lon, SQRT(
        POW(69.1 * (lat - ?), 2) +
        POW(69.1 * (?  - lon) * COS(lat / 57.3), 2)) AS distance, sunshine
    FROM BusanSun ORDER BY distance) as dis limit 1`;
    const result = db.query(sql, [slat, slon]);

    return result;
}
module.exports ={selectMinSunshine}
