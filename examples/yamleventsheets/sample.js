import YAMLEventSheets from '../../plugins/yamleventsheets.js';
import Logger from '../../plugins/logic/eventsheets/diagnostics/logger/Logger.js';
import content from 'raw-loader!/assets/yamleventsheets/sample/sample.yml';

class CommandExecutor {
    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
        this.wait({ duration: 1000 }, eventSheetManager, eventSheet);
        // Task will be running until 'complete' event fired
    }

    set(config, eventSheetManager, eventSheet) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    }

    wait({ duration = 1000 } = {}, eventSheetManager, eventSheet) {
        var resumeCallback = eventSheetManager.pauseEventSheet();
        setTimeout(resumeCallback, duration);
        return this;
    }

    cmp({ opA, cmp, opB } = {}) {
        switch (cmp) {
            case '==': return opA == opB;
            case '!=': return opA != opB;
            case '>': return opA > opB;
            case '>=': return opA >= opB;
            case '<': return opA < opB;
            case '<=': return opA <= opB;
            default: return false;
        }
    }
}
var commandExecutor = new CommandExecutor();

var eventSheetManager = new YAMLEventSheets({
    commandExecutor: commandExecutor
});
eventSheetManager.addEventSheet(content);
console.log(eventSheetManager.dumpEventSheetGroup())

var logger = new Logger({
    manager: eventSheetManager,
    level: 'flow',
    format: 'compact'
});

eventSheetManager
    .setData('name', 'rex')
    .setData('coin', 1)
    .setData('hp', 4)
    .setData('randomInt', function (a, b) {
        // console.log('-- run custom method randomInt--')
        return Math.floor(a + Math.random() * (b - a + 1));
    })
    .on('complete', function (groupName) {
        console.log(`Group '${groupName}' complete`)
        eventSheetManager.removeAllEventSheets()
    })
    .startGroup()

// console.log(eventSheetManager.memory)
