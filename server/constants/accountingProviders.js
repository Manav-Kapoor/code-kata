const accountingProviders = ["Xero", "MYOB"];

function isValidAccountingProvider(acc) {
  let idx = accountingProviders.findIndex((el) => el === acc);
  if (idx === -1) {
    return false;
  }
  return true;
}

module.exports = isValidAccountingProvider;
