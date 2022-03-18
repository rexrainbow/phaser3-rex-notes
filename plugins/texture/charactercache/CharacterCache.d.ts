export default CharacterCache;

declare namespace CharacterCache {
    interface IConfig {
        key: string,
        cellWidth: number,
        cellHeight: number,
        maxCharacterCount?: number,

        textObject?: Phaser.GameObjects.GameObject,
        content?: string,
    }
}

declare class CharacterCache {
    constructor(
        scene: Phaser.Scene,
        config: CharacterCache.IConfig
    );

    readonly inCacheCount: number;

    destroy(): void;

    bindTextObject(
        textObject: Phaser.GameObjects.GameObject
    ): this;

    load(
        content: string,
        lock?: boolean
    ): this;

    unlock(): this;

    addToBitmapFont(): this;
}