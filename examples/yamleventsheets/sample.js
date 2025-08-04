import YAMLEventSheets from '../../plugins/logic/eventsheets/yamleventsheets/YAMLEventSheets.js';
import content from 'raw-loader!/assets/yamleventsheets/sample/sample.yml';

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
eventSheetManager.addEventSheet(content);
console.log(eventSheetManager.dumpEventSheetGroup())

// eventSheetManager.
//     on('label.enter', function (title) {
//         console.log(`Enter label '${title}'`)
//     })
//     .on('label.exit', function (title) {
//         console.log(`Exit label '${title}'`)
//     })

eventSheetManager
    .setData('name', 'rex')
    .setData('coin', 1)
    .setData('hp', 4)
    .setData('randomInt', function (a, b) {
        console.log('-- run custom method randomInt--')
        return Math.floor(a + Math.random() * (b - a + 1));
    })
    .on('complete', function () {
        console.log('..Execute events complete..')
    })
    .startGroup()

console.log(eventSheetManager.memory)
