import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import eventSheet0 from 'raw-loader!/assets/markedeventsheet/parallel-groups/parallel0.md';
import eventSheet1 from 'raw-loader!/assets/markedeventsheet/parallel-groups/parallel1.md';

class CommandExecutor extends EventEmitter {
    constructor({
        waitDuration = 1000
    } = {}) {
        super();

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

var eventSheetManager = new MarkedEventSheets({
    commandExecutor: new CommandExecutor(),
});

eventSheetManager
    .addEventSheet(eventSheet0, 'main')
    .addEventSheet(eventSheet1, 'service')
    .on('complete', function(groupName){
        console.log(`Group '${groupName}' complete`)
    })

console.log(eventSheetManager.dumpEventSheetGroup('main'))
console.log(eventSheetManager.dumpEventSheetGroup('service'))

eventSheetManager.startGroup('main')

setTimeout(function () {
    eventSheetManager.startGroup('service')
}, 1000);
