import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import TaskventSheet from 'raw-loader!/assets/markedeventsheet/active/task.md';
import DeactivateEventSheet from 'raw-loader!/assets/markedeventsheet/active/deactivate.md';


class CommandExecutor {
    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
        this.wait({ duration: 1000 }, eventSheetManager, eventSheet);
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
    .addEventSheet(TaskventSheet)
    .addEventSheet(DeactivateEventSheet)

console.log(eventSheetManager.dumpEventSheetGroup())

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


