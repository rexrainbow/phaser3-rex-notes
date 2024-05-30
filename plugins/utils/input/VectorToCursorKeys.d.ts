import CursorKeys from './CursorKeys';

declare namespace VectorToCursorKeys {
    type DirTypes = 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir';


    interface IConfig {
        enable?: boolean,
        dir?: DirTypes,
        forceMin?: number,
    }
}
declare class VectorToCursorKeys extends CursorKeys {
    constructor(
        scene: any,
        config?: VectorToCursorKeys.IConfig
    )

    setMode(mode: VectorToCursorKeys.DirTypes): this;

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setDistanceThreshold(distance?: number): this;

    setVector(
        x0: number, y0: number,
        x1: number, y1: number
    ): this;
    clearVector(): this;

    readonly forceX: number;
    readonly forceY: number;
    readonly force: number;
    readonly rotation: number;
    readonly angle: number;
    readonly octant: number;
}

export default VectorToCursorKeys;