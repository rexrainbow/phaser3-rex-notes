import DataManager from './localstorage-data';
import Extend from './storage/localstorage/data/Extend';

export default class DataManagerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        parent: object,
        config?: object
    ): DataManager;

    add(
        parent: object,
        eventEmitter?: Phaser.Events.EventEmitter,
        config?: object
    ): DataManager;

    extend: typeof Extend
}