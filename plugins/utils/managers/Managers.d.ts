import GOManager from '../gameobject/gomanager/GOManager';
import LayerManager from '../gameobject/layermanager/LayerManager';
import SoundManager from '../audio/soundmanager/SoundManager';
import WaitEventManager from './waiteventmanager/WaitEventManager';

export default Managers;

declare namespace Managers {
    interface IConfigSounds {
        bgm?: {
            /**
             * Initial BGM key.
             */
            initial?: string,
            /**
             * True to loop.
             */
            loop?: boolean,
            /**
             * Fade time.
             */
            fade?: number
        },
        bgm2?: {
            /**
             * Initial BGM2 key.
             */
            initial?: string,
            /**
             * True to loop.
             */
            loop?: boolean,
            /**
             * Fade time.
             */
            fade?: number
        }
    }

    /**
     * Callback used to create a game object.
     */
    type CreateGameObjectCallbackType = (
        scene: Phaser.Scene,
        ...args: any[]
    ) => Phaser.GameObjects.GameObject

    interface IAddGameObjectManagerConfig {
        /**
         * Manager name.
         */
        name: string,

        /**
         * Create game object callback.
         */
        createGameObject: CreateGameObjectCallbackType,

        /**
         * Fade config or duration.
         */
        fade?: number | {
            /**
             * Fade mode.
             */
            mode?: 0 | 1 | 'tint' | 'alpha',
            /**
             * Fade time.
             */
            time?: number
        },

        /**
         * Use viewport coordinates.
         */
        viewportCoordinate?: boolean | {
            /**
             * Enable viewport coordinates.
             */
            enable?: boolean,
            /**
             * Viewport rectangle.
             */
            viewport?: Phaser.Geom.Rectangle
        }
    }

    interface IDrawBoundsConfig {
        /**
         * Line color.
         */
        color?: number,
        /**
         * Line width.
         */
        lineWidth?: number
    }

    interface IConfig extends WaitEventManager.IConfig {
        /**
         * Layer manager configuration.
         */
        layers?: LayerManager.IConfig,
        /**
         * Base layer depth.
         */
        layerDepth?: number,
        /**
         * Root layer.
         */
        rootLayer?: Phaser.GameObjects.Layer,

        /**
         * Sound manager configuration.
         */
        sounds?: IConfigSounds,
    }
}

/**
 * Manager hub for game objects, layers, sounds, and wait events.
 */
declare class Managers extends Phaser.Events.EventEmitter {
    /**
     * Create managers.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Managers.IConfig,
    );

    /**
     * Click target for input.
     */
    readonly clickTarget: Phaser.Scene | Phaser.GameObjects.GameObject;
    /**
     * Click shortcut keys.
     */
    readonly clickShortcutKeys: string;
    /**
     * Camera target.
     */
    readonly cameraTarget: Phaser.Cameras.Scene2D.Camera;

    /**
     * Game object managers by name.
     */
    gameObjectManagers: { [name: string]: GOManager };

    /**
     * Layer manager.
     */
    layerManager: LayerManager;

    /**
     * Sound manager.
     */
    soundManager: SoundManager;

    /**
     * Wait event manager.
     */
    waitEventManager: WaitEventManager;

    /**
     * Destroy managers.
     * @param fromScene - True if called from Scene shutdown.
     * @returns This instance.
     */
    destroy(fromScene?: boolean): this;

    /**
     * Add a game object manager by config.
     * @param config - Manager config.
     * @returns This instance.
     */
    addGameObjectManager(
        config: Managers.IAddGameObjectManagerConfig
    ): this;
    /**
     * Add a game object manager by name.
     * @param name - Manager name.
     * @param gameObjectManager - Manager instance.
     * @returns This instance.
     */
    addGameObjectManager(
        name: string,
        gameObjectManager: GOManager
    ): this;
    /**
     * Add a game object manager instance.
     * @param gameObjectManager - Manager instance.
     * @returns This instance.
     */
    addGameObjectManager(
        gameObjectManager: GOManager
    ): this;

    /**
     * Get a game object manager.
     * @param managerName - Manager name.
     * @param name - Game object name.
     * @returns Manager instance.
     */
    getGameObjectManager(
        managerName: string | null | undefined,
        name?: string
    ): GOManager;

    /**
     * Get manager names.
     * @returns Manager names.
     */
    getGameObjectManagerNames(): string[];

    /**
     * Get manager name by game object name.
     * @param gameObjectName - Game object name.
     * @returns Manager name.
     */
    getGameObjectManagerName(gameObjectName: string): string;

    /**
     * Return true if a manager exists.
     * @param managerName - Manager name.
     * @returns True if exists.
     */
    hasGameObjectMananger(managerName: string): boolean;

    /**
     * Create a game object.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @param params - Create parameters.
     * @returns This instance.
     */
    createGameObject(
        goType: string, name: string,
        ...params: any[]
    ): this;

    /**
     * Destroy a game object.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @returns This instance.
     */
    destroyGameObject(goType: string | undefined, name: string): this;

    /**
     * Return true if a game object exists.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @returns True if exists.
     */
    hasGameObject(goType: string | undefined, name: string): boolean;

    /**
     * Call a method on a game object.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @param methodName - Method name.
     * @param params - Method parameters.
     * @returns This instance.
     */
    callGameObjectMethod(
        goType: string | undefined, name: string,
        methodName: string, ...params: any[]
    ): this;

    /**
     * Set a property on a game object.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @param prop - Property name.
     * @param value - Property value.
     * @returns This instance.
     */
    setGameObjectProperty(
        goType: string | undefined, name: string,
        prop: string, value: any,
    ): this;

    /**
     * Ease a game object property.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @param config - Tween config.
     * @returns This instance.
     */
    easeGameObjectProperty(
        goType: string | undefined, name: string,
        config: {
            /**
             * Property name.
             */
            property: string,
            /**
             * Target value.
             */
            value: number | string,
            /**
             * Tween duration.
             */
            duration?: number,
            /**
             * Tween delay.
             */
            delay?: number,
            /**
             * Easing name.
             */
            ease?: string,
            /**
             * Repeat count.
             */
            repeat?: null,
            /**
             * True to yoyo.
             */
            yoyo?: boolean,
            /**
             * True to start from target value.
             */
            from?: boolean,
            /**
             * Complete callback.
             */
            complete?: (
                gameObject: Phaser.GameObjects.GameObject,
                property: string
            ) => void,
        },
    ): this;

    /**
     * Get tween task for a game object property.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @param property - Property name.
     * @returns Tween task or null.
     */
    getGameObjectTweenTask(
        goType: string | undefined, name: string,
        property: string | undefined
    ): Phaser.Tweens.Tween | null;

    /**
     * Get a game object by type and name.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @returns The game object.
     */
    getGameObject(
        goType: string | undefined,
        name: string,
    ): Phaser.GameObjects.GameObject;

    /**
     * Get all game objects of a type.
     * @param goType - Game object type.
     * @returns Game object array.
     */
    getGameObject(
        goType: string | undefined,
    ): Phaser.GameObjects.GameObject[];

    /**
     * Get game objects by names.
     * @param goType - Game object type.
     * @param name - Game object names.
     * @param out - Optional output array.
     * @returns Game object array.
     */
    getGameObject(
        goType: string,
        name: string[],
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    /**
     * Get game objects by names into a map.
     * @param goType - Game object type.
     * @param name - Game object names.
     * @param out - Output map.
     * @returns Game object map.
     */
    getGameObject(
        goType: string,
        name: string[],
        out: { [name: string]: Phaser.GameObjects.GameObject },
    ): { [name: string]: Phaser.GameObjects.GameObject };

    /**
     * Add a game object.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @param gameObject - Game object instance.
     * @returns This instance.
     */
    addGameObject(
        goType: string, name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Draw bounds for all game objects.
     * @param graphics - Graphics object.
     * @param config - Draw config or color.
     * @returns This instance.
     */
    drawGameObjectsBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: number | Managers.IDrawBoundsConfig,
    ): this;
    /**
     * Draw bounds for specific game object types.
     * @param goTypes - Game object types.
     * @param graphics - Graphics object.
     * @param config - Draw config or color.
     * @returns This instance.
     */
    drawGameObjectsBounds(
        goTypes: string[],
        graphics: Phaser.GameObjects.Graphics,
        config?: number | Managers.IDrawBoundsConfig,
    ): this;

    /**
     * Set time scale.
     * @param value - Time scale value.
     * @returns This instance.
     */
    setTimeScale(value: number): this;
    /**
     * Get time scale.
     * @param value - Time scale value.
     * @returns This instance.
     */
    getTimeScale(value: number): this;

}
