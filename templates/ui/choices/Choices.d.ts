// import * as Phaser from 'phaser';
import Dialog from '../dialog/Dialog';

export default Choices;

declare namespace Choices {
    interface SetTextIConfig {
        title?: string,
        content?: string,
        description?: string,
        choices?: string[]
    }
}

declare class Choices extends Dialog {
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