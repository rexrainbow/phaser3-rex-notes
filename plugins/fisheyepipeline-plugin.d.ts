// import * as Phaser from 'phaser';
import FishEyePostFxPipeline from './swirlpipeline';

export default FishEyePipelinePlugin;

declare namespace FishEyePipelinePlugin {

    interface IConfig {
        mode?: 0 | 1 | 'asin' | 'sin',

        center?: {
            x?: number, y?: number
        },

        radius?: number,

        intensity?: number,

        name?: string
    }

}

declare class FishEyePipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: FishEyePipelinePlugin.IConfig
    ): FishEyePostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): FishEyePostFxPipeline | FishEyePostFxPipeline[];
}