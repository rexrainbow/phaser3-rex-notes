// import * as Phaser from 'phaser';

export default DissolvePostFxPipeline;

declare namespace DissolvePostFxPipeline {

    type ResizeModeType = 0 | 1 | 2 | 'stretch' | 'contain' | 'cover';

}

declare class DissolvePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setProgress(value: number): this;
    progress: number;

    setNoise(x?: number, y?: number, z?: number): this;
    noiseX: number;
    noiseY: number;
    noiseZ: number;

    setTransitionTargetTexture(
        key?: string, frame?: string,
        resizeMode?: DissolvePostFxPipeline.ResizeModeType
    ): this

    setResizeMode(mode: DissolvePostFxPipeline.ResizeModeType): this;
    resizeMode: number;

    setFromEdge(edgeStart: number, edgeWidth: number): this;
    fromEdgeStart: number;
    edgeWidth: number;
    setToEdge(edgeStart: number, edgeWidth: number): this;
    toEdgeStart: number;
    toEdgeWidth: number;

}