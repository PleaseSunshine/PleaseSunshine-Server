const express = require('express');
const router = express.Router();
const simulation = require('./simulation');
const company = require( './company' ) ;
const panel = require( './panel' ) ;

//  simulation 관련
router.use("/", simulation);
//	company 관련
router.use( '/company' , company ) ;
//	panel 관련
router.use( '/panel' , panel ) ;

module.exports = router;
