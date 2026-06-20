import YAMLEventSheets from '../../plugins/yamleventsheets.js';

var content = `
script:
  - name: set
    parameters:
      name: 'rex'
      coin: 10
  - name: print
    parameters: { text: 'hello, {{name}}' }
`

class CommandExecutor {
    set(config, eventSheetManager, eventSheet) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    }

    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
    }
}
var commandExecutor = new CommandExecutor();

var eventSheetManager = new YAMLEventSheets({
    commandExecutor: commandExecutor
});

eventSheetManager
    .runEventSheetOncePromise(content)
    .then(function () {
        console.log(eventSheetManager.memory)
    })
