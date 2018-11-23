const multer = require('multer');
const multerS3 = require('multer-s3');
const moment = require('moment')
const aws = require('aws-sdk');
const config  = require('../config/s3');
aws.config.loadFromPath('./config/s3.json');
const s3 = new aws.S3({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
});

module.exports = {
    getMulter: function (package) {
        const date = {
            YYYY: moment().format('YYYY'),
            MM: moment().format('MM'),
            DD: moment().format('DD')
        }
        return multer({
            storage: multerS3({
                s3: s3,
                bucket: 'cjimage2',
                acl: 'public-read',
                key: function (req, file, cb) {
                    cb(null, `${package}/${date.YYYY}.${date.MM}.${date.DD}/${file.originalname}`)
                }
            })
        })
    } 
}

// const params = {
//     s3: s3,
//     Bucket: 'cjimg', 
//     acl: 'public-read',
//     key: function (req, file, cb) {
//         cb(null, `${package}/${date.YYYY}/${date.MM}/${date.DD}/${file.originalname}`)
//     },
//     Body: JSON.stringify(data, null, 2)
// };
// s3.upload(params, function(s3Err, data) {
//     if (s3Err) throw s3Err
//     console.log(`File uploaded successfully at ${data.Location}`)
// });


// uploadFile();