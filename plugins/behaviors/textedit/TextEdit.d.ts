import { TextGameObjectType } from '../../utils/types/TextGameObjectType';

export { TextGameObjectType };

export interface IConfigOpen {
    type?: string,
    enterClose?: boolean,
    selectAll?: boolean,

    onOpen?: (textObject: TextGameObjectType) => void,
    onTextChanged?: (textObject: TextGameObjectType, text: string) => void,
    onClose?: (textObject: TextGameObjectType) => void,

    text?: string,
    fontFamily?: string,
    fontSize?: string,
    color?: string,
    align?: string,
    style?: { [name: string]: any },
}

export default class TextEdit {
    constructor(
        textObject: TextGameObjectType
    );

    open(
        config?: IConfigOpen,
        onCloseCallback?: (textObject: TextGameObjectType) => void
    ): this;

    close(): this;

    readonly isOpened: boolean;
    readonly text: string;

}