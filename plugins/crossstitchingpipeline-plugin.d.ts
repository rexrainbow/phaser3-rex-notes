import * as Phaser from 'phaser';
import CrossStitchingPostFxPipeline from './crossstitchingpipeline';

export interface IConfig {
    stitchingWidth?: number,
    stitchingHeight?: number,
    brightness?: number,

    name?: string,
}

export default class CrossStitchingPipelinePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    ): CrossStitchingPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): CrossStitchingPostFxPipeline | CrossStitchingPostFxPipeline[];
}