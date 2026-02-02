export default FilterPluginBase;

/**
 * Base plugin for adding, removing, and querying filter controllers.
 */
declare class FilterPluginBase<TController, TConfig> extends Phaser.Plugins.BasePlugin {
    /**
     * Add a controller to a game object.
     *
     * @param gameObject - Target game object.
     * @param config - Optional controller configuration.
     * @returns The created controller instance.
     */
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TConfig
    ): TController;
    /**
     * Add a controller to a camera.
     *
     * @param camera - Target camera.
     * @param config - Optional controller configuration.
     * @returns The created controller instance.
     */
    add(
        camera: Phaser.Cameras.Scene2D.Camera,
        config?: TConfig
    ): TController;

    /**
     * Remove controller instances from a game object.
     *
     * When name is omitted, all matching controller instances are removed.
     *
     * @param gameObject - Target game object.
     * @param name - Optional controller name.
     * @returns This plugin instance.
     */
    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;
    /**
     * Remove controller instances from a camera.
     *
     * When name is omitted, all matching controller instances are removed.
     *
     * @param camera - Target camera.
     * @param name - Optional controller name.
     * @returns This plugin instance.
     */
    remove(
        camera: Phaser.Cameras.Scene2D.Camera,
        name?: string
    ): this;

    /**
     * Get controller instances on a game object.
     *
     * When name is omitted, returns all matching controllers.
     *
     * @param gameObject - Target game object.
     * @param name - Optional controller name.
     * @returns A controller instance when name is provided, otherwise an array
     * of matching controllers.
     */
    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): TController | TController[];
    /**
     * Get controller instances on a camera.
     *
     * When name is omitted, returns all matching controllers.
     *
     * @param camera - Target camera.
     * @param name - Optional controller name.
     * @returns A controller instance when name is provided, otherwise an array
     * of matching controllers.
     */
    get(
        camera: Phaser.Cameras.Scene2D.Camera,
        name?: string
    ): TController | TController[];
}
