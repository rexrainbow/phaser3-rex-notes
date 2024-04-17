import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import content from 'raw-loader!/assets/markedeventsheet/ignore-condition/ignore-condition.md';

class CommandExecutor extends EventEmitter {
    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
        this.wait({ duration: 1000 });
        return this;
        // Task will be running until 'complete' event fired
    }

    set(config, eventSheetManager, eventSheet) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    }

    wait({ duration = 1000 } = {}, eventSheetManager, eventSheet) {
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

var eventSheetManager = new MarkedEventSheets({
    commandExecutor: commandExecutor
})
    .addEventSheet(content)

console.log('Run event with condition')
eventSheetManager.startGroup()

console.log('Run event without condition')
eventSheetManager.start('Title')
