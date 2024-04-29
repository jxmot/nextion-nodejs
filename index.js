// get the module...
const Log = require('simple-text-log');
const logOut = new Log(require('./runlogopt.js'));
const path = require('path');
const scriptName = path.basename(__filename);
function log(payload) {
    logOut.writeTS(`${scriptName} - ${payload}`);
};


const nextion = require ('./nextion.js')('COM4', log);
nextion.updateRTC();

