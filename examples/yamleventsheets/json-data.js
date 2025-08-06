import YAMLEventSheets from '../../plugins/yamleventsheets.js';
import content from 'raw-loader!/assets/yamleventsheets/json-data/json-data.yml';

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

var eventSheetManager = new YAMLEventSheets({
    commandExecutor: commandExecutor
});
eventSheetManager.addEventSheet(content);

eventSheetManager.setData('CharA', { hp: 100, mp: 100 })
console.log('JS: ', eventSheetManager.getData('CharA'))
console.log('JS: ', eventSheetManager.getData('CharA.hp'))

eventSheetManager.startGroup()

console.log('JS: ', eventSheetManager.memory)
