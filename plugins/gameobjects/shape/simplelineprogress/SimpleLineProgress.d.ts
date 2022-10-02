// import * as Phaser from 'phaser';
export default SimpleLineProgress;

declare namespace SimpleLineProgress {

    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        circularProgress: SimpleLineProgress
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
            circularProgress: SimpleLineProgress
        ) => void;
    }
}

declare class SimpleLineProgress extends Phaser.GameObjects.Shape {
    constructor(
        scene: Phaser.Scene,
        config?: SimpleLineProgress.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        radius?: number,
        barColor?: string | number,
        value?: number,
        config?: SimpleLineProgress.IConfig
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
}