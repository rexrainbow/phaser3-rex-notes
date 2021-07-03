import * as Phaser from 'phaser';
import DissolvePostFxPipeline from './dissolvepipeline';
import { ResizeModeType } from './shaders/dissolve/DissolvePostFxPipeline'

export interface IConfig {
    toTexture?: string,
    toFrame?: string,
    resizeMode?: ResizeModeType

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

export default class DissolvePipelinePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
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