// import * as Phaser from 'phaser';

export default Quad;

declare namespace Quad {

    interface IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        color?: number,
        alpha?: number,

        strokeColor?: number,
        strokeAlpha?: number,
        strokeWidth?: number,
    }

}

declare class Quad extends Phaser.GameObjects.Shape {
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        fillColor?: number,
        fillAlpha?: number
    );

    constructor(
        scene: Phaser.Scene,
        config?: Quad.IConfig
    )

    setTLPosition(x: number, y: number): this;
    setTRPosition(x: number, y: number): this;
    setBLPosition(x: number, y: number): this;
    setBRPosition(x: number, y: number): this;
    resetCornerPosition(): this;
    tlx: number;
    tlr: number;
    trx: number;
    try: number;
    blx: number;
    bly: number;
    brx: number;
    bry: number;


    resize(width: number, height: number): this;


}