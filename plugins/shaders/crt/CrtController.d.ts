export default CrtController;

declare namespace CrtController {
    interface IConfig {
        warpX?: number, warpY?: number,
        scanLineStrength?: number,
    }
}

declare class CrtController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: CrtController.IConfig
    );

    resetFromJSON(o?: CrtController.IConfig): this;

    setWarp(warpX: number, warpY: number): this;
    warpX: number;
    warpY: number;

    setScanLineStrength(value: number): this;
    scanLineStrength: number;

    setScanLineWidth(value: number): this;
    scanLineWidth: number;

}