import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import content from 'raw-loader!/assets/markedeventsheet/if-else/if-else.md';

class CommandExecutor extends EventEmitter {
    print({ text = '' } = {}, eventSheetManager, tree) {
        console.log(text);
    }

    set(config, eventSheetManager, tree) {
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
console.log(eventSheetManager.dumpTrees())

eventSheetManager.start()

console.log(eventSheetManager.memory)
