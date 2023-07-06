// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default LabelBase;

declare namespace LabelBase {
    interface IResetDisplayContentConfig {
        text?: string,

        icon?: string | Phaser.Textures.Texture | boolean,
        iconFrame?: string | number,
        iconSize?: number,

        action?: string | Phaser.Textures.Texture | boolean,
        actionFrame?: string | number,
        actionSize?: number,
    }
}

declare class LabelBase extends Sizer {
    text: string;
    setText(text: string): this;
    appendText(
        text: string | number | string[],
        addCR?: boolean
    ): this;

    setTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;
    readonly texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    readonly frame: Phaser.Textures.Frame;

    setIconTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;

    setIconSize(
        width?: number,
        height?: number
    ): this;
    iconWidth: number;
    iconHeight: number;

    setActionTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;
    readonly actionTexture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    readonly actionFrame: Phaser.Textures.Frame;

    setActionSize(
        width?: number,
        height?: number
    ): this;
    actionWidth: number;
    actionHeight: number;

    resetDisplayContent(
        config?: string | LabelBase.IResetDisplayContentConfig
    ): this;

}