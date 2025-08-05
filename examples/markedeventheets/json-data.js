import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import content from 'raw-loader!/assets/markedeventsheets/json-data/json-data.md';

class CommandExecutor {
    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
    }

    setData(config, eventSheetManager, eventSheet) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    }
}
var commandExecutor = new CommandExecutor();

var eventSheetManager = new MarkedEventSheets({
    commandExecutor: commandExecutor
});
eventSheetManager.addEventSheet(content);

eventSheetManager.setData('CharA', { hp: 100, mp: 100 })
console.log('JS: ', eventSheetManager.getData('CharA'))
console.log('JS: ', eventSheetManager.getData('CharA.hp'))

eventSheetManager.startGroup()

console.log('JS: ', eventSheetManager.memory)
