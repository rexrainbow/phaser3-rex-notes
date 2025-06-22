export default FrameManagerPool;

declare namespace FrameManagerPool {
    type KeyGeneratorType = (index: number) => string | string;

    interface IConfig {
        key: KeyGeneratorType,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        cellPadding?: number,
        columns?: number,
        rows?: number,
        fillColor?: string | number,
        useDynamicTexture?: boolean
    }

    type DrawCanvasFrameCallback = (
        canvasElem: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        frameSize: {
            width: number,
            height: number
        }
    ) => void;

    type DrawDynamicTextureFrameCallback = (
        texture: Phaser.Textures.DynamicTexture,
        frameSize: {
            width: number,
            height: number
        }
    ) => void
}

declare class FrameManagerPool {
    constructor(
        scene: Phaser.Scene | Phaser.Game,
        key: FrameManagerPool.KeyGeneratorType,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        fillColor?: string | number,
        useDynamicTexture?: boolean
    );

    constructor(
        scene: Phaser.Scene | Phaser.Game,
        key: FrameManagerPool.KeyGeneratorType,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        useDynamicTexture?: boolean
    );

    constructor(
        scene: Phaser.Scene | Phaser.Game,
        config: FrameManagerPool.IConfig
    );

    readonly keyGenerator: FrameManagerPool.KeyGeneratorType;
    readonly useDynamicTexture: boolean;
    readonly width: number;
    readonly height: number;
    readonly cellWidth: number;
    readonly cellHeight: number;
    readonly lastKey: string;
    readonly keys: string[];

    destroy(): void;

    draw(
        frameName: string | number,
        callback: FrameManagerPool.DrawCanvasFrameCallback | FrameManagerPool.DrawDynamicTextureFrameCallback,
        scope?: object
    ): this;

    paste(
        frameName: string | number,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    addEmptyFrame(
        frameName: string | number,
        width?: number,
        height?: number
    ): this;

    updateTexture(): this;

    remove(
        frameName: string | number
    ): this;

    clear(): this;

    contains(
        frameName: string | number
    ): boolean;

    getKeys(): string[];

    getTexture(
        frameName: string | number
    ): Phaser.Textures.CanvasTexture | Phaser.Textures.DynamicTexture;

    getCanvas(
        frameName: string | number
    ): HTMLCanvasElement | undefined;

    getContext(
        frameName: string | number
    ): CanvasRenderingContext2D | undefined;
}