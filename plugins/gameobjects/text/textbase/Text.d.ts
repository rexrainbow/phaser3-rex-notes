// import * as Phaser from 'phaser';
import CanvasGameObjectBase from '../../../utils/types/CanvasGameObjectBase';

export default Text;

declare namespace Text {

    type MetricsType = {
        ascent: number,
        descent: number,
        fontSize: number
    };

    type FontConfigType = string |
    {
        fontFamily?: string,
        fontSize?: string,
        fontStyle?: string
    };

    interface TextStyle {
        fontFamily?: string,
        fontSize?: string,
        fontStyle?: string,

        backgroundColor?: null | string | number,
        backgroundColor2?: null | string | number,
        backgroundHorizontalGradient?: boolean,
        backgroundStrokeColor?: null | string | number,
        backgroundStrokeLineWidth?: number,
        backgroundCornerRadius?: number,
        backgroundCornerIteration?: null | number,

        color?: null | string | number,
        fill?: null | string | number,

        stroke?: null | string | number,
        strokeThickness?: number,

        shadow?: {
            offsetX?: number,
            offsetY?: number,
            color?: number | string,
            blur?: number,
            stroke?: false,
            fill?: false
        },

        underline?: {
            color?: number | string,
            thickness?: number,
            offset?: number,
        },

        align?: 'left' | 'center' | 'right',
        halign?: 'left' | 'center' | 'right',
        valign?: 'top' | 'center' | 'bottom',

        padding?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,
        },

        maxLines?: number,
        lineSpacing?: number,

        fixedWidth?: number,
        fixedHeight?: number,

        resolution?: number,

        testString?: string,

        wrap?: {
            mode?: 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character'
            width?: null | number,
        },

        metrics?: boolean |
        {
            ascent: number,
            descent: number,
            fontSize: number
        },
    }

    namespace Events {
        type AnyAreaCallbackType = (
            key: string,
            pointer: Phaser.Input.Pointer,
            localX: number,
            localY: number
        ) => void;

        type AreaCallbackType = (
            pointer: Phaser.Input.Pointer,
            localX: number,
            localY: number
        ) => void;
    }

}

declare class Text extends CanvasGameObjectBase {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        content?: string,

        style?: Text.TextStyle
    );

    text: string;
    setText(text: string | number | string[]): this;
    appendText(text: string | number | string[]): this;
    getPlainText(
        text?: string | undefined,
        start?: number, end?: number
    ): string;
    getWrappedText(
        text?: string | undefined,
        start?: number, end?: number
    ): string;
    getText(
        text?: string | undefined,
        start?: number, end?: number
    ): string;
    getSubString(
        text?: string | undefined,
        start?: number, end?: number
    ): string;

    updateText(runWrap?: boolean): this;

    setWrapMode(
        mode: 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character'
    ): this;
    setWrapWidth(width: number): this;

    setFont(font: Text.FontConfigType): this;
    setFontFamily(family: string): this;
    setFontSize(size: number | string): this;
    setFontStyle(style: string): this;
    setStyle(style: Text.TextStyle): this;
    setTestString(string: string): this;

    setColor(
        color?: null | string | number
    ): this;
    setFill(
        color?: null | string | number
    ): this;

    setStroke(
        color?: null | string | number,
        thickness?: number
    ): this;

    setUnderline(
        color?: null | string | number,
        thickness?: number,
        ofset?: number
    ): this;
    setUnderlineColor(
        color?: null | string | number
    ): this;
    setUnderlineThinkness(thickness: number): this;
    setUnderlineOffset(ofset: number): this;

    setBackgroundColor(
        color?: null | string | number,
        color2?: null | string | number,
        isHorizontalGradient?: boolean
    ): this;
    setBackgroundStrokeColor(
        color?: null | string | number,
        lineWidth?: number
    ): this;
    setBackgroundCornerRadius(
        radius?: number,
        iteration?: number
    ): this;

    setShadow(
        x?: number, y?: number,
        color?: null | string | number,
        blur?: number,
        shadowStroke?: boolean,
        shadowFill?: boolean
    ): this;
    setShadowOffset(x: number, y: number): this;
    setShadowColor(color?: null | string | number): this;
    setShadowBlur(blur: number): this;
    setShadowStroke(enabled?: boolean): this;
    setShadowFill(enabled?: boolean): this;

    setAlign(align?: 'left' | 'center' | 'right'): this;
    setHAlign(align?: 'left' | 'center' | 'right'): this;
    setVAlign(align?: 'top' | 'center' | 'bottom'): this;

    addImage(
        imgKey: string,
        config?: {
            key: string,
            frame?: string,
            width?: number,
            height?: number,
            y?: number,
            left?: number,
            right?: number,
        }
    ): this;

    drawAreaBounds(
        graphics: Phaser.GameObjects.Graphics,
        color?: number
    ): this;

    setLineSpacing(value: number): this;

    setPadding(
        left?: number | {
            left?: number, right?: number, top?: number, bottom?: number
        },
        top?: number,
        right?: number,
        bottom?: number,
    ): this;

    setMaxLines(max?: number): this;

    setResolution(value: number): this;

    setFixedSize(width?: number, height?: number): this;
    setSize(width?: number, height?: number): this;
    resize(width?: number, height?: number): this;

    getTextMetrics(): Text.MetricsType;

    setTextMetrics(
        metrics: Text.MetricsType,
        font: Text.FontConfigType
    ): this;

    style: {
        color: string | null,
        stroke: string | null,
        strokeThickness: number,

        underlineColor: string | null,
        underlineThickness: number,
        underlineOffset: number,

        backgroundColor: string | null,
        backgroundColor2: string | null,
        backgroundHorizontalGradient: boolean,

        backgroundStrokeColor: string | null,
        backgroundStrokeLineWidth: number,

        backgroundCornerRadius: number,
        backgroundCornerIteration: number | undefined,

        shadowColor: string | null,
        shadowOffsetX: number,
        shadowOffsetY: number,
        shadowBlur: number,
        shadowStroke: boolean,
        shadowFill: boolean,

        lineSpacing: number,
        maxLines: number,

        resolution: number,

        fixedWidth: number,
        fixedHeight: number,

        halign: string,
        valign: string,

        wrapWidth: number | null,
        wrapMode: number
    };

    padding: {
        left: number,
        right: number,
        top: number,
        bottom: number
    };

    lineSpacing: number;
}