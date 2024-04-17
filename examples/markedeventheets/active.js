import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import TaskventSheet from 'raw-loader!/assets/markedeventsheet/active/task.md';
import DeactivateEventSheet from 'raw-loader!/assets/markedeventsheet/active/deactivate.md';


class CommandExecutor extends EventEmitter {
    print({ text = '' } = {}, eventSheetManager, tree) {
        console.log(text);
        this.wait({ duration: 1000 });
        return this;
        // Task will be running until 'complete' event fired
    }

    set(config, eventSheetManager, tree) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    }

    wait({ duration = 1000 } = {}, eventSheetManager, tree) {
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
    .addEventSheet(TaskventSheet)
    .addEventSheet(DeactivateEventSheet)

console.log(eventSheetManager.dumpTrees())

console.log(eventSheetManager.memory)

eventSheetManager.on('complete', function () {
    if (eventSheetManager.$roundCounter < 10) {
        // Run next round
        eventSheetManager.updateRoundCounter();
        console.log(`---- Round : ${eventSheetManager.$roundCounter} ----`)

        if (eventSheetManager.$roundCounter === 3) {
            eventSheetManager.setEventSheetActiveState('Task');
        }

        eventSheetManager.startGroup()
    }
})

eventSheetManager.startGroup()


