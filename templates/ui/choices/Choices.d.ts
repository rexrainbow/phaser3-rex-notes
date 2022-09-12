// import * as Phaser from 'phaser';
import Dialog from '../dialog/Dialog';

export default Choices;

declare namespace Choices {
    type CreateChoiceCallbackType = (scene: Phaser.Scene) => Phaser.GameObjects.GameObject;

    interface IConfig extends Dialog.IConfig {
        createChoiceCallback?: CreateChoiceCallbackType;
        createChoiceCallbackScope?: object
    }

    interface SetTextIConfig {
        title?: string,
        content?: string,
        description?: string,
        choices?: string[]
    }
}

declare class Choices extends Dialog {
    constructor(
        scene: Phaser.Scene,
        config?: Choices.IConfig
    );

    setCreateChoiceCallback(
        callback?: Choices.CreateChoiceCallbackType,
        scope?: object
    ): this;

    setTitle(text?: string): this;
    setContent(text?: string): this;
    setDescription(text?: string): this;
    setChoices(textArray: string[]): this;
    setText(config?: Choices.SetTextIConfig): this;

    clickChoicePromise(
        config?: Choices.SetTextIConfig
    ): Promise<{
        button: Phaser.GameObjects.GameObject,
        index: number,
        pointer: Phaser.Input.Pointer
    }>;
}