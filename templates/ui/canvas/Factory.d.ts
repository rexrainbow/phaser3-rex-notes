import Canvas from './Canvas';

declare type CanvasFactory = (
    x?: number, y?: number,
    width?: number, height?: number
) => Canvas;

export default CanvasFactory;