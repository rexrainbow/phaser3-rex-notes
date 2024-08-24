export default TextTruncator;

declare namespace TextTruncator {
    interface IConfig {
        enable?: boolean,
        symbol?: string,
        maxWidth?: number,
        maxHeight?: number,
        text?: string,
    }
}
declare class TextTruncator {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextTruncator.IConfig
    );

    setEnable(enable?: boolean): this;
    enable: number;

    setSymbol(symbol: string): this;
    symbol: string;

    setMaxWidth(width?: number): this;
    maxWidth: number;

    setMaxHeight(height?: number): this;
    maxHeight: number;

    setText(text?: string | string[] | number): this;
    appendText(text?: string | string[] | number): this;
    text: string;

    updateText(): this;
}