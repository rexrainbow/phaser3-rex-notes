import BaseShapes from '../shapes/BaseShapes';

// import * as Phaser from 'phaser';
export default LineProgress;

declare namespace LineProgress {

    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        circularProgress: LineProgress
    ) => void;

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        trackColor?: string | number,
        trackStrokeThickness?: number,
        trackStrokeColor?: string | number,
        barColor?: string | number,

        skewX?: number,

        rtl?: boolean,

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
            circularProgress: LineProgress
        ) => void;
    }
}

declare class LineProgress extends BaseShapes {
    constructor(
        scene: Phaser.Scene,
        config?: LineProgress.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: LineProgress.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        barColor?: string | number,
        value?: number,
        config?: LineProgress.IConfig
    );

    getValue(min?: number, max?: number): number;
    setValue(value?: number, min?: number, max?: number): this;
    addValue(inc?: number, min?: number, max?: number): this;
    value: number;

    easeValueTo(value?: number, min?: number, max?: number): this;
    stopEaseValue(): this;
    setEaseValueDuration(duration: number): this;
    setEaseValueFunction(ease: string): this;

    setTrackColor(color?: number): this;
    trackColor: number;

    setTrackStroke(
        lineWidth?: number,
        color?: number
    ): this;
    trackStrokeThickness: number;
    trackStrokeColor: number;

    setBarColor(color?: number): this;
    barColor: number;

    setSkewX(skewX: number): this;
    skewX: number;

    setRTL(enable?: boolean): this;
    rtl: boolean;
}