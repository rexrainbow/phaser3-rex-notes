import CustomShapes from "../customshapes/CustomShapes";

export default CustomProgress;

declare namespace CustomProgress {

    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        customProgress: CustomProgress
    ) => void;

    interface IConfig extends CustomShapes.IConfig {
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
            customProgress: CustomProgress
        ) => void;
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