import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import eventSheet0 from 'raw-loader!/assets/markedeventsheet/parallel/parallel0.md';
import eventSheet1 from 'raw-loader!/assets/markedeventsheet/parallel/parallel1.md';

class CommandExecutor extends EventEmitter {
    constructor({
        waitDuration = 1000
    } = {}) {
        super();

        this.defaultWaitDuration = waitDuration;
    }

    print({
        text = ''
    } = {}, eventSheetManager) {
        console.log(text);
    }

    set(config, eventSheetManager) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    }

    wait({
        duration = this.defaultWaitDuration
    } = {}, eventSheetManager) {
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
    .addEventSheet(eventSheet0)
    .addEventSheet(eventSheet1);

console.log(eventSheetManager.dumpTrees())

eventSheetManager
    .setData('coin', 10)
    .on('eventsheet.enter', function (title) {
        console.log(`..Enter event sheet '${title}'..`)
    })
    .on('eventsheet.exit', function (title) {
        console.log(`..Exit event sheet '${title}'..`)
    })
    .on('eventsheet.catch', function (title) {
        console.log(`..Fail event sheet '${title}'..`)
    })
    .on('complete', function () {
        console.log('..Execute events complete..')
    })
    .start()

console.log(eventSheetManager.memory)
