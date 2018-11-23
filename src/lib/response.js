const moment = require('moment');

const respondJson = (message, result, res, status) => {
  console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} => message : ${message} / status : ${status}`)
  res.status(status)
    .json({
      message,
      data: (result) ? result : {}
    });
}

const respondOnError = (message, res, status) => {
  console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} => message : ${message} / status : ${status}`)
  res.status(status)
    .json({
      message
    });
}
  
module.exports = {  respondJson, respondOnError}