export default class BaseGeom {
    name: string;
    dirty: boolean;
    data: { [name: string]: any } | undefined;

    isFilled: boolean;
    fillColor: number;
    fillAlpha: number;

    isStroked: boolean;
    lineWidth: number;
    strokeColor: number;
    strokeAlpha: number;

    fillStyle(
        color?: number,
        alpha?: number
    ): this;
    lineStyle(
        lineWidth?: number,
        color?: number,
        alpha?: number
    ): this;

    setData(
        key: string,
        value: any
    ): this;
    setData(
        data: { [key: string]: any }
    ): this;
    getData(
        key: string,
        defaultValue?: any
    ): any;
    incData(
        key: string,
        inc: number,
        defaultValue: number
    ): this;
    mulData(
        key: string,
        mul: number,
        defaultValue: number
    ): this;
    clearData(): this;
}