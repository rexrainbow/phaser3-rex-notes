import Canvas from '../canvasbase/Canvas';

export default CustomProgress;

declare namespace CustomProgress {
    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        customProgress: CustomProgress
    ) => void;

    interface IConfig {
        value?: number,

        update?: (this: CustomProgress) => void;

        easeValue?: {
            duration?: number,
            ease?: string
        },

        valuechangeCallback?: ValueChangeCallbackType,
    }

    namespace Events {
        type ValueChangeCallbackType = (
            newValue: number,
            oldValue: number,
            customProgress: CustomProgress
        ) => void;
    }
}

declare class CustomProgress extends Canvas {
    constructor(
        scene: Phaser.Scene,
        config?: CustomProgress.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: CustomProgress.IConfig
    );

    readonly centerX: number;
    readonly centerY: number;
    readonly radius: number;

    value: number;
    getValue(min?: number, max?: number): number;
    setValue(value?: number, min?: number, max?: number): this;
    addValue(inc?: number, min?: number, max?: number): this;

    easeValueTo(value?: number, min?: number, max?: number): this;
    stopEaseValue(): this;
    setEaseValueDuration(duration: number): this;
    setEaseValueFunction(ease: string): this;
}