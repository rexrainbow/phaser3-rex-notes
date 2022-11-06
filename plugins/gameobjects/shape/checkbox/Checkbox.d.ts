import BaseShapes from '../shapes/BaseShapes';

export default Checkbox;

declare namespace Checkbox {
    interface IConfig {
        x: number, y: number,
        width: number, height: number,

        color?: number, boxFillAlpha?: number,
        boxLineWidth?: number, boxStrokeColor?: number, boxStrokeAlpha?: number,
        checkerColor?: number, checkerAlpha?: number,
        circleBox?: boolean,

        animationDuration?: number,

        checked?: boolean,
    }
}

declare class Checkbox extends BaseShapes {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        color?: number,
        config?: Checkbox.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: Checkbox.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: Checkbox.IConfig
    );

    setChecked(checked?: boolean): this;
    toggleChecked(): this;
    checked: boolean;
    setValue(value: boolean): this;
    value: boolean;

    setBoxShape(isCircleShape?: boolean): this;

    setBoxFillStyle(color: number, alpha?: number): this;
    setBoxStrokeStyle(lineWidth: number, color: number, alpha?: number): this;
    setCheckerStyle(color: number, alpha?: number): this;

    setCheckerAnimDuration(duration: number): this;
}