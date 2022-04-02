import BlitterBase from '../BlitterBase';

export default BobBase;

declare class BobBase {
    constructor(
        parent: BlitterBase,
        type: string
    );

    parent: BlitterBase;
    setParent(
        parent?: BlitterBase
    ): this;

    active: boolean;
    setActive(
        active?: boolean
    ): this;

    reset(): this;

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