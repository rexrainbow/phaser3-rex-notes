// import * as Phaser from 'phaser';
import SwirlPostFxPipeline from './swirlpipeline';

interface IConfig {
    center?: {
        x?: number, y?: number
    },

    radius?: number,
    rotation?: number, angle?: number,

    name?: string
}

export default class SwirlPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    ): SwirlPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): SwirlPostFxPipeline | SwirlPostFxPipeline[];
}