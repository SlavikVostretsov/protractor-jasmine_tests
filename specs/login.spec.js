const loginPage = require("../pages/loginPage");
const helpers = require("../helpers");
const invalidCredentials = require("./test-data/login-parameters").invalidCredentials;
const username = browser.params.credentials.username;
const password = browser.params.credentials.password;
const message = require("./test-data/login-parameters").messages;

describe("Login", function(){

    beforeEach(function(){
        loginPage.open();
    });

    it("should login with valid credentials", function(){
        loginPage.login(username, password);
        expect(loginPage.getMessageText()).toBe(message.welcomeMessage);    
    });

    invalidCredentials.forEach(function (data){
        it(`should not login with invalid ${data.incorrectData}`, function(){
            loginPage.login(data.username, data.password);
            expect(loginPage.getMessageText()).toBe(message.accessDeniedMessage);    
        });
    });

    it("user should login with valid credentials through http request", async function(){
        let loginInfo = await loginPage.loginThroughHttp(username, password);
        expect(loginInfo.code).toBe(200);   
        expect(loginInfo.message).toBe(message.welcomeMessage);     
    });

    invalidCredentials.forEach(function (data){
        it(`user should not login with invalid ${data.incorrectData} through http request`, async function(){
            let loginInfo = await loginPage.loginThroughHttp(data.username, data.password);
            expect(loginInfo.code).toBe(200);   
            expect(loginInfo.message).toBe(message.accessDeniedMessage);   
        });
    });

    it("user should not be logged without properly stored cookie", function(){
        loginPage.login(username, password);
        helpers.clearAllCookie();
        expect(loginPage.getMessageText()).toBe(message.cookieMissingMessage);   
    });
});