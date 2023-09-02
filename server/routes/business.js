const router = require("express").Router;
const validator = require("validator");
const {
  OK_STATUS,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("../constants/statusCodes");
const { sanitize } = require("../utils/validation");
const isValidAccountingProvider = require("../constants/accountingProviders");
const generateBalanceSheet = require("../utils/accountingSoftware");
const dataStore = require("../database/store");
const { getLoanApplicationResult } = require("../utils/decisionEngine");
const businessRouter = router();

businessRouter.get("/", (req, res) => {
  res.status(OK_STATUS).send({
    success: true,
    message: "Welcome to business application.",
  });
});

businessRouter.post("/fetch-balance-sheet", (req, res) => {
  const {
    name,
    email,
    taxId,
    yearOfEstablishment,
    accountingProvider,
    amount,
  } = req.body;
  if (
    !name ||
    !email ||
    !taxId ||
    !yearOfEstablishment ||
    !accountingProvider ||
    !amount
  ) {
    let errorBody = sanitize({
      name: !name ? "Business name is required." : null,
      email: !email ? "Business email is required." : null,
      taxId: !taxId ? "TIN number is required." : null,
      yearOfEstablishment: !yearOfEstablishment
        ? "Establishment year is required."
        : null,
      accountingProvider: !accountingProvider
        ? "Accounting provider is required."
        : null,
      amount: !amount ? "Amount is required." : null,
    });
    return res.status(BAD_REQUEST).send({ success: false, error: errorBody });
  }
  if (!validator.isEmail(email)) {
    return res.status(BAD_REQUEST).send({
      success: false,
      error: {
        email: "Invalid email provided.",
      },
    });
  }
  if (!validator.isTaxID(taxId)) {
    return res.status(BAD_REQUEST).send({
      success: false,
      error: {
        taxId: "Invalid TIN Number provided.",
      },
    });
  }
  if(yearOfEstablishment > new Date().getFullYear()){
    return res.status(BAD_REQUEST).send({
      success: false,
      error: {
        accountingProvider: "Invalid YOE provided.",
      },
    });
  }
  if (!isValidAccountingProvider(accountingProvider)) {
    return res.status(BAD_REQUEST).send({
      success: false,
      error: {
        accountingProvider: "Invalid Accounting Provider.",
      },
    });
  }

  let balanceSheet = null;
  let businessDetails = dataStore.getBusinessDetails(taxId);
  if (businessDetails && businessDetails.balanceSheet) {
    balanceSheet = businessDetails.balanceSheet;
  } else {
    balanceSheet = generateBalanceSheet();
    dataStore.addBusinessDetails({
      taxId,
      name,
      yearOfEstablishment,
      balanceSheet,
    });
  }
  res.status(OK_STATUS).send({ success: true, balanceSheet });
});

businessRouter.post("/apply-loan", (req, res) => {
  const { taxId, loanAmount } = req.body;
  if (taxId && validator.isTaxID(taxId)) {
    let preAssessment = 20;
    let businessDetails = dataStore.getBusinessDetails(taxId);
    if (!businessDetails.balanceSheet) {
      return res.status(INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Balance sheet not found",
      });
    }

    let netProfit = 0,
      avgAssetValue = 0;
    for (let i = 0; i < businessDetails.balanceSheet.length; i++) {
      netProfit += businessDetails.balanceSheet[i].profitOrLoss;
      avgAssetValue += businessDetails.balanceSheet[i].assetsValue;
    }
    avgAssetValue /= businessDetails.balanceSheet.length;
    if (netProfit > 0) {
      preAssessment = 60;
    }
    if (avgAssetValue > loanAmount) {
      preAssessment = 100;
    }
    const isLoanApproved = getLoanApplicationResult({
      name: businessDetails.name,
      yearOfEstablishment: businessDetails.yearOfEstablishment,
      profitSummary: netProfit,
      preAssessment,
    });

    return res.status(200).send({
      success: true,
      isLoanApproved,
    });
  } else {
    return res.status(BAD_REQUEST).send({
      success: false,
      message: "Invalid tax ID provided.",
    });
  }
});

module.exports = businessRouter;
