import DynamicText from '../dynamictext/DynamicText';
import HiddenTextEdit from './textedit/HiddenTextEdit';

export default CanvasInput;

declare namespace CanvasInput {
    type AddCharCallbackType = (
        child: DynamicText.CharBob,
        index: number,
        canvasInput: CanvasInput
    ) => void;

    type MoveCursorCallbackType = (
        cursorPosition: number,
        canvasInput: CanvasInput
    ) => void;

    interface IConfig extends DynamicText.IConfig {
        edit?: HiddenTextEdit.IConfig;
        onAddChar?: AddCharCallbackType;
        onMoveCursor?: MoveCursorCallbackType
    }
}

declare class CanvasInput extends DynamicText {

    setText(text: string): this;
    appendText(text: string): this;

    open(onCloseCallback?: Function): this;
    close(): this;
    readonly isOpened: boolean;
}