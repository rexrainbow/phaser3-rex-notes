import { MarkedEventSheets, CSV2MD } from '../../plugins/markedeventsheets';

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
