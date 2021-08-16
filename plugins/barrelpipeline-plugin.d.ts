// import * as Phaser from 'phaser';
import BarrelPostFxPipeline from './barrelpipeline';

export default BarrelPipelinePlugin;

declare namespace BarrelPipelinePlugin {

    interface IConfig {
        shrink?: boolean,

        center?: {
            x?: number, y?: number
        },

        radius?: number,

        power?: number,

        intensity?: number,

        name?: string
    }

}

declare class BarrelPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: BarrelPipelinePlugin.IConfig
    ): BarrelPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): BarrelPostFxPipeline | BarrelPostFxPipeline[];
}