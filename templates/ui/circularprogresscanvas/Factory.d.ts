import CircularProgressCanvas from './CircularProgressCanvas';
import { IConfig } from '../../../plugins/circularprogresscanvas'

declare type CircularProgressCanvasFactory = (
    config?: IConfig
) => CircularProgressCanvas;

export default CircularProgressCanvasFactory;