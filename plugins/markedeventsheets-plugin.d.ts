import { MarkedEventSheets, CommandExecutor } from './markedeventsheets.js';

export default class MarkedEventSheetsPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: MarkedEventSheets.IConfig
    ): MarkedEventSheets;

    addCommandExecutor(
        scene: Phaser.Scene,
        config?: CommandExecutor.IConfig
    ): CommandExecutor;

}