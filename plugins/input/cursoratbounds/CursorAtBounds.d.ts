export default CursorAtBounds;

declare namespace CursorAtBounds {
    interface IConfig {
        bounds?: Phaser.Geom.Rectangle,
        sensitiveDistance?: number,
    }
}

declare class CursorAtBounds {
    constructor(
        scene: Phaser.Scene,
        config?: CursorAtBounds.IConfig
    )

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