import * as Phaser from 'phaser';
import ToonifyPostFxPipeline from './toonifypipeline';

interface IConfig {
    edgeThreshold?: number,
    hueLevels?: number,
    sLevels?: number,
    vLevels?: number,
    edgeColor?: number,

    name?: string,
}

export default class ToonifyPipelinePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    ): ToonifyPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): ToonifyPostFxPipeline | ToonifyPostFxPipeline[];
}