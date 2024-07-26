import ComponentBase from '../../utils/componentbase/ComponentBase';
import i18next from 'i18next';

export default TextTranslation;

declare namespace TextTranslation {
    type SetTextCallbackType = (
        gameObject: Phaser.GameObjects.GameObject,
        text: string
    ) => void;

    type InterpolationsType = { [name: string]: any };

    interface IConfig {
        translationKey?: string,
        interpolation?: InterpolationsType,
        updateText?: boolean,
        setText?: SetTextCallbackType,
    }
}

declare class TextTranslation extends ComponentBase {
    static setI18Next(obj: typeof i18next): void;

    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextTranslation.IConfig
    );

    setInterpolation(interpolation: TextTranslation.InterpolationsType): this;
    updateInterpolation(key: string, value: any): this;
    updateInterpolation(interpolation: TextTranslation.InterpolationsType): this;
    interpolation: TextTranslation.InterpolationsType;

    setTranslationKey(key: string): this;
    translationKey: string;

    updateText(): this;
}