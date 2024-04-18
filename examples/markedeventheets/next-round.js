import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import MainEventSheet from 'raw-loader!/assets/markedeventsheet/next-round/main.md';
import TaskEventSheet from 'raw-loader!/assets/markedeventsheet/next-round/task.md';
import TestRoundCounterEventSheet from 'raw-loader!/assets/markedeventsheet/next-round/round-counter.md';

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
    .addEventSheet(MainEventSheet)
    .addEventSheet(TaskEventSheet)
    .addEventSheet(TestRoundCounterEventSheet)

console.log(eventSheetManager.dumpEventSheetGroup())

eventSheetManager.setData('coin', 3)
console.log(eventSheetManager.memory)

eventSheetManager.on('complete', function () {
    if (eventSheetManager.$roundCounter < 10) {
        // Run next round
        eventSheetManager.updateRoundCounter();
        console.log(`---- Round : ${eventSheetManager.$roundCounter} ----`)
        eventSheetManager.startGroup();
    }
})

eventSheetManager.startGroup()


