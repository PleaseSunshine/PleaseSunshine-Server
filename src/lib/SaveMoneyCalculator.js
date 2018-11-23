const pannelInfo = require("../models/pannelInfo")

const perBilling = {
  watt100: 60.7,
  watt200: 125.9,
  watt300: 187.9,
  watt400: 280.6,
  watt500: 417.7,
  wattover: 709.5
};

const baseBilling = {
  watt100: 410,
  watt200: 910,
  watt300: 1600,
  watt400: 3850,
  watt500: 7300,
  wattover: 12940
};

const getBillingSection = (money) => {
  if(money < 6480) return 'watt100';
  if((money >= 13500) && (money <= 26090)) return 'watt200';
  if((money >= 39180) && (money <= 57980)) return 'watt300';
  if((money >= 88030) && (money <= 116090)) return 'watt400';
  if((money >= 174380) && (money <= 216150)) return 'watt500';
  if(money >= 216150) return 'wattover';
  return 'invalid section';
};

const calWattFromMoney = (money) => {
  const userSection = getBillingSection(money);
  if(userSection === 'invalid section') return 'invalid';

  return ((money - baseBilling[userSection]) / perBilling[userSection]).toFixed(1);
};

const getSectionIndex = (watt) => {
  if(watt > 500) return 'wattover';
  const index = Math.ceil(watt/100) * 100;
  return 'watt'+index;
};

const calMoneyFromWatt = (watt) => {
  const sectionIndex = getSectionIndex(watt);
  return (baseBilling[sectionIndex] + perBilling[sectionIndex]*watt).toFixed(0);
};

const calSavedMoney = (money, generatorWatt) => {
  const originWatt = calWattFromMoney(money);
  if(originWatt === 'invalid') return -1; // -1받으면 잘못된 입력이라고 프론트에서 메세지 띄워줘야함.
  const monthlyGenerating = (generatorWatt * 3.6 * 30) / 1000;
  const afterMoney = calMoneyFromWatt(originWatt - monthlyGenerating);
  return money - afterMoney;
};

const calBePoint = (savedMoney, installCostAvg)=>{
  const m_savedMoney = Math.floor((savedMoney / 12));
  return (installCostAvg/m_savedMoney).toFixed(1);
}


module.exports = {calSavedMoney, calBePoint};