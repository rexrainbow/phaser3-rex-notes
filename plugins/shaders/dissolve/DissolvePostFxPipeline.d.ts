// import * as Phaser from 'phaser';

export type ResizeModeType = 0 | 1 | 2 | 'stretch' | 'contain' | 'cover';

export default class DissolvePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setProgress(value: number): this;
    progress: number;

    setNoise(x?: number, y?: number, z?: number): this;
    noiseX: number;
    noiseY: number;
    noiseZ: number;

    setTransitionTargetTexture(
        key?: string, frame?: string,
        resizeMode?: ResizeModeType
    ): this

    setResizeMode(mode: ResizeModeType): this;
    resizeMode: number;

    setFromEdge(edgeStart: number, edgeWidth: number): this;
    fromEdgeStart: number;
    edgeWidth: number;
    setToEdge(edgeStart: number, edgeWidth: number): this;
    toEdgeStart: number;
    toEdgeWidth: number;

}