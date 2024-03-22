import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import eventSheet0 from 'raw-loader!/assets/markedeventsheet/save-load/eventsheet0.md';
import eventSheet1 from 'raw-loader!/assets/markedeventsheet/save-load/eventsheet1.md';
import eventSheet2 from 'raw-loader!/assets/markedeventsheet/save-load/eventsheet2.md';

class CommandExecutor extends EventEmitter {
    print({ text = '' } = {}, eventSheetManager, tree) {
        console.log(text);
        // return this;
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
    .addEventSheet(eventSheet0)
    .addEventSheet(eventSheet1)
    .addEventSheet(eventSheet2)

var OnEnterEventSheet = function (title, groupName, eventSheetManager, tree) {
    console.log(`eventsheet.enter: '${title}'`);

    if (title !== 'Event sheet 1') {
        eventSheetManager.once('eventsheet.enter', OnEnterEventSheet)
        return;
    }

    // Save state at 'eventsheet.enter' of 'Event sheet 1'
    var stateData = eventSheetManager.dumpState();
    console.log(stateData);
    console.log('===save state===')

    setTimeout(function () {
        console.log('===load state===')
        eventSheetManager.loadState(stateData);
    }, 2500)
}

eventSheetManager.once('eventsheet.enter', OnEnterEventSheet)

eventSheetManager
    .setData('金幣', 1)
    .setData('hp', 4)
    .start()