import YAMLEventSheets from '../../plugins/yamleventsheets.js';
import { Logger, BBCodeSink } from '../../plugins/yamleventsheets.js';
import TaskventSheet from 'raw-loader!/assets/yamleventsheets/rounds/task.yml';


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

    inc(config, eventSheetManager, eventSheet) {
        for (var name in config) {
            eventSheetManager.incData(name, config[name]);
        }
    }

    wait({ duration = 1000 } = {}, eventSheetManager, eventSheet) {
        var resumeCallback = eventSheetManager.pauseEventSheet();
        setTimeout(resumeCallback, duration);
        return this;
    }
}
var commandExecutor = new CommandExecutor();

var eventSheetManager = new YAMLEventSheets({
    commandExecutor: commandExecutor
});
eventSheetManager
    .addEventSheet(TaskventSheet)

console.log(eventSheetManager.dumpEventSheetGroup())

var logger = new Logger({
    manager: eventSheetManager,
    level: 'flow',
    format: 'bbcode',
    sink: new BBCodeSink()
});

eventSheetManager.on('complete', function () {
    if (eventSheetManager.$roundCounter < 10) {
        // Run next round
        eventSheetManager.updateRoundCounter();

        eventSheetManager.startGroup()
    }
})

eventSheetManager.startGroup()
