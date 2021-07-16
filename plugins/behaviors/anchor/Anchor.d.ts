export default Anchor;

declare namespace Anchor {
    interface IConfig {
        left?: string, right?: string, centerX?: string, x?: string,
        top?: string, bottom?: string, centerY?: string, y?: string
    }
}

declare class Anchor {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Anchor.IConfig
    );

    resetFromJSON(config: Anchor.IConfig): this;
}