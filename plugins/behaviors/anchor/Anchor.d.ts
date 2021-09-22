export default Anchor;

declare namespace Anchor {
    type OnUpdateViewportCallbackType = (
        viewport: Phaser.Geom.Rectangle,
        gameObject: Phaser.GameObjects.GameObject,
        anchor: Anchor
    ) => void;

    interface IConfig {
        left?: string, right?: string, centerX?: string, x?: string,
        top?: string, bottom?: string, centerY?: string, y?: string,

        width?: string,
        height?: string,

        onUpdateViewportCallback?: OnUpdateViewportCallbackType,
        onUpdateViewportCallbackScope?: unknown
    }
}

declare class Anchor {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Anchor.IConfig
    );

    resetFromJSON(config: Anchor.IConfig): this;

    setUpdateViewportCallback(
        callback?: Anchor.OnUpdateViewportCallbackType,
        scope?: unknown
    ): this;

    anchor(): this;
}