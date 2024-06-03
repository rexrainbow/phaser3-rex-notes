export default CursorAtBounds;

declare namespace CursorAtBounds {
    interface IConfig {
        enable?: boolean,
        bounds?: Phaser.Geom.Rectangle,
        sensitiveDistance?: number,
        pointerOutGameRelease?: boolean,
        pointerOutBoundsRelease?: boolean,
    }
}

declare class CursorAtBounds {
    constructor(
        scene: Phaser.Scene,
        config?: CursorAtBounds.IConfig
    )

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setBounds(bounds: Phaser.Geom.Rectangle): this;
    getBounds(): Phaser.Geom.Rectangle;
    bounds: Phaser.Geom.Rectangle;

    setSensitiveDistance(distance: number): this;
    sensitiveDistance: number;

    createCursorKeys(): {
        up: Phaser.Input.Keyboard.Key,
        down: Phaser.Input.Keyboard.Key,
        left: Phaser.Input.Keyboard.Key,
        right: Phaser.Input.Keyboard.Key,
    };

    readonly left: boolean;
    readonly right: boolean;
    readonly up: boolean;
    readonly down: boolean;
    readonly nokey: boolean;
}