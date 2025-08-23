import YAMLEventSheets from '../../plugins/yamleventsheets.js';
import content from 'raw-loader!/assets/yamleventsheets/break/break.yml';

class CommandExecutor {
    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
    }

    set(config, eventSheetManager, eventSheet) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
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
