import BBCodeLog from './BBCodeLog';

var bbCodeLog = new BBCodeLog();
var log = function(s?: any, logType = 'log') {
    bbCodeLog.log(s, logType);
}

export default log;