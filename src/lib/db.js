const mysql = require('promise-mysql')
const dbConfig= require("../../config/database")


var DBpool
const getPool = () => {
    if (!DBpool) {
      DBpool = mysql.createPool(dbConfig)
      return DBpool
    }
    return DBpool
  
  }
const query = async (...args) => {
    const query = args[0]
    const data = args[1]
    const pool = getPool()
    let connection = await pool.getConnection()
    let result = await connection.query(query, data)

    connection.release()
    return result
}
const transaction = async (...args) => {
    let result = "Success"

    let connection

    try{
      const pool = getPool()
      connection = await pool.getConnection()
      await connection.beginTransaction()

      await args[0](connection, ...args)
      await connection.commit()
    }
    catch(err){
      await connection.rollback()
      console.log("mysql error : " + error)
      result = undefined
    }
    finally {
      connection.release()
      return result
    }
}
module.exports={getPool,query,transaction}