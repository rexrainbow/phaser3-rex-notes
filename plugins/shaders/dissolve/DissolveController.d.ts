// import * as Phaser from 'phaser';

export default DissolveController;

declare namespace DissolveController {
    interface IConfig {
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
    }

    type ResizeModeType = 0 | 1 | 2 | 'stretch' | 'contain' | 'cover';

}

declare class DissolveController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: DissolveController.IConfig
    );

    resetFromJSON(o?: DissolveController.IConfig): this;

    setProgress(value: number): this;
    progress: number;

    setNoise(x?: number, y?: number, z?: number): this;
    noiseX: number;
    noiseY: number;
    noiseZ: number;

    setTransitionTargetTexture(
        key?: string, frame?: string,
        resizeMode?: DissolveController.ResizeModeType
    ): this

    setResizeMode(mode: DissolveController.ResizeModeType): this;
    resizeMode: number;

    setFromEdge(edgeStart: number, edgeWidth: number): this;
    fromEdgeStart: number;
    edgeWidth: number;
    setToEdge(edgeStart: number, edgeWidth: number): this;
    toEdgeStart: number;
    toEdgeWidth: number;

}