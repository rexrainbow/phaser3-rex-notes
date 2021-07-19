import InputText from "../../inputtext";

export interface IConfigOpen {
    type?: string,
    enterClose?: boolean,
    selectAll?: boolean,

    onOpen?: (textObject: Phaser.GameObjects.GameObject) => void,
    onTextChanged?: (textObject: Phaser.GameObjects.GameObject, text: string) => void,
    onClose?: (textObject: Phaser.GameObjects.GameObject) => void,

    text?: string,
    fontFamily?: string,
    fontSize?: string,
    color?: string,
    align?: string,
    style?: { [name: string]: any },
}

export default class TextEdit {
    constructor(
        textObject: Phaser.GameObjects.GameObject
    );

    open(
        config?: IConfigOpen,
        onCloseCallback?: (textObject: Phaser.GameObjects.GameObject) => void
    ): this;

    close(): this;

    readonly isOpened: boolean;
    readonly text: string;

    readonly inputText: InputText;
}