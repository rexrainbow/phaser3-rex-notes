import CircularProgressCanvas from './CircularProgressCanvas';

declare type CircularProgressCanvasFactory = (
    config?: {
        x?: number, y?: number,
        radius?: number,

        color?: string | number,
        trackColor?: string | number,
        centerColor?: string | number,
        thickness?: number,
        startAngle?: number,
        anticlockwise?: boolean,

        textColor?: string | number,
        textStrokeColor?: string | number,
        textStrokeThickness?: number,
        textSize?: string,
        textFamily?: string,
        textStyle?: string,
        textFormatCallback?: (value: number) => string,
        textFormatCallbackScope?: unknown,

        value?: number,
    }
) => CircularProgressCanvas;

export default CircularProgressCanvasFactory;