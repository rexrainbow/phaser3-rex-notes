import Canvas from '../canvas/Canvas';

export interface IConfig {
    maskType?: null | 0 | 1 | 2 | 'circle' | 'ellipse' | 'roundRectangle',
    radius?: number |
    { x?: number, y?: number } |
    {
        tl?: number | { x?: number, y?: number },
        tr?: number | { x?: number, y?: number },
        bl?: number | { x?: number, y?: number },
        br?: number | { x?: number, y?: number }
    }
}

export default class CircleMaskImage extends Canvas {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        key?: string, frame?: string,
        config?:
            null | 0 | 1 | 2 | 'circle' | 'ellipse' | 'roundRectangle' |
            IConfig
    );

    setTexture(
        key?: string, frame?: string,
        config?:
            null | 0 | 1 | 2 | 'circle' | 'ellipse' | 'roundRectangle' |
            IConfig
    ): this;
}