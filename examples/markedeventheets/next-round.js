import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import MainEventSheet from 'raw-loader!/assets/markedeventsheet/next-round/main.md';
import TaskEventSheet from 'raw-loader!/assets/markedeventsheet/next-round/task.md';
import TestRoundCounterEventSheet from 'raw-loader!/assets/markedeventsheet/next-round/round-counter.md';


class CommandExecutor extends EventEmitter {
    print({ text = '' } = {}, eventSheetManager) {
        console.log(text);
        this.wait({ duration: 1000 });
        return this;
        // Task will be running until 'complete' event fired
    }

    set(config, eventSheetManager) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    }

    wait({ duration = 1000 } = {}, eventSheetManager) {
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
});
eventSheetManager
    .addEventSheet(MainEventSheet)
    .addEventSheet(TaskEventSheet)
    .addEventSheet(TestRoundCounterEventSheet)

console.log(eventSheetManager.dumpTrees())

eventSheetManager.setData('coin', 3)
console.log(eventSheetManager.memory)

eventSheetManager.on('complete', function () {
    if (eventSheetManager.$roundCounter < 10) {
        // Run next round
        eventSheetManager.updateRoundCounter();
        console.log(`---- Round : ${eventSheetManager.$roundCounter} ----`)
        eventSheetManager.start();
    }
})

eventSheetManager.start()


