import RenderBase from '../RenderBase';

export default ImageData;

declare namespace ImageData {
    interface IFrame {
        width: number,
        height: number,
        u0: number,
        v0: number,
        u1: number,
        v1: number,
    }

    interface IModifyConfig extends RenderBase.IModifyConfig {
        frame?: string | IFrame,

        flipX?: boolean, flipY?: boolean,

        color?: number, tintEffect?: number
    }
}

declare class ImageData extends RenderBase {
    setFrame(
        frame?: string | ImageData.IFrame
    ): this;


    flipX: boolean;
    flipY: boolean;
    setFlipX(flipX?: boolean): this;
    setFlipY(flipY?: boolean): this;
    resetFlip(): this;

    color: number;
    setColor(value: number): this;

    tintEffect: number;
    setTintEffect(value: number): this;

    modifyPorperties(
        o?: ImageData.IModifyConfig
    ): this;
}
