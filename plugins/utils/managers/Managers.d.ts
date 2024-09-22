import GOManager from '../gameobject/gomanager/GOManager';
import LayerManager from '../gameobject/layermanager/LayerManager';
import SoundManager from '../audio/soundmanager/SoundManager';
import WaitEventManager from './waiteventmanager/WaitEventManager';

export default Managers;

declare namespace Managers {
    interface IConfigSounds {
        bgm?: {
            initial?: string,
            loop?: boolean,
            fade?: number
        },
        bgm2?: {
            initial?: string,
            loop?: boolean,
            fade?: number
        }
    }

    type CreateGameObjectCallbackType = (
        scene: Phaser.Scene,
        ...args: any[]
    ) => Phaser.GameObjects.GameObject

    interface IAddGameObjectManagerConfig {
        name: string,

        createGameObject: CreateGameObjectCallbackType,

        fade?: number | {
            mode?: 0 | 1 | 'tint' | 'alpha',
            time?: number
        },

        viewportCoordinate?: boolean | {
            enable?: boolean,
            viewport?: Phaser.Geom.Rectangle
        }
    }

    interface IDrawBoundsConfig {
        color?: number,
        lineWidth?: number
    }

    interface IConfig extends WaitEventManager.IConfig {
        layers?: LayerManager.IConfig,
        layerDepth?: number,
        rootLayer?: Phaser.GameObjects.Layer,

        sounds?: IConfigSounds,
    }
}

declare class Managers extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: Managers.IConfig,
    );

    readonly clickTarget: Phaser.Scene | Phaser.GameObjects.GameObject;
    readonly clickShortcutKeys: string;
    readonly cameraTarget: Phaser.Cameras.Scene2D.Camera;

    gameObjectManagers: { [name: string]: GOManager };

    layerManager: LayerManager;

    soundManager: SoundManager;

    waitEventManager: WaitEventManager;

    destroy(fromScene?: boolean): this;

    addGameObjectManager(
        config: Managers.IAddGameObjectManagerConfig
    ): this;
    addGameObjectManager(
        name: string,
        gameObjectManager: GOManager
    ): this;
    addGameObjectManager(
        gameObjectManager: GOManager
    ): this;

    getGameObjectManager(
        managerName: string | null | undefined,
        name?: string
    ): GOManager;

    getGameObjectManagerNames(): string[];

    getGameObjectManagerName(gameObjectName: string): string;

    hasGameObjectMananger(managerName: string): boolean;

    createGameObject(
        goType: string, name: string,
        ...params: any[]
    ): this;

    destroyGameObject(goType: string | undefined, name: string): this;

    hasGameObject(goType: string | undefined, name: string): boolean;

    callGameObjectMethod(
        goType: string | undefined, name: string,
        methodName: string, ...params: any[]
    ): this;

    setGameObjectProperty(
        goType: string | undefined, name: string,
        prop: string, value: any,
    ): this;

    easeGameObjectProperty(
        goType: string | undefined, name: string,
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

    getGameObjectTweenTask(
        goType: string | undefined, name: string,
        property: string | undefined
    ): Phaser.Tweens.Tween | null;

    getGameObject(
        goType: string | undefined,
        name: string,
    ): Phaser.GameObjects.GameObject;

    getGameObject(
        goType: string | undefined,
    ): Phaser.GameObjects.GameObject[];

    getGameObject(
        goType: string,
        name: string[],
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getGameObject(
        goType: string,
        name: string[],
        out: { [name: string]: Phaser.GameObjects.GameObject },
    ): { [name: string]: Phaser.GameObjects.GameObject };

    addGameObject(
        goType: string, name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    drawGameObjectsBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: number | Managers.IDrawBoundsConfig,
    ): this;
    drawGameObjectsBounds(
        goTypes: string[],
        graphics: Phaser.GameObjects.Graphics,
        config?: number | Managers.IDrawBoundsConfig,
    ): this;

    setTimeScale(value: number): this;
    getTimeScale(value: number): this;

}