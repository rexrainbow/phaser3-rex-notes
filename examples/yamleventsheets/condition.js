import YAMLEventSheets from '../../plugins/yamleventsheets.js';
import content from 'raw-loader!/assets/yamleventsheets/condition/condition.yml';

class CommandExecutor {
    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
    }

    set(config, eventSheetManager, eventSheet) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
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

eventSheetManager
    .on('complete', function () {
        console.log('..Execute events complete..')
    })
    .setData('coin', 8)
    .startGroup()

console.log(eventSheetManager.memory)
