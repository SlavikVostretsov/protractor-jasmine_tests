const invalidCredentials = [{
    username: "amin",
    password: "12345",
    incorrectData: "username"
},{
    username: "admin",
    password: "123",
    incorrectData: "password"
}];

const messages = {
    welcomeMessage: "WELCOME :)",
    accessDeniedMessage: "ACCESS DENIED!",
    cookieMissingMessage: "THE SESSION COOKIE IS MISSING OR HAS A WRONG VALUE!"
}

module.exports = {
    invalidCredentials: invalidCredentials,
    messages: messages
}