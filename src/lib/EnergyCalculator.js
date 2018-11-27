const efficiency = {
  angle0: 5,
  angle10: 7,
  angle20: 10,
  angle30: 23,
  angle40: 35,
  angle50: 46,
  angle60: 55,
  angle70: 64,
  angle80: 72,
  angle90: 80,
  angle100: 85,
  angle110: 89,
  angle120: 92,
  angle130: 95,
  angle140: 98,
  angle150: 99,
  angle160: 100,
  angle170: 100,
  angle180: 99,
  angle190: 97,
  angle200: 95,
  angle210: 92,
  angle220: 89,
  angle230: 85,
  angle240: 80,
  angle250: 81,
  angle260: 72,
  angle270: 67,
  angle280: 60,
  angle290: 52,
  angle300: 43,
  angle310: 32,
  angle320: 21,
  angle330: 10,
  angle340: 7,
  angle350: 5,
};
const calE = (energy, angle) => {
  const upperAngle = Math.ceil(angle/10)*10;
  const lowerAngle = Math.floor(angle/10)*10;
  const indexUpper = 'angle'+upperAngle;
  const indexLower = 'angle'+lowerAngle;
  const upperEfficiency = efficiency[indexUpper];
  const lowerEfficiency = efficiency[indexLower];
  const userEfficiency = lowerEfficiency + (upperEfficiency - lowerEfficiency) * ((angle - lowerAngle) / 10);

  return  (energy * (userEfficiency / 100)).toFixed(2);
}
module.exports = calE;