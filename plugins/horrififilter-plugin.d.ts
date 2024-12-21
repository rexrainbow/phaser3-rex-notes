// import * as Phaser from 'phaser';
import {
    HorrifiFilter,
    HorrifiController
} from './horrififilter';

export default HorrifiFilterPlugin;

declare namespace HorrifiFilterPlugin {
}

declare class HorrifiFilterPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: HorrifiController.IConfig
    ): HorrifiController;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): HorrifiController | HorrifiController[];
}