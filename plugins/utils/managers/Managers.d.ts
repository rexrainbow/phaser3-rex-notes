import SoundManager from '../audio/soundmanager/SoundManager';
import GOManager from '../gameobject/gomanager/GOManager';

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

    interface IGameObjectConfig {
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

    interface IConfig {
        sounds?: IConfigSounds
    }
}

declare class Managers extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: Managers.IConfig,
    );

    soundManager: SoundManager;

    destroy(fromScene?: boolean): this;

    addGameObjectManager(config: Managers.IGameObjectConfig): this;
    getGameObjectManager(name: string): GOManager;
    getGameObjectManagerNames(): string[];

    createGameObject(
        goType: string, name: string,
        ...params: any[]
    ): Phaser.GameObjects.GameObject;

    destroyGameObject(goType: string, name: string): this;

    callGameObjectMethod(
        goType: string, name: string,
        methodName: string, ...params: any[]
    ): this;

    setGameObjectProperty(
        goType: string, name: string,
        prop: string, value: any,
    ): this;

    easeGameObjectProperty(
        goType: string, name: string,
        prop: string, value: any,
        duration?: number, ease?: string, repeat?: number, isYoyo?: boolean
    ): this;

    getGameObject(
        goType: string, name: string
    ): Phaser.GameObjects.GameObject;

    getGameObject(
        goType: string, name: { [name: string]: string }
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