import Canvas from '../canvas/Canvas';

export default AlphaMaskImage;

declare namespace AlphaMaskImage {

    interface IConfig {
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
}

declare class AlphaMaskImage extends Canvas {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        key?: string, frame?: string,
        config?:
            null | 0 | 1 | 2 | 'circle' | 'ellipse' | 'roundRectangle' |
            AlphaMaskImage.IConfig
    );

    setTexture(
        key?: string, frame?: string,
        config?:
            null | 0 | 1 | 2 | 'circle' | 'ellipse' | 'roundRectangle' |
            AlphaMaskImage.IConfig
    ): this;
}