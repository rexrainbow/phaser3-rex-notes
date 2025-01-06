// import * as Phaser from 'phaser';
import CrtPostFxPipeline from './crtpipeline';

export default CrtPipelinePlugin;

declare namespace CrtPipelinePlugin {

    interface IConfig extends CrtPostFxPipeline.IConfig {
        name?: string
    }

}

declare class CrtPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: CrtPipelinePlugin.IConfig
    ): CrtPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): CrtPostFxPipeline | CrtPostFxPipeline[];
}