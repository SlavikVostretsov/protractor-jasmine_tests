const loginPage = require("../pages/loginPage");
const helpers = require("../helpers");
const invalidCredentials = require("./test-data/login-parameters").invalidCredentials;

describe("Login", function(){

    beforeEach(function(){
        loginPage.open();
    });

    it("should login with valid credentials", function(){
        loginPage.login("admin", "12345");
        expect(loginPage.getMessageText()).toBe("WELCOME :)");    
    });

    invalidCredentials.forEach(function (data){
        it(`should not login with invalid ${data.incorrectData}`, function(){
            loginPage.login(data.username, data.password);
            expect(loginPage.getMessageText()).toBe("ACCESS DENIED!");    
        });
    });

    it("user should login with valid credentials through http request", async function(){
        let loginInfo = await loginPage.loginThroughHttp("admin", "12345");
        expect(loginInfo.code).toBe(200);   
        expect(loginInfo.message).toBe("WELCOME :)");     
    });

    invalidCredentials.forEach(function (data){
        it(`user should not login with invalid ${data.incorrectData} through http request`, async function(){
            let loginInfo = await loginPage.loginThroughHttp(data.username, data.password);
            expect(loginInfo.code).toBe(200);   
            expect(loginInfo.message).toBe("ACCESS DENIED!");   
        });
    });

    it("user should not be logged without properly stored cookie", function(){
        loginPage.login("admin", "12345");
        helpers.clearAllCookie();
        expect(loginPage.getMessageText()).toBe("THE SESSION COOKIE IS MISSING OR HAS A WRONG VALUE!");   
    });
});