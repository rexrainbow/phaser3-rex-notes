import { MarkedEventSheets, CSV2MD } from '../../plugins/markedeventsheets';
import EventEmitter from 'eventemitter3';

// https://docs.google.com/spreadsheets/d/e/2PACX-1vRIKdxVu0RnGTdlBahIDWAkMnVlkD2yFgJcE_WW0vJqr3yPHRDlSv_RpjVs8y0lGciwuCpagMeAztU7/pubhtml
var csv = `\
print,text=Hello {{name}}
print,text={{name}} have {{coin}} coin\
`

var md = CSV2MD(csv, 'Title');

console.log(md);

/*
# Title
## Script

print
text={{name}} have {{coin}} coin
*/


class CommandExecutor extends EventEmitter {
    print({ text = '' } = {}, manager) {
        console.log(text);
        this.wait({ duration: 1000 });
        return this;
        // Task will be running until 'complete' event fired
    }

    set(config, manager) {
        for (var name in config) {
            manager.setData(name, config[name]);
        }
    }

    wait({ duration = 1000 } = {}, manager) {
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

var manager = new MarkedEventSheets({
    commandExecutor: commandExecutor
});
manager.addEventSheet(md);

manager.
    on('label.enter', function (title) {
        console.log(`Enter label '${title}'`)
    })
    .on('label.exit', function (title) {
        console.log(`Exit label '${title}'`)
    })

manager
    .setData('name', 'rex')
    .setData('coin', 10)
    .setData('hp', 4)
    .start()

console.log(manager.memory)
