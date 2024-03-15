import MarkedEventSheets from './markedeventsheets.js';
import CommandExecutor from './commandexecutor.js';
import CSV2MD from './logic/eventsheets/markedeventsheets/CSV2MD';

export default class MarkedEventSheetsPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: MarkedEventSheets.IConfig
    ): MarkedEventSheets;

    addCommandExecutor(
        scene: Phaser.Scene,
        config?: CommandExecutor.IConfig
    ): CommandExecutor;

    csv2md: typeof CSV2MD;
}