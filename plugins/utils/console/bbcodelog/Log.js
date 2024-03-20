import BBCodeLog from './BBCodeLog.js';

var bbCodeLog = new BBCodeLog();
var log = function (s, logType = 'log') {
    bbCodeLog.log(s, logType);
}

export default log;