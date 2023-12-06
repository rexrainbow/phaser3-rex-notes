import Canvas from '../canvas/Canvas';

export default RepeatImage;

declare namespace RepeatImage {
}

declare class RepeatImage extends Canvas {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        key?: string, frame?: string
    );

    setTexture(
        key?: string, frame?: string
    ): this;

    setFrame(
        frame: string
    ): this;

    setTilePosition(x: number, y: number): this;
    tilePositionX: number;
    tilePositionY: number;

    setTileScale(x: number, y: number): this;
    tileScaleX: number;
    tileScaleY: number;

}