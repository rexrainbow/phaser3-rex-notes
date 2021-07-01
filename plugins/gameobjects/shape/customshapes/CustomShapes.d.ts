import BaseShapes from "../shapes/BaseShapes";

export interface IConfig {
    x?: number, y?: number,
    width?: number, height?: number,

    create?: (
        {
            arc?: number | string | string[],
            circle?: number | string | string[],
            ellipse?: number | string | string[],
            line?: number | string | string[],
            lines?: number | string | string[],
            rectangle?: number | string | string[],
            triangle?: number | string | string[],
        } |
        ((this: CustomShapes) => void)
    );

    update?: (this: CustomShapes) => void;

    type?: string,
}

export default class CustomShapes extends BaseShapes {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );
}