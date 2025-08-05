import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import content from 'raw-loader!/assets/markedeventsheets/ignore-condition/ignore-condition.md';

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
})
    .addEventSheet(content)

console.log('Run event with condition')
eventSheetManager.startGroup()

console.log('Run event without condition')
eventSheetManager.start('Title')
