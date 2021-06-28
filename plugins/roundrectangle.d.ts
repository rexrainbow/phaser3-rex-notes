import * as Phaser from 'phaser';

export default class RoundRectangle extends Phaser.GameObjects.Shape {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        radiusConfig?: number |
        { x?: number, y?: number } |
        {
            tl?: number | { x?: number, y?: number },
            tr?: number | { x?: number, y?: number },
            bl?: number | { x?: number, y?: number },
            br?: number | { x?: number, y?: number }
        } |
        {
            radius?: number |
            { x?: number, y?: number } |
            {
                tl?: number | { x?: number, y?: number },
                tr?: number | { x?: number, y?: number },
                bl?: number | { x?: number, y?: number },
                br?: number | { x?: number, y?: number }
            },
            iteration?: number
        },
        fillColor?: number,
        fillAlpha?: number
    );

    resize(width: number, height: number): this;

    iteration: number;

    setIteration(iteration: number): this;

    radius: number;

    setRadius(
        value: number |
        {
            tl?: number | { x?: number, y?: number },
            tr?: number | { x?: number, y?: number },
            bl?: number | { x?: number, y?: number },
            br?: number | { x?: number, y?: number }
        }
    ): this;

    get cornerRadius(): {
        tl: { x: number, y: number },
        tr: { x: number, y: number },
        bl: { x: number, y: number },
        br: { x: number, y: number }
    };
}