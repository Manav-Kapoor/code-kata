function getLoanApplicationResult(businessDetails) {
  if (businessDetails.preAssessment >= 60) {
    return true;
  }
  return false;
}

module.exports = { getLoanApplicationResult };
