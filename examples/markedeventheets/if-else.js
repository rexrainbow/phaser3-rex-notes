import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import content from 'raw-loader!/assets/markedeventsheets/if-else/if-else.md';

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

var eventSheetManager = new MarkedEventSheets({
    commandExecutor: commandExecutor
});
eventSheetManager.addEventSheet(content);
console.log(eventSheetManager.dumpEventSheetGroup())

eventSheetManager.startGroup()

console.log(eventSheetManager.memory)
