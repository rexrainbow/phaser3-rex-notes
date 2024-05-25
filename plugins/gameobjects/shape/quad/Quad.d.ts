// import * as Phaser from 'phaser';

export default Quad;

declare namespace Quad {

    interface ISidePoint {
        t: number,
        x: number,
        y: number
    }

    interface ISidePointParameter extends ISidePoint {
        key?: string
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
        tly?: number;
        trx?: number;
        try?: number;
        blx?: number;
        bly?: number;
        brx?: number;
        bry?: number;

        leftSidePoints?: ISidePointParameter[],
        topSidePoints?: ISidePointParameter[],
        rightSidePoints?: ISidePointParameter[],
        bottomSidePoints?: ISidePointParameter[],
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

    insertTopSidePoint(t: number, x: number, y: number, key?: string): this;
    insertTopSidePoint(points: Quad.ISidePointParameter[]): this;

    insertRightSidePoint(t: number, x: number, y: number, key?: string): this;
    insertRightSidePoint(points: Quad.ISidePointParameter[]): this;

    insertBottomSidePoint(t: number, x: number, y: number, key?: string): this;
    insertBottomSidePoint(points: Quad.ISidePointParameter[]): this;

    insertLeftSidePoint(t: number, x: number, y: number, key?: string): this;
    insertLeftSidePoint(points: Quad.ISidePointParameter[]): this;

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