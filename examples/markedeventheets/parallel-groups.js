import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import eventSheet0 from 'raw-loader!/assets/markedeventsheets/parallel-groups/parallel0.md';
import eventSheet1 from 'raw-loader!/assets/markedeventsheets/parallel-groups/parallel1.md';

class CommandExecutor {
    constructor({
        waitDuration = 1000
    } = {}) {        
        this.defaultWaitDuration = waitDuration;
    }

    print(
        {
            text = ''
        } = {},
        eventSheetManager, eventSheet
    ) {

        console.log(text);
    }

    wait(
        {
            duration = this.defaultWaitDuration
        } = {},
        eventSheetManager, eventSheet
    ) {

        var resumeCallback = eventSheetManager.pauseEventSheet();
        setTimeout(resumeCallback, duration);
    }
}

var eventSheetManager = new MarkedEventSheets({
    commandExecutor: new CommandExecutor(),
});

eventSheetManager
    .addEventSheet(eventSheet0, 'task0')
    .addEventSheet(eventSheet1, 'task1')
    .on('complete', function (groupName) {
        console.log(`Group '${groupName}' complete`)
    })

console.log(eventSheetManager.dumpEventSheetGroup('task0'))
console.log(eventSheetManager.dumpEventSheetGroup('task1'))

eventSheetManager.startGroup('task0')

setTimeout(function () {
    eventSheetManager.startGroup('task1')
}, 1000);
