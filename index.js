const Log = require('simple-text-log');
const logOut = new Log(require('./runlogopt.js'));
function log(payload) {
    logOut.writeTS(`${payload}`);
};

const nextion = require ('./nextion.js')('COM4', log);
nextion.updateRTC();

// Events
const EventEmitter = require('events');
const evts = new EventEmitter();

const cfg = require('./wxsvc/cfg/wxsvc-cfg.js');
const wsvc = require('./wxsvc/'+cfg.api);
wsvc.init(evts, log);

evts.on('WSVC_UPDATE', (m) => {
    log(`WSVC_UPDATE : ${JSON.stringify(m)}`);
    nextion.sendCmdStr(`currtemp.txt="${Math.round(m.temp)}"`);
    nextion.sendCmdStr(`currhum.txt="${Math.round(m.humd)}"`);
    nextion.sendCmdStr(`tstamp.txt="${m.text.tstamp}"`);
    nextion.sendCmdStr(`windmsg.txt="${m.text.wmsg}"`);
});

evts.on('WSVC_FORCST', (m) => {
    log(`WSVC_FORCST : ${JSON.stringify(m)}`);
});

evts.emit('WSVC_START');
