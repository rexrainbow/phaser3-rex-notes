import YAMLEventSheets from '../../plugins/yamleventsheets.js';
import eventSheet0 from 'raw-loader!/assets/yamleventsheets/parallel/parallel0.yml';
import eventSheet1 from 'raw-loader!/assets/yamleventsheets/parallel/parallel1.yml';

class CommandExecutor {
    constructor({
        waitDuration = 1000
    } = {}) {

        this.defaultWaitDuration = waitDuration;
    }

    print({
        text = ''
    } = {}, eventSheetManager, eventSheet) {
        console.log(text);
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
var eventSheetManager = new YAMLEventSheets({
    commandExecutor: new CommandExecutor(),
});

eventSheetManager
    .addEventSheet(eventSheet0)
    .addEventSheet(eventSheet1);

console.log(eventSheetManager.dumpEventSheetGroup())

eventSheetManager
    .setData('coin', 10)
    .on('eventsheet.enter', function (title) {
        console.log(`..Enter event sheet '${title}'..`)
    })
    .on('eventsheet.exit', function (title) {
        console.log(`..Exit event sheet '${title}'..`)
    })
    .on('eventsheet.catch', function (title) {
        console.log(`..Fail event sheet '${title}'..`)
    })
    .on('complete', function () {
        console.log('..Execute events complete..')
    })
    .startGroup()

console.log(eventSheetManager.memory)
