import InputText from '../inputtext/InputText';

export default HiddenInputText;

declare namespace HiddenInputText {
    interface IConfig extends InputText.IConfig {
        updateTextCallback?: UpdateTextCallbackType;
        updateTextCallbackScope?: Object,
    }

    type UpdateTextCallbackType = (newText: string) => string;
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
}