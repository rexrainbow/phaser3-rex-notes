import RenderBase from '../RenderBase';

export default ImageData;

declare namespace ImageData {
    interface IModifyConfig extends RenderBase.IModifyConfig {
        frame?: string | Object,

        flipX?: boolean, flipY?: boolean,

        color?: number, tintEffect?: number
    }
}

declare class ImageData extends RenderBase {
    setFrame(
        frame?: string | Object
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
