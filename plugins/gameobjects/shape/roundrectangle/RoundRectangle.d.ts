// import * as Phaser from 'phaser';

export default RoundRectangle;

declare namespace RoundRectangle {

    export interface IRadiusConfig {
        tl?: (number | { x?: number, y?: number }),
        tr?: (number | { x?: number, y?: number }),
        bl?: (number | { x?: number, y?: number }),
        br?: (number | { x?: number, y?: number })
    }

}

declare class RoundRectangle extends Phaser.GameObjects.Shape {
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        radiusConfig?: number | ({ x?: number, y?: number }) | RoundRectangle.IRadiusConfig |
            ({
                radius?: (number | ({ x?: number, y?: number }) | RoundRectangle.IRadiusConfig),
                iteration?: number
            }),
        fillColor?: number,
        fillAlpha?: number
    );

    constructor(
        scene: Phaser.Scene,
        config?: {
            x?: number,
            y?: number,
            width?: number,
            height?: number,
            radius?: number | ({ x?: number, y?: number }) | RoundRectangle.IRadiusConfig |
            ({
                radius?: (number | ({ x?: number, y?: number }) | RoundRectangle.IRadiusConfig),
                iteration?: number
            }),

            color?: number,
            alpha?: number,

            strokeColor?: number,
            strokeAlpha?: number,
            strokeWidth?: number
        }
    )

    resize(width: number, height: number): this;

    iteration: number;

    setIteration(iteration: number): this;

    radius: number;

    setRadius(
        value: number | RoundRectangle.IRadiusConfig
    ): this;

    radiusTL: number;

    setRadiusTL(
        value: number | RoundRectangle.IRadiusConfig
    ): this;

    radiusTR: number;

    setRadiusTR(
        value: number | RoundRectangle.IRadiusConfig
    ): this;

    radiusBL: number;

    setRadiusBL(
        value: number | RoundRectangle.IRadiusConfig
    ): this;

    radiusBR: number;

    setRadiusBR(
        value: number | RoundRectangle.IRadiusConfig
    ): this;

    readonly cornerRadius: {
        tl: { x: number, y: number },
        tr: { x: number, y: number },
        bl: { x: number, y: number },
        br: { x: number, y: number }
    };
}