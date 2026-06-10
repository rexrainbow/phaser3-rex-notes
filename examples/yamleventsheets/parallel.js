import YAMLEventSheets from '../../plugins/yamleventsheets.js';
import Logger from '../../plugins/logic/eventsheets/diagnostics/logger/Logger.js';
import eventSheet0 from 'raw-loader!/assets/yamleventsheets/parallel/parallel0.yml';
import eventSheet1 from 'raw-loader!/assets/yamleventsheets/parallel/parallel1.yml';

class CommandExecutor {
    constructor({
        waitDuration = 1000
    } = {}) {

        this.defaultWaitDuration = waitDuration;
    }

    print({
        text = ''
    } = {}, eventSheetManager, eventSheet) {
        console.log(text);
    }

    set(config, eventSheetManager, eventSheet) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    }

    wait({
        duration = this.defaultWaitDuration
    } = {}, eventSheetManager, eventSheet) {

        var resumeCallback = eventSheetManager.pauseEventSheet();
        setTimeout(resumeCallback, duration);
        return this;
    }
}
var eventSheetManager = new YAMLEventSheets({
    commandExecutor: new CommandExecutor(),
});

eventSheetManager
    .addEventSheet(eventSheet0)
    .addEventSheet(eventSheet1);

console.log(eventSheetManager.dumpEventSheetGroup())

var logger = new Logger({
    manager: eventSheetManager,
    level: 'flow',
    format: 'compact'
});

eventSheetManager
    .setData('coin', 10)
    .startGroup()

// console.log(eventSheetManager.memory)
