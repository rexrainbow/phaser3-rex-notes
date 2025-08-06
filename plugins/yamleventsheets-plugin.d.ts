import YAMLEventSheets from './yamleventsheets';
import CommandExecutor from './commandexecutor';

export default class YAMLEventSheetsPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: YAMLEventSheets.IConfig
    ): YAMLEventSheets;

    addCommandExecutor(
        scene: Phaser.Scene,
        config?: CommandExecutor.IConfig
    ): CommandExecutor;

}