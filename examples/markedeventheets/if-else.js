import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import content from 'raw-loader!/assets/markedeventsheet/if-else/if-else.md';

class CommandExecutor extends EventEmitter {
    print({ text = '' } = {}, manager) {
        console.log(text);
    }

    set(config, manager) {
        for (var name in config) {
            manager.setData(name, config[name]);
        }
    }
}
var commandExecutor = new CommandExecutor();

var manager = new MarkedEventSheets({
    commandExecutor: commandExecutor
});
manager.addEventSheet(content);
console.log(manager.dumpTrees())

manager.start()

console.log(manager.memory)
