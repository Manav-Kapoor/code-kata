class Store {
  businessDetails = {};

  addBusinessDetails(business) {
    if (business.taxId) {
      this.businessDetails[business.taxId] = {
        name: business.name,
        yearOfEstablishment: business.yearOfEstablishment,
        balanceSheet: business.balanceSheet,
      };
    }
  }

  getBusinessDetails(taxId) {
    if (taxId) {
      return this.businessDetails[taxId] || {};
    }
  }

  getAllBusinesses() {
    return this.businessDetails;
  }
}

let dataStore = new Store();
module.exports = dataStore;
