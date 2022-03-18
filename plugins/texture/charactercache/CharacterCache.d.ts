import EventEmitter from "../../utils/eventemitter/EventEmitter";

export default CharacterCache;

declare namespace CharacterCache {
    interface IConfig {
        key: string,
        cellWidth: number,
        cellHeight: number,
        maxCharacterCount?: number,

        textObject?: Phaser.GameObjects.GameObject,

        content?: string,

        eventEmitter?: EventEmitter | false,
    }
}

declare class CharacterCache extends EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config: CharacterCache.IConfig
    );

    readonly fontKey: string;
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

    updateBitmapTextFont(
        bitmapText: Phaser.GameObjects.GameObject
    ): this;
}