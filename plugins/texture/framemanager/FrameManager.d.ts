export default FrameManager;

declare namespace FrameManager {
    interface IConfig {
        key: string,
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

declare class FrameManager {
    constructor(
        scene: Phaser.Scene | Phaser.Game,
        key: string,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        fillColor?: string | number,
        useDynamicTexture?: boolean
    );

    constructor(
        scene: Phaser.Scene | Phaser.Game,
        key: string,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        useDynamicTexture?: boolean
    );

    constructor(
        scene: Phaser.Scene | Phaser.Game,
        config: FrameManager.IConfig
    );

    readonly useDynamicTexture: boolean;
    readonly key: string;
    readonly texture: Phaser.Textures.CanvasTexture | Phaser.Textures.DynamicTexture;
    readonly canvas: HTMLCanvasElement | undefined;
    readonly context: CanvasRenderingContext2D | undefined;
    readonly width: number;
    readonly height: number;
    readonly cellWidth: number;
    readonly cellHeight: number;
    readonly isFull: boolean;

    destroy(): void;

    stop(): this;

    add(
        camera: Phaser.Cameras.Scene2D.BaseCamera
    ): this;

    draw(
        frameName: string | number,
        callback: FrameManager.DrawCanvasFrameCallback | FrameManager.DrawDynamicTextureFrameCallback,
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
}