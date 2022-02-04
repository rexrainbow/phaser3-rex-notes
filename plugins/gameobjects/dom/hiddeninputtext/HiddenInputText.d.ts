import InputText from '../inputtext/InputText';

export default HiddenInputText;

declare namespace HiddenInputText {
    interface IConfig extends InputText.IConfig {
        cursor?: string;
        cursorFlashDuration?: number;

        updateTextCallback?: UpdateTextCallbackType;
        updateTextCallbackScope?: Object,
    }

    type UpdateTextCallbackType = (
        newText: string,
        hiddenInputText: HiddenInputText,
    ) => string;
}

declare class HiddenInputText extends InputText {
    constructor(
        textObject: Phaser.GameObjects.GameObject,
        config?: InputText.IConfig
    );

    setUpdateTextCallback(
        callback?: HiddenInputText.UpdateTextCallbackType,
        scope?: Object
    ): this;
    updateTextCallback: HiddenInputText.UpdateTextCallbackType;
    updateTextCallbackScope: Object;

    setCursor(
        s: string
    ): this;
    readonly cursor: string;

    setCursorFlashDuration(
        duration: number
    ): this;
}