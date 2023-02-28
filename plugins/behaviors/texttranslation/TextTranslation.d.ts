import ComponentBase from '../../utils/componentbase/ComponentBase';

export default TextTranslation;

declare namespace TextTranslation {
    type SetTextCallbackType = (
        gameObject: Phaser.GameObjects.GameObject,
        text: string
    ) => void;

    type InterpolationsType = { [name: string]: any };

    interface IConfig {
        setText?: SetTextCallbackType,
        interpolations?: InterpolationsType,
        translationKey?: string,
        updateText?: boolean,
    }
}

declare class TextTranslation extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextTranslation.IConfig
    );

    setInterpolations(interpolations: TextTranslation.InterpolationsType): this;
    updateInterpolation(key: string, value: any): this;
    updateInterpolation(interpolations: TextTranslation.InterpolationsType): this;
    interpolations: TextTranslation.InterpolationsType;

    setTranslationKey(key: string): this;
    translationKey: string;

    updateText(): this;
}