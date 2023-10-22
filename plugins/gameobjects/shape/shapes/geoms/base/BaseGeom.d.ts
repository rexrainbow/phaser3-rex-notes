import DataMethods from '../../../../../utils/data/DataMethods.js';

export default class BaseGeom extends DataMethods {
    name: string;
    dirty: boolean;
    visible: boolean;
    data: { [name: string]: any } | undefined;

    isFilled: boolean;
    fillColor: number;
    fillAlpha: number;

    isStroked: boolean;
    lineWidth: number;
    strokeColor: number;
    strokeAlpha: number;

    setName(name: string): this;

    setVisible(visible?: boolean): this;

    fillStyle(
        color?: number,
        alpha?: number
    ): this;

    lineStyle(
        lineWidth?: number,
        color?: number,
        alpha?: number
    ): this;
}