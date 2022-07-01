import BobBase from './BobBase';

export default GOManager;

declare namespace GOManager {

    type CreateBobCallbackType = (
        GOManager: GOManager,
        gameObject: Phaser.GameObjects.GameObject,
        name: string
    ) => BobBase;

    type CreateGameObjectCallbackType = (
        scene: Phaser.Scene,
        ...args: any[]
    ) => Phaser.GameObjects.GameObject;

    interface IConfig {
        createBob?: CreateBobCallbackType
        createGameObject?: CreateGameObjectCallbackType,
        fade?: number,
        viewportCoordinate?: boolean
    }
}

declare class GOManager extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: GOManager.IConfig
    )

    destroy(fromScene?: boolean): void;

    setTimeScale(timeScale: number): this;
    timeScale: number;

    setCreateBobCallback(callback?: GOManager.CreateBobCallbackType): this;
    setCreateGameObjectCallback(callback?: GOManager.CreateGameObjectCallbackType): this;

    setGOFadeTime(time: number): this;

    isEmpty: boolean;

    has(name: string): boolean;
    // get(name:string)
    getGO(name: string): Phaser.GameObjects.GameObject;
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
            gameObject: Phaser.GameObjects.GameObject,
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