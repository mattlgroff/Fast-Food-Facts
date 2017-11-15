module.exports = {
  caloriesFromFat: totalFat => parseInt(totalFat) * 9,
  percentDailyTotalFat: totalFat => Math.round(parseFloat(parseInt(totalFat) / 64) * 100),
  percentDailySatFat: satFat => Math.round(parseFloat(parseInt(satFat) / 20) * 100),
  percentDailyChol: chol => Math.round(parseFloat(parseInt(chol) / 300) * 100),
  percentDailySodium: sodium => Math.round(parseFloat(parseInt(sodium) / 2400) * 100),
  percentDailyTotalCarb: totalCarb => Math.round(parseFloat(parseInt(totalCarb) / 300) * 100),
  percentDailyDietaryFiber: dietaryFiber => Math.round(parseFloat(parseInt(dietaryFiber) / 25) * 100)
}