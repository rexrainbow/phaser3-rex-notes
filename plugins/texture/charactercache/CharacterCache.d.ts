import EventEmitter from "../../utils/eventemitter/EventEmitter";

export default CharacterCache;

declare namespace CharacterCache {
    interface IConfig {
        key: string,
        cellWidth: number,
        cellHeight: number,
        maxCharacterCount?: number,
        freqMode?: boolean,

        textObject?: Phaser.GameObjects.GameObject,
        style?: Phaser.GameObjects.TextStyle,

        content?: string,

        eventEmitter?: EventEmitter | false,
    }

    interface CacheData {
        character: string,
        freq: number,
        alive: boolean,
        lock: boolean,
    }
}

declare class CharacterCache extends EventEmitter {
    constructor(
        scene: Phaser.Scene | Phaser.Game,
        config: CharacterCache.IConfig
    );

    readonly key: string;
    readonly cellWidth: number;
    readonly cellHeight: number;
    readonly inCacheCount: number;

    destroy(): void;

    bindTextObject(
        textObject: Phaser.GameObjects.GameObject
    ): this;

    overrideBitmapText(
        bitmapText: Phaser.GameObjects.GameObject
    ): Phaser.GameObjects.GameObject;

    addBitmapText(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        text?: string,
        size?: number,
        align?: number
    ): Phaser.GameObjects.BitmapText;

    addDynamicBitmapText(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        text?: string,
        size?: number,
        align?: number
    ): Phaser.GameObjects.DynamicBitmapText;

    load(
        content: string,
        lock?: boolean
    ): this;

    unlock(): this;

    getAllData(
    ): CharacterCache.CacheData[];

    clear(): this;

}