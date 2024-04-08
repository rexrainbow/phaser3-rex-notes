// import * as Phaser from 'phaser';
import AlphaTintPostFxPipeline from './alphatintpipeline';


export default AlphaTintPipelinePlugin;

declare namespace AlphaTintPipelinePlugin {

    interface IConfig extends AlphaTintPostFxPipeline.IConfig {
        name?: string,
        alpha?: number,
        tint?: number,
    }

}

declare class AlphaTintPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: AlphaTintPipelinePlugin.IConfig
    ): AlphaTintPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): AlphaTintPostFxPipeline | AlphaTintPostFxPipeline[];
}