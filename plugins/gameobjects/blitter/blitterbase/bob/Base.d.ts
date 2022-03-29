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
}