import YAMLEventSheets from '../../plugins/yamleventsheets.js';
import content from 'raw-loader!/assets/yamleventsheets/for/for.yml';

class CommandExecutor {
    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
        this.wait({ duration: 1000 }, eventSheetManager, eventSheet);
        // Task will be running until 'complete' event fired
    }

    set(config, eventSheetManager, eventSheet) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    }

    wait({
        duration = this.defaultWaitDuration
    } = {}, eventSheetManager, eventSheet) {

        var resumeCallback = eventSheetManager.pauseEventSheet();
        setTimeout(resumeCallback, duration);
        return this;
    }
}
var commandExecutor = new CommandExecutor();

var eventSheetManager = new YAMLEventSheets({
    commandExecutor: commandExecutor
});
eventSheetManager.addEventSheet(content);
console.log(eventSheetManager.dumpEventSheetGroup())

eventSheetManager
    .on('complete', function () {
        console.log('..Execute events complete..')
    })
    .setData('name', 'rex')
    .setData('coin', 1)
    .setData('hp', 4)
    .startGroup()

console.log(eventSheetManager.memory)
