import TickTask from '../../utils/componentbase/TickTask';

export default Bounds;

declare namespace Bounds {

    type RectangleLikeType = {
        x?: number, y?: number,
        centerX?: number, centerY?: number,
        width?: number, height?: number,
    }

    type BoundsEnableType = {
        left?: boolean, right?: boolean,
        top?: boolean, bottom?: boolean,
    }

    type BoundHitModeType = 0 | 1 | 'clamp' | 'wrap';

    type BoundsHitModeType = {
        left?: BoundHitModeType, right?: BoundHitModeType,
        top?: BoundHitModeType, bottom?: BoundHitModeType,
    }

    type AlignModeType = 0 | 1 | 'bounds' | 'origin';

    interface IConfig {
        target?: Phaser.GameObjects.GameObject;
        bounds?: Phaser.Geom.Rectangle | RectangleLikeType;
        enable?: boolean | BoundsEnableType;
        boundsHitMode?: BoundsHitModeType;
        alignMode?: AlignModeType;
    }
}

declare class Bounds extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Bounds.IConfig
    )

    setBoundsTarget(gameObject?: Phaser.GameObjects.GameObject): this;
    boundsTarget: Phaser.GameObjects.GameObject;

    setBounds(bounds: Phaser.Geom.Rectangle | Bounds.RectangleLikeType): this;
    bounds: Phaser.Geom.Rectangle;

    setEnable(enable?: boolean | Bounds.BoundsEnableType): this;
    enable: boolean;
    boundsEnable: { left: boolean, right: boolean, top: boolean, bottom: boolean };

    setBoundsHitMode(mode?: Bounds.BoundsEnableType): this;
    boundsHitMode: { left: number, right: number, top: number, bottom: number };
    hasWrapBoundHitMode: boolean;

    setAlignMode(mode: Bounds.AlignModeType): this;
    alignMode: number;

    readonly isHitAny: boolean;
    readonly isHitLeft: boolean;
    readonly isHitRight: boolean;
    readonly isHitTop: boolean;
    readonly isHitBottom: boolean;

}