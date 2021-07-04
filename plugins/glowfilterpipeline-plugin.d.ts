import * as Phaser from 'phaser';
import GlowFilterPostFxPipeline from './glowfilterpipeline';

export interface IConfig {
    intensity?: number,

    name?: string,
}

export default class GlowFilterPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    ): GlowFilterPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): GlowFilterPostFxPipeline | GlowFilterPostFxPipeline[];
}