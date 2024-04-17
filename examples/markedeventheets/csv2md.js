import { MarkedEventSheets, CSV2MD } from '../../plugins/markedeventsheets';
import EventEmitter from 'eventemitter3';

// https://docs.google.com/spreadsheets/d/e/2PACX-1vSd670Y0lt9XpWk2HJr1phxD9mGjGXEGjpO_IRoq5KdxG0WQ88flNTRu7VmxnA3xvnFvP4QvcZoutkh/pubhtml
var csv = `\
#,Title
##,[Condition]
coin > 5,
##,Script
print,text={{name}} have {{coin}} coin\
`

var md = CSV2MD(csv);

console.log(md);

/*
# Title
## [Condition]

coin > 5

## Script

print
text=I have {{coin}} coin
*/


class CommandExecutor extends EventEmitter {
    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
        this.wait({ duration: 1000 });
        return this;
        // Task will be running until 'complete' event fired
    }

    set(config, eventSheetManager, eventSheet) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    }

    wait({ duration = 1000 } = {}, eventSheetManager, eventSheet) {
        var self = this;
        setTimeout(function () {
            self.complete();
        }, duration)
        return this;
    }

    complete() {
        this.emit('complete');
        return this;
    }
}
var commandExecutor = new CommandExecutor();

var eventSheetManager = new MarkedEventSheets({
    commandExecutor: commandExecutor
});
eventSheetManager.addEventSheet(md);

eventSheetManager.
    on('label.enter', function (title) {
        console.log(`Enter label '${title}'`)
    })
    .on('label.exit', function (title) {
        console.log(`Exit label '${title}'`)
    })

eventSheetManager
    .setData('name', 'rex')
    .setData('coin', 10)
    .setData('hp', 4)
    .startGroup()

console.log(eventSheetManager.memory)
