import { CanvasTextGameObjectType } from '../../utils/types/TextGameObjectType';

export { CanvasTextGameObjectType };

export interface IConfigOpen {
    type?: string,
    enterClose?: boolean,
    selectAll?: boolean,

    onOpen?: (textObject: CanvasTextGameObjectType) => void,
    onTextChanged?: (textObject: CanvasTextGameObjectType, text: string) => void,
    onClose?: (textObject: CanvasTextGameObjectType) => void,

    text?: string,
    fontFamily?: string,
    fontSize?: string,
    color?: string,
    align?: string,
    style?: { [name: string]: any },
}

export default class TextEdit {
    constructor(
        textObject: CanvasTextGameObjectType
    );

    open(
        config?: IConfigOpen,
        onCloseCallback?: (textObject: CanvasTextGameObjectType) => void
    ): this;

    close(): this;

    readonly isOpened: boolean;
    readonly text: string;

}