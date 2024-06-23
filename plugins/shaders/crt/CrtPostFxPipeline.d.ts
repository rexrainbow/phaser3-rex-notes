export default CrtPostFxPipeline;

declare namespace CrtPostFxPipeline {
    interface IConfig {
        warpX?: number, warpY?: number,
        scanLineStrength?: number,
    }
}

declare class CrtPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: CrtPostFxPipeline.IConfig): this;

    setWarp(warpX: number, warpY: number): this;
    warpX: number;
    warpY: number;

    setScanLineStrength(value: number): this;
    scanLineStrength: number;

    setScanLineWidth(value: number): this;
    scanLineWidth: number;

}