import InputText from '../inputtext/InputText';

export default HiddenInputText;

declare namespace HiddenInputText {
    interface IConfig extends InputText.IConfig {
        cursor?: string;
        cursorFlashDuration?: number;
        enterClose?: boolean;

        onOpen: (
            textObject: Phaser.GameObjects.GameObject,
            hiddenInputText: HiddenInputText,
        ) => void;

        onClose: (
            textObject: Phaser.GameObjects.GameObject,
            hiddenInputText: HiddenInputText,
        ) => void;

        onUpdate: (
            text: string,
            textObject: Phaser.GameObjects.GameObject,
            hiddenInputText: HiddenInputText,
        ) => void | string;
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

    setCursor(
        s: string
    ): this;
    readonly cursor: string;

    setCursorFlashDuration(
        duration: number
    ): this;

    setEnterClose(
        value?: boolean
    ): this;

    open(): this;
    close(): this;
    readonly isOpened: boolean;
}