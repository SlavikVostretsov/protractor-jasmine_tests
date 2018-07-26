const request = require("request-promise-native");
const cheerio = require("cheerio");
const helper = require("../helpers");

function loginPage() {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    const usernameField = $("#usr");
    const passwordField = $("#pwd");
    const loginButton = $("input[type='submit']");
    const messageText = $("#case_login h3");
 
    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.open = function(){
        browser.get(browser.baseUrl + "/login");
        return this;
    };

    this.login = function(username, password) {
        usernameField.sendKeys(username);
        passwordField.sendKeys(password);
        loginButton.click();
        return this;
    };

    this.getMessageText = function() {
        helper.waitUntilElementPresent(messageText);
        return messageText.getText();
    };

    this.loginThroughHttp = function (username, password){
        let options = { 
            method: "POST", 
            uri: "http://testing-ground.scraping.pro/login?mode=login", 
            form: { usr: username, pwd: password},
            followAllRedirects: true,
            timeout: 30000,
            resolveWithFullResponse: true,
            jar: true
        };
        return request(options).then(function (resp) { 
            let $ = cheerio.load(resp.body);
            return {
                code: resp.statusCode,
                message: $("#case_login h3").text()
            }
            
        });

    }
}

module.exports = new loginPage;

