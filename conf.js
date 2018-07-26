exports.config = {
    specs: [
        './specs/*spec.js'
    ],
    chromeOnly: true,
    baseUrl: 'http://testing-ground.scraping.pro',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: false
    },

    frameworks: [
        'jasmine2',
        'jasmine-matchers'
    ],

    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true
    },

    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
  
        const AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function(done){
            browser.takeScreenshot().then(function (png) {
            allure.createAttachment('Screenshot', function () {
                return new Buffer(png, 'base64')
            }, 'image/png')();
            done();
            });
        });
 
        const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        const jasmineReporters = require('jasmine-reporters');

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            // savePath: 'C:/jenkins',
            savePath: './reports',
            filePrefix: 'xmloutput'
        }));

        jasmine.getEnv().addReporter(
            new SpecReporter({
                displayStacktrace: 'all',       // display stacktrace for each failed assertion, values: (all|specs|summary|none)
                displayFailuresSummary: true,   // display summary of all failures after execution
                displayPendingSummary: true,    // display summary of all pending specs after execution
                displaySuccessfulSpec: true,    // display each successful spec
                displayFailedSpec: true,        // display each failed spec
                displayPendingSpec: true,       // display each pending spec
                displaySpecDuration: true,      // display each spec duration
                displaySuiteNumber: true,       // display each suite number (hierarchical)
                colors: {
                    success: 'green',
                    failure: 'red',
                    pending: 'yellow'
                },
                prefixes: {
                    success: '✓ ',
                    failure: '✗ ',
                    pending: '* '
                },
                customProcessors: []
            }));
    },

    onCleanUp: function () {
    },
};
