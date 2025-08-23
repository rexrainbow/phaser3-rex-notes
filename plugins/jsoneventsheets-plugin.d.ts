import JSONEventSheets from './jsoneventsheets';
import CommandExecutor from './commandexecutor';

export default class JSONEventSheetsPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: JSONEventSheets.IConfig
    ): JSONEventSheets;

    addCommandExecutor(
        scene: Phaser.Scene,
        config?: CommandExecutor.IConfig
    ): CommandExecutor;

}