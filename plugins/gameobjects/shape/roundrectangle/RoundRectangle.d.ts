// import * as Phaser from 'phaser';

export interface IRadiusConfig {
    tl?: (number | { x?: number, y?: number }),
    tr?: (number | { x?: number, y?: number }),
    bl?: (number | { x?: number, y?: number }),
    br?: (number | { x?: number, y?: number })
}

export default class RoundRectangle extends Phaser.GameObjects.Shape {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        radiusConfig?: number | ({ x?: number, y?: number }) | IRadiusConfig |
            ({
                radius?: (number | ({ x?: number, y?: number }) | IRadiusConfig),
                iteration?: number
            }),
        fillColor?: number,
        fillAlpha?: number
    );

    resize(width: number, height: number): this;

    iteration: number;

    setIteration(iteration: number): this;

    radius: number;

    setRadius(
        value: number | IRadiusConfig
    ): this;

    readonly cornerRadius: {
        tl: { x: number, y: number },
        tr: { x: number, y: number },
        bl: { x: number, y: number },
        br: { x: number, y: number }
    };
}