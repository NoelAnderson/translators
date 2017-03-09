// var schema = require("c:/githome/translators/org.opent2t.sample.thermostat.superpopular/org.opent2t.sample.thermostat.superpopular");
// console.log(schema);

var test = require('ava');
var OpenT2T = require('opent2t').OpenT2T;
var OpenT2TLogger = require('opent2t').Logger;
var config = require('./testConfig');

var ConsoleLogger = new OpenT2TLogger("info");  
ConsoleLogger.verbose("Config:");
ConsoleLogger.verbose(JSON.stringify(config, null, 2));
var translatorPath = require('path').join(__dirname, '..');

///
/// Run a series of tests to validate the translator
///

// HubResURI
test.serial('GetPlatforms', t => {

    return OpenT2T.createTranslatorAsync(translatorPath, 'thingTranslator', config)
        .then(translator => {
            // TEST: translator is valid
            t.is(typeof translator, 'object') && t.truthy(translator);
            return OpenT2T.invokeMethodAsync(translator, 'org.opent2t.sample.hub.superpopular', 'getPlatforms', [])
                .then((hub) => {

                    ConsoleLogger.verbose("Hub:");
                    ConsoleLogger.verbose(JSON.stringify(hub, null, 2));

                    // TEST: something was returned
                    t.truthy(hub);

                    // TEST: hub has platforms
                    t.truthy(hub.platforms);
                    t.true(hub.platforms.length > 0);
                });
        });
});
