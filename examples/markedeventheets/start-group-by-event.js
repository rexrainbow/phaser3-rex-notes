import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import eventSheet0 from 'raw-loader!/assets/markedeventsheet/start-group-by-event/eventA.md';

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
        this.wait({ duration: 1000 }, eventSheetManager, eventSheet);
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
    .addEventSheet(eventSheet0, 'event.eventA')
    .startGroupByEvent('eventA', 'event.eventA')
    .on('complete', function (groupName) {
        console.log(`Group '${groupName}' complete`)
    })

// Group 'event.eventA' is not running, start group 'event.eventA'
eventSheetManager.emit('eventA')

// Group 'event.eventA' is running, ignore this starting command
eventSheetManager.emit('eventA') 

setTimeout(function () {
    // Group 'event.eventA' is not running, start group 'event.eventA'
    eventSheetManager.emit('eventA')
}, 3000);

