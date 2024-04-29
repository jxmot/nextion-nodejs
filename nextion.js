function nextion(portstr, _log = null) {
    
    const log = (msg) => {
        if(_log !== null) _log(msg);
    };
    
    // for serial communications with the nextion...
    const SerialPort = require('serialport');

    // OS/platform specific
    // TODO: contain within a cfg file
    const serport = new SerialPort(portstr, {baudRate: 9600});

    // Public Data
    nextion = {
    };

    // create the required nextion delimiter
    nextion.tail = Buffer.from([0xff,0xff,0xff]);

    nextion.sendCmd = (command, out = serport) => {
        // combine to create the full nextion command
        const output = Buffer.concat([command, nextion.tail],command.length+nextion.tail.length);
        // send it...
        out.write(output, function(err) {
            if(err) {
                log('Error on write: ', err.message);
            } else log('message written');
        });
    };

    nextion.updateRTC = () => {
        const today = new Date();
        // correct for 0 = January
        const mon = today.getMonth() + 1;
        const todCommands = [
            [Buffer.from('rtc0='),Buffer.from(today.getFullYear().toString())],     // year
            [Buffer.from('rtc1='),Buffer.from(mon.toString())],                     // mon
            [Buffer.from('rtc2='),Buffer.from(today.getDate().toString())],         // day
            [Buffer.from('rtc3='),Buffer.from(today.getHours().toString())],        // hour
            [Buffer.from('rtc4='),Buffer.from(today.getMinutes().toString())],      // mins
            [Buffer.from('rtc5='),Buffer.from(today.getSeconds().toString())],      // secs
        ];
        todCommands.forEach((cmd,idx) => {
            const command = Buffer.concat([cmd[0], cmd[1]],cmd[0].length+cmd[1].length);
            nextion.sendCmd(command);
        });
    }
    return nextion;
}

module.exports = nextion;

