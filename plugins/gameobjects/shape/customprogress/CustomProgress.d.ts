import CustomShapes from "../customshapes/CustomShapes";

export default CustomProgress;

declare namespace CustomProgress {

    interface IConfig extends CustomShapes.IConfig {
        value?: number,

        easeValue?: {
            duration?: number,
            ease?: string
        },

    }
}

declare class CustomProgress extends CustomShapes {
    value: number;
    getValue(min?: number, max?: number): number;
    setValue(value?: number, min?: number, max?: number): this;
    addValue(inc?: number, min?: number, max?: number): this;

    easeValueTo(value?: number, min?: number, max?: number): this;
    stopEaseValue(): this;
    setEaseValueDuration(duration: number): this;
    setEaseValueFunction(ease: string): this;
}