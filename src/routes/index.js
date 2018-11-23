const express = require('express');
const router = express.Router();
const simulation = require('./simulation');
const company = require( './company' ) ;
const panel = require( './panel' ) ;


router.use("/", simulation);

//	company 관련
router.use( '/company' , company ) ;
//	panel 관련
router.use( '/panel' , panel ) ;

module.exports = router;


/*
튜토리얼- 첫 사용인지 확인 /isFirst
module - 공공데이터 가져오기 (한달에 한번씩 ) - module/kospo 
여기에서 계산하기 - /simulation/energy
환경 - /simulation/environment
비용 - /simulation/cost
*/