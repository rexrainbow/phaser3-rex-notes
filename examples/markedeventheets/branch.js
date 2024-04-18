import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import beforeEventSheet from 'raw-loader!/assets/markedeventsheet/branch/0.before.md';
import ifAEventSheet from 'raw-loader!/assets/markedeventsheet/branch/1.if-a.md';
import ifBEventSheet from 'raw-loader!/assets/markedeventsheet/branch/2.if-b.md';
import elseEventSheet from 'raw-loader!/assets/markedeventsheet/branch/3.else.md';
import afterEventSheet from 'raw-loader!/assets/markedeventsheet/branch/4.after.md';

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

var eventSheetManager = new MarkedEventSheets({
    commandExecutor: new CommandExecutor(),
    // parallel: true
});

eventSheetManager
    .addEventSheet(beforeEventSheet)
    .addEventSheet(ifAEventSheet)
    .addEventSheet(ifBEventSheet)
    .addEventSheet(elseEventSheet)
    .addEventSheet(afterEventSheet)

console.log(eventSheetManager.dumpEventSheetGroup())

eventSheetManager
    .setData('coin', 8)
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
