import * as Phaser from 'phaser';
import InversePostFxPipeline from './inversepipeline';

interface IConfig {
    intensity?: number,

    name?: string,
}

export default class InversePipelinePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    ): InversePostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): InversePostFxPipeline | InversePostFxPipeline[];
}