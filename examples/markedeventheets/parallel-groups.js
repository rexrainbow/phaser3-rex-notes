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

    print(
        {
            text = ''
        } = {},
        eventSheetManager
    ) {

        console.log(text);
    }

    wait(
        {
            duration = this.defaultWaitDuration
        } = {},
        eventSheetManager
    ) {

        var self = this;
        setTimeout(function () {
            self.complete();
        }, duration)
        return this;
    }

    complete() {
        console.log('Executor fires complete event')
        this.emit('complete');
        return this;
    }
}

var eventSheetManager = new MarkedEventSheets({
    commandExecutor: new CommandExecutor(),
});

eventSheetManager
    .addEventSheet(eventSheet0, 'task0')
    .addEventSheet(eventSheet1, 'task1')
    .on('complete', function (groupName) {
        console.log(`Group '${groupName}' complete`)
    })

console.log(eventSheetManager.dumpEventSheetGroup('task0'))
console.log(eventSheetManager.dumpEventSheetGroup('task1'))

eventSheetManager.startGroup('task0')

setTimeout(function () {
    eventSheetManager.startGroup('task1')
}, 1000);
