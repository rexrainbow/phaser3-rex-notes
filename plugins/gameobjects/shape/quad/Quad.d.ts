// import * as Phaser from 'phaser';

export default Quad;

declare namespace Quad {

    interface ISidePoint {
        t: number,
        x: number,
        y: number
    }

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

        tlx?: number;
        tlr?: number;
        trx?: number;
        try?: number;
        blx?: number;
        bly?: number;
        brx?: number;
        bry?: number;

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

    setTopSidePoint(t: number, x: number, y: number): this;
    setTopSidePoint(points: Quad.ISidePoint[]): this;

    setRightSidePoint(t: number, x: number, y: number): this;
    setRightSidePoint(points: Quad.ISidePoint[]): this;

    setBottomSidePoint(t: number, x: number, y: number): this;
    setBottomSidePoint(points: Quad.ISidePoint[]): this;

    setLeftSidePoint(t: number, x: number, y: number): this;
    setLeftSidePoint(points: Quad.ISidePoint[]): this;

    clearTopSidePoints(): this;
    clearRightSidePoints(): this;
    clearBottomSidePoints(): this;
    clearLeftSidePoints(): this;
    clearAllSidesPoints(): this;
    readonly leftSidePoints: Quad.ISidePoint[];
    readonly topSidePoints: Quad.ISidePoint[];
    readonly bottomSidePoints: Quad.ISidePoint[];
    readonly rightSidePoints: Quad.ISidePoint[];

    resize(width: number, height: number): this;


}