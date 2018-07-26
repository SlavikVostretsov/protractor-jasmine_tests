const commonHelper = function(){

    this.waitUntilElementPresent = function (element) {
        browser.driver.wait(protractor.ExpectedConditions.presenceOf(element), 15000);
    };

    this.waitUntilElementVisible = function (element) {
        browser.driver.wait(protractor.ExpectedConditions.visibilityOf(element));
    };

    this.clearAllCookie = function () {
        browser.driver.manage().deleteAllCookies();
        browser.refresh();
    }
}

module.exports = new commonHelper;