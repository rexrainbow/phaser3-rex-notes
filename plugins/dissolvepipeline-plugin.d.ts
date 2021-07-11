// import * as Phaser from 'phaser';
import DissolvePostFxPipeline from './dissolvepipeline';

export default DissolvePipelinePlugin;

declare namespace DissolvePipelinePlugin {

    interface IConfig {
        toTexture?: string,
        toFrame?: string,
        resizeMode?: DissolvePostFxPipeline.ResizeModeType

        noiseX?: number,
        noiseY?: number,
        noiseZ?: number,
        fromEdgeStart?: number,
        fromEdgeWidth?: number,
        toEdgeStart?: number,
        toEdgeWidth?: number,

        progress?: number,

        name?: string,
    }

}

declare class DissolvePipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: DissolvePipelinePlugin.IConfig
    ): DissolvePostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): DissolvePostFxPipeline | DissolvePostFxPipeline[];
}