import BobBase from './bobbase/BobBase';
import AddEffectProperties from '../../../effectproperties';

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
        createBob?: CreateBobCallbackType,

        createGameObject?: CreateGameObjectCallbackType,

        depth?: number,

        fade?: number | {
            mode?: 0 | 1 | 'tint' | 'alpha',
            time?: number
        },

        viewportCoordinate?: boolean | {
            enable?: boolean,
            viewport?: Phaser.Geom.Rectangle
        }

        effectProperties?: AddEffectProperties.ConfigType,

        name?: string,
    }

    interface IBobBase extends BobBase {

    }
}

declare class GOManager extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: GOManager.IConfig
    )

    name: string;

    destroy(fromScene?: boolean): void;

    setTimeScale(timeScale: number): this;
    timeScale: number;

    setCreateBobCallback(callback?: GOManager.CreateBobCallbackType): this;
    setCreateGameObjectCallback(callback?: GOManager.CreateGameObjectCallbackType): this;

    setGameObjectDepth(depth?: number): this;

    setGOFadeTime(time: number): this;

    isEmpty: boolean;

    has(name: string): boolean;

    get(name: string, out?: BobBase[]): BobBase | BobBase[];
    getFirst(): BobBase | null;
    getGO(name: string): Phaser.GameObjects.GameObject;
    getAllGO(out?: Phaser.GameObjects.GameObject[]): Phaser.GameObjects.GameObject[];

    addGO(
        name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    add(
        name: string,
        ...args: any[]
    ): this;

    forEachGO(
        callback: (
            gameObject: Phaser.GameObjects.GameObject,
            name: string,
            goManager: GOManager
        ) => boolean,
        scope?: Object
    ): this;

    remove(name: string): this;
    removeAll(): this;
    clear(destroyChild?: boolean): this;

    hasProperty(
        name: string,
        property: string,
    ): boolean;

    setProperty(
        name: string,
        property: string,
        value: any
    ): this;

    easeProperty(
        name: string,
        config: {
            property: string,
            value: number | string,
            duration?: number,
            delay?: number,
            ease?: string,
            repeat?: null,
            yoyo?: boolean,
            from?: boolean,
            complete?: (
                gameObject: Phaser.GameObjects.GameObject,
                property: string
            ) => void,
        },
    ): this;

    call(
        name: string,
        methodName: string,
        ...parameters: any[]
    ): this;

    hasTweenTask(
        name: string,
        property: string
    ): boolean;

    getTweenTask(
        name: string,
        property: string
    ): Phaser.Tweens.Tween | null;

    drawGameObjectsBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: number
    ): this;
    drawGameObjectsBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: {
            color?: number,
            lineWidth?: number
        }
    ): this;

    setCamera(
        name: string,
        cameraName?: string | number | Phaser.Cameras.Scene2D.Camera
    ): this;

    getCamera(name: string): Phaser.Cameras.Scene2D.Camera | null;

}