import Canvas from '../canvas/Canvas';

export default LineProgressCanvas;

declare namespace LineProgressCanvas {

    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        circularProgress: LineProgressCanvas
    ) => void;


    interface IConfig {
        x?: number, y?: number,
        radius?: number,

        barColor?: string | number,
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
        textFormatCallbackScope?: object,

        value?: number,

        easeValue?: {
            duration?: number,
            ease?: string
        },

        valuechangeCallback: ValueChangeCallbackType,

    }

    namespace Events {
        type ValueChangeCallbackType = (
            newValue: number,
            oldValue: number,
            circularProgress: LineProgressCanvas
        ) => void;
    }
}

declare class LineProgressCanvas extends Canvas {
    constructor(
        scene: Phaser.Scene,
        config?: LineProgressCanvas.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        radius?: number,
        barColor?: string | number,
        value?: number,
        config?: LineProgressCanvas.IConfig
    );

    value: number;
    getValue(min?: number, max?: number): number;
    setValue(value?: number, min?: number, max?: number): this;
    addValue(inc?: number, min?: number, max?: number): this;

    easeValueTo(value?: number, min?: number, max?: number): this;
    stopEaseValue(): this;
    setEaseValueDuration(duration: number): this;
    setEaseValueFunction(ease: string): this;

    radius: number;
    setRadius(radius: number): this;

    trackColor: string;
    setTrackColor(trackColor?: string | number): this;

    setThickness(thickness: number): this;

    barColor: string;
    setBarColor(barColor?: string | number): this;

    startAngle: number;
    setStartAngle(startAngle: number): this;

    anticlockwise: boolean;
    setAnticlockwise(anticlockwise: boolean): this;

    centerColor: string;
    setCenterColor(centerColor?: string | number): this;

    textColor: string;
    setTextColor(color?: string | number): this;

    textStrokeColor: string;
    textStrokeThickness: number;
    setTextStrokeColor(color?: string | number, thickness?: number): this;

    textFont: string;
    setTextFont(fontSize: string, fontFamily: string, fontStyle: string): this;
    setTextFont(font: string): this;

    setTextFormatCallback(
        callback: (value: number) => string,
        scope?: object
    ): this
}