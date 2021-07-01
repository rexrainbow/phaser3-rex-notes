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
    getData(
        key: string,
        defaultValue?: any
    ): any;
}