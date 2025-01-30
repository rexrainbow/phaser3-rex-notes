// import * as Phaser from 'phaser';
export default SplitController;

declare namespace SplitController {
    interface IConfig {
        width?: number,
        height?: number,

        left?: number,
        right?: number,
        top?: number,
        bottom?: number,

        x?: number,
        y?: number,

        rotation?: number,
        angle?: number,

        shiftEnable?: boolean,
    }
}

declare class SplitController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: SplitController.IConfig
    );

    resetFromJSON(config?: SplitController.IConfig): this;

    setSplit(x?: number, y?: number): this;
    splitX: number;
    splitY: number;

    setSpace(left?: number, right?: number, top?: number, bottom?: number): this;
    spaceLeft: number;
    spaceRight: number;
    spaceTop: number;
    spaceBottom: number;
    setSplittedWidth(width?: number): this;
    splittedWidth: number;
    setSplittedHeight(height?: number): this;
    splittedHeight: number;

    splitAtCenter(width?: number, height?: number): this;

    setAngle(angle: number): this;
    setRotation(rotation: number): this;
    angle: number;
    rotation: number;

    setShiftEnable(enable?: boolean): this;
    shiftEnable: boolean;
}