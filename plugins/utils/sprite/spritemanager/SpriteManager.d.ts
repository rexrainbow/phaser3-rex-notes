export default SpriteManager;

declare namespace SpriteManager {

    type CreateCallbackType = (
        scene: Phaser.Scene,
        textureKey: string,
        frameName: string | number
    ) => Phaser.GameObjects.GameObject;

    interface IConfig {
        createCallback?: 'sprite' | 'image' | CreateCallbackType,
        fade?: number,
        viewportCoordinate?: boolean
    }
}

declare class SpriteManager extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: SpriteManager.IConfig
    )

    destroy(fromScene?: boolean): void;

    setTimeScale(timeScale: number): this;
    timeScale: number;

    setCreateCallback(callback: SpriteManager.CreateCallbackType): this;

    setSpriteFadeTime(time: number): this;

    isEmpty: boolean;

    has(name: string): boolean;
    // get(name:string)
    getSprite(name: string): Phaser.GameObjects.GameObject;
    add(
        name: string,
        textureKey: string,
        frameName?: string | number
    ): this;

    remove(name: string): this;
    removeAll(): this;
    clear(destroyChild?: boolean): this;

    setProperty(
        name: string,
        property: string,
        value: any
    ): this;

    easeProperty(
        name: string,
        property: string,
        value: number,
        duration?: number,
        ease?: string,
        repeat?: number,
        isYoyo?: boolean,
        onComplete?: (
            sprite: Phaser.GameObjects.GameObject,
            property: string
        ) => void
    ): this;

    getTweenTask(
        name: string,
        property: string
    ): Phaser.Tweens.Tween | null;

    playAnimation(
        name: string,
        key: string,
    ): this;

    stopAnimation(name: string): this;

    chainAnimation(
        name: string,
        keys: string | string[] | Phaser.Types.Animations.PlayAnimationConfig | Phaser.Types.Animations.PlayAnimationConfig[]
    ): this;

    pauseAnimation(name: string): this;

    setTexture(
        name: string,
        textureKey: string,
        frameName: string | number
    ): this;
}