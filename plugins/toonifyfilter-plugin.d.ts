// import * as Phaser from 'phaser';
import {
    ToonifyFilter,
    ToonifyController
} from './toonifyfilter';

export default ToonifyFilterPlugin;

declare namespace ToonifyFilterPlugin {
}

declare class ToonifyFilterPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: ToonifyController.IConfig
    ): ToonifyController;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): ToonifyController | ToonifyController[];
}