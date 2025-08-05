import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import eventSheet0 from 'raw-loader!/assets/markedeventsheets/save-load/eventsheet0.md';
import eventSheet1 from 'raw-loader!/assets/markedeventsheets/save-load/eventsheet1.md';
import eventSheet2 from 'raw-loader!/assets/markedeventsheets/save-load/eventsheet2.md';

class CommandExecutor {
    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
    }

    set(config, eventSheetManager, eventSheet) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    }

    wait({ duration = 1000 } = {}, eventSheetManager, eventSheet) {
        var resumeCallback = eventSheetManager.pauseEventSheet();
        setTimeout(resumeCallback, duration);
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

var OnEnterEventSheet = function (title, groupName, eventSheetManager, eventSheet) {
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
    .startGroup()