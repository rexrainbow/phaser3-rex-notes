import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import content from 'raw-loader!/assets/markedeventsheet/repeat/repeat.md';

class CommandExecutor extends EventEmitter {
    print({ text = '' } = {}, manager) {
        console.log(text);
        this.wait({ duration: 1000 });
        return this;
        // Task will be running until 'complete' event fired
    }

    set(config, manager) {
        for (var name in config) {
            manager.setData(name, config[name]);
        }
    }

    wait({ duration = 1000 } = {}, manager) {
        var self = this;
        setTimeout(function () {
            self.complete();
        }, duration)
        return this;
    }

    complete() {
        this.emit('complete');
        return this;
    }
}
var commandExecutor = new CommandExecutor();

var manager = new MarkedEventSheets({
    commandExecutor: commandExecutor
});
manager.addEventSheet(content);
console.log(manager.dumpTrees())

manager.
    on('label.enter', function (title) {
        console.log(`Enter label '${title}'`)
    })
    .on('label.exit', function (title) {
        console.log(`Exit label '${title}'`)
    })

manager
    .setData('name', 'rex')
    .setData('coin', 1)
    .setData('hp', 4)
    .start()

console.log(manager.memory)
