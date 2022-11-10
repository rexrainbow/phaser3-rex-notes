import CanvasInput from '../canvasinput/CanvasInput';

export default SingleLineInput;

declare namespace SingleLineInput {
    interface IConfig extends CanvasInput.IConfig {

    }
}

declare class SingleLineInput extends CanvasInput {
}