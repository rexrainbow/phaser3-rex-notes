import BobBase from './bobbase/BobBase';
import AddEffectProperties from '../../../effectproperties';

export default GOManager;

declare namespace GOManager {

    /**
     * Callback to create a bob for a game object.
     */
    type CreateBobCallbackType = (
        GOManager: GOManager,
        gameObject: Phaser.GameObjects.GameObject,
        name: string
    ) => BobBase;

    /**
     * Callback to create a game object.
     */
    type CreateGameObjectCallbackType = (
        scene: Phaser.Scene,
        ...args: any[]
    ) => Phaser.GameObjects.GameObject;

    interface IConfig {
        /**
         * Create bob callback.
         */
        createBob?: CreateBobCallbackType,

        /**
         * Create game object callback.
         */
        createGameObject?: CreateGameObjectCallbackType,

        /**
         * Default depth.
         */
        depth?: number,

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

        /**
         * Effect properties config.
         */
        effectProperties?: AddEffectProperties.ConfigType,

        /**
         * Manager name.
         */
        name?: string,
    }

    interface IBobBase extends BobBase {

    }
}

/**
 * Game object manager with bob wrappers and helpers.
 */
declare class GOManager extends Phaser.Events.EventEmitter {
    /**
     * Create a game object manager.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: GOManager.IConfig
    )

    /**
     * Manager name.
     */
    name: string;

    /**
     * Destroy the manager.
     * @param fromScene - True if called from Scene shutdown.
     */
    destroy(fromScene?: boolean): void;

    /**
     * Set time scale.
     * @param timeScale - Time scale value.
     * @returns This instance.
     */
    setTimeScale(timeScale: number): this;
    /**
     * Current time scale.
     */
    timeScale: number;

    /**
     * Set create bob callback.
     * @param callback - Create bob callback.
     * @returns This instance.
     */
    setCreateBobCallback(callback?: GOManager.CreateBobCallbackType): this;
    /**
     * Set create game object callback.
     * @param callback - Create game object callback.
     * @returns This instance.
     */
    setCreateGameObjectCallback(callback?: GOManager.CreateGameObjectCallbackType): this;

    /**
     * Set default depth for game objects.
     * @param depth - Depth value.
     * @returns This instance.
     */
    setGameObjectDepth(depth?: number): this;

    /**
     * Set fade time.
     * @param time - Fade time.
     * @returns This instance.
     */
    setGOFadeTime(time: number): this;

    /**
     * True if manager has no objects.
     */
    isEmpty: boolean;

    /**
     * Return true if name exists.
     * @param name - Game object name.
     * @returns True if exists.
     */
    has(name: string): boolean;

    /**
     * Get bob(s) by name.
     * @param name - Game object name.
     * @param out - Optional output array.
     * @returns Bob or bob array.
     */
    get(name: string, out?: BobBase[]): BobBase | BobBase[];
    /**
     * Get first bob.
     * @returns Bob or null.
     */
    getFirst(): BobBase | null;
    /**
     * Get game object by name.
     * @param name - Game object name.
     * @returns Game object.
     */
    getGO(name: string): Phaser.GameObjects.GameObject;
    /**
     * Get all game objects.
     * @param out - Optional output array.
     * @returns Game objects array.
     */
    getAllGO(out?: Phaser.GameObjects.GameObject[]): Phaser.GameObjects.GameObject[];

    /**
     * Add a game object by name.
     * @param name - Game object name.
     * @param gameObject - Game object instance.
     * @returns This instance.
     */
    addGO(
        name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    /**
     * Create and add a game object.
     * @param name - Game object name.
     * @param args - Create args.
     * @returns This instance.
     */
    add(
        name: string,
        ...args: any[]
    ): this;

    /**
     * Iterate game objects.
     * @param callback - Callback per game object.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    forEachGO(
        callback: (
            gameObject: Phaser.GameObjects.GameObject,
            name: string,
            goManager: GOManager
        ) => boolean,
        scope?: Object
    ): this;

    /**
     * Remove a game object by name.
     * @param name - Game object name.
     * @returns This instance.
     */
    remove(name: string): this;
    /**
     * Remove all game objects.
     * @returns This instance.
     */
    removeAll(): this;
    /**
     * Clear all objects.
     * @param destroyChild - True to destroy children.
     * @returns This instance.
     */
    clear(destroyChild?: boolean): this;

    /**
     * Return true if a property exists.
     * @param name - Game object name.
     * @param property - Property name.
     * @returns True if exists.
     */
    hasProperty(
        name: string,
        property: string,
    ): boolean;

    /**
     * Set a property value.
     * @param name - Game object name.
     * @param property - Property name.
     * @param value - Property value.
     * @returns This instance.
     */
    setProperty(
        name: string,
        property: string,
        value: any
    ): this;

    /**
     * Ease a property value.
     * @param name - Game object name.
     * @param config - Ease config.
     * @returns This instance.
     */
    easeProperty(
        name: string,
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
     * Call a method on a game object.
     * @param name - Game object name.
     * @param methodName - Method name.
     * @param parameters - Method parameters.
     * @returns This instance.
     */
    call(
        name: string,
        methodName: string,
        ...parameters: any[]
    ): this;

    /**
     * Return true if a tween task exists.
     * @param name - Game object name.
     * @param property - Property name.
     * @returns True if exists.
     */
    hasTweenTask(
        name: string,
        property: string
    ): boolean;

    /**
     * Get tween task by property.
     * @param name - Game object name.
     * @param property - Property name.
     * @returns Tween or null.
     */
    getTweenTask(
        name: string,
        property: string
    ): Phaser.Tweens.Tween | null;

    /**
     * Draw bounds of game objects.
     * @param graphics - Graphics object.
     * @param config - Color or config.
     * @returns This instance.
     */
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

    /**
     * Set camera for a game object.
     * @param name - Game object name.
     * @param cameraName - Camera name or instance.
     * @returns This instance.
     */
    setCamera(
        name: string,
        cameraName?: string | number | Phaser.Cameras.Scene2D.Camera
    ): this;

    /**
     * Get camera for a game object.
     * @param name - Game object name.
     * @returns Camera or null.
     */
    getCamera(name: string): Phaser.Cameras.Scene2D.Camera | null;

}
