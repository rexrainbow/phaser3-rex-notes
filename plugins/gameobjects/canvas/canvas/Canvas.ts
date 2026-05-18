import CanvasBase from '../canvasbase/Canvas';
import LoadImageMethods from './LoadImageMethods';

class Canvas extends CanvasBase {

}

Object.assign(
    Canvas.prototype,
    LoadImageMethods,
)

export default Canvas;