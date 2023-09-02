function generateBalanceSheet() {
  let date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear() - 1;
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  let balanceSheet = [];
  while (month < currentMonth || year < currentYear) {
    balanceSheet.unshift({
      year,
      month: month + 1,
      profitOrLoss: generateRandomProfitOrLoss(),
      assetsValue: generateRandomAssetValue(),
    });
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
  }
  return balanceSheet;
}

function generateRandomProfitOrLoss() {
  return Math.floor(Math.random() * 200000 - 100000);
}

function generateRandomAssetValue() {
  return Math.floor(Math.random() * 50000);
}

module.exports = generateBalanceSheet;
