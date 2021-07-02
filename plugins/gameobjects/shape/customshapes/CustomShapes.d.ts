import BaseShapes from "../shapes/BaseShapes";

type NameTypes = string | string[] | number;

export interface IConfig {
    x?: number, y?: number,
    width?: number, height?: number,

    create?: (
        {
            arc?: NameTypes,
            circle?: NameTypes,
            ellipse?: NameTypes,
            line?: NameTypes,
            lines?: NameTypes,
            rectangle?: NameTypes,
            triangle?: NameTypes,
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