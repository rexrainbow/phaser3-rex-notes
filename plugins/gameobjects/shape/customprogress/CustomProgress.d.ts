import CustomShapes from "../customshapes/CustomShapes";

export default CustomProgress;

declare namespace CustomProgress {

    interface IConfig extends CustomShapes.IConfig {
        value?: number
    }
}

declare class CustomProgress extends CustomShapes {
    value: number;
    setValue(value: number): this;
}