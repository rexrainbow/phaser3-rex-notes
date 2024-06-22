export default CrtPostFxPipeline;

declare namespace CrtPostFxPipeline {
    interface IConfig {
        warpX?: number, warpY?: number,
        scanStrength?: number,
    }
}

declare class CrtPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: CrtPostFxPipeline.IConfig): this;

    setWarp(warpX: number, warpY: number): this;
    warpX: number;
    warpY: number;

    setScanStrength(value: number): this;
    scanStrength: number;

    setScanLineWidth(value: number): this;
    scanLineWidth: number;

}