// import * as Phaser from 'phaser';
import {
    SplitFilter,
    SplitController
} from './splitfilter';

export default SplitFilterPlugin;

declare namespace SplitFilterPlugin {
}

declare class SplitFilterPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: SplitController.IConfig
    ): SplitController;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): SplitController | SplitController[];
}