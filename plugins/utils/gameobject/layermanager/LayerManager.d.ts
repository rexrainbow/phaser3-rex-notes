import GOManager from '../gomanager/GOManager';

export default LayerManager;

declare namespace LayerManager {
    interface ILayerConfig {
        /**
         * Layer name.
         */
        name?: string,
        /**
         * Uniform scroll factor.
         */
        scrollFactor?: number,
        /**
         * Scroll factor x.
         */
        scrollFactorX?: number,
        /**
         * Scroll factor y.
         */
        scrollFactorY?: number,
        /**
         * Camera name.
         */
        cameraName?: string
    }

    type LayerConfigType = string | ILayerConfig;

    interface IConfig {
        /**
         * Layer definitions.
         */
        layers?: LayerConfigType[];
        /**
         * Root layer.
         */
        rootLayer?: Phaser.GameObjects.Layer;

        /**
         * Create game object callback.
         */
        createGameObject?: GOManager.CreateGameObjectCallbackType,
    }

    interface IBobBase extends GOManager.IBobBase {
        /**
         * Camera assigned to the layer.
         */
        camera?: Phaser.Cameras.Scene2D.Camera
    }

    type LayerNameType = string | Phaser.GameObjects.GameObject

}

/**
 * Layer manager built on GOManager.
 */
declare class LayerManager extends GOManager {
    /**
     * Create a layer manager.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: LayerManager.IConfig,
    )
    /**
     * Create a layer manager with a single layer config.
     * @param scene - The Scene to which this object belongs.
     * @param config - Layer config.
     */
    constructor(
        scene: Phaser.Scene,
        config?: LayerManager.LayerConfigType,
    )

    /**
     * Set the root layer.
     * @param rootLayer - Root layer.
     * @returns This instance.
     */
    setRootLayer(rootLayer?: Phaser.GameObjects.Layer): this;

    /**
     * Get bob(s) for a layer.
     * @param layer - Layer name or object.
     * @param out - Optional output array.
     * @returns Bob or bob array.
     */
    get(
        layer: string | Phaser.GameObjects.GameObject,
        out?: LayerManager.IBobBase[]
    ): LayerManager.IBobBase | LayerManager.IBobBase[];

    /**
     * Get a layer object.
     * @param layer - Layer name or object.
     * @returns Layer object.
     */
    getLayer(
        layer: string | Phaser.GameObjects.GameObject
    ): Phaser.GameObjects.Layer;

    /**
     * Get all layers.
     * @param out - Optional output array.
     * @returns Layer array.
     */
    getLayers(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.Layer[];

    /**
     * Add game objects to a layer.
     * @param layer - Layer name or object.
     * @param gameObjects - Game object(s) to add.
     * @returns This instance.
     */
    addToLayer(
        layer: string | Phaser.GameObjects.GameObject,
        gameObjects: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Add game objects to the bottom layer.
     * @param gameObjects - Game object(s) to add.
     * @returns This instance.
     */
    addToBottomLayer(
        gameObjects: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Add game objects to the top layer.
     * @param gameObjects - Game object(s) to add.
     * @returns This instance.
     */
    addToTopLayer(
        gameObjects: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Remove a game object from a layer.
     * @param layer - Layer name or object.
     * @param gameObject - Game object to remove.
     * @param addToScene - True to add back to scene.
     * @returns This instance.
     */
    removeFromLayer(
        layer: string | Phaser.GameObjects.GameObject,
        gameObject: Phaser.GameObjects.GameObject,
        addToScene?: boolean
    ): this;

    /**
     * Clear a layer.
     * @param layer - Layer name or object.
     * @param destroyChildren - True to destroy children.
     * @returns This instance.
     */
    clearLayer(
        layer: string | Phaser.GameObjects.GameObject,
        destroyChildren?: boolean
    ): this;


    /**
     * Bring a layer to the top.
     * @param layer - Layer name or object.
     * @returns This instance.
     */
    bringLayerToTop(
        layer: string | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Send a layer to the back.
     * @param layer - Layer name or object.
     * @returns This instance.
     */
    sendLayerToBack(
        layer: string | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Move a layer below another.
     * @param layer - Layer name or object.
     * @param baseLayerName - Base layer name or object.
     * @returns This instance.
     */
    moveLayerBelow(
        layer: string | Phaser.GameObjects.GameObject,
        baseLayerName: string | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Move a layer above another.
     * @param layer - Layer name or object.
     * @param baseLayerName - Base layer name or object.
     * @returns This instance.
     */
    moveLayerAbove(
        layer: string | Phaser.GameObjects.GameObject,
        baseLayerName: string | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Set camera for a layer.
     * @param layer - Layer name or object.
     * @param cameraName - Camera name or instance.
     * @returns This instance.
     */
    setCamera(
        layer: string | Phaser.GameObjects.GameObject,
        cameraName?: string | number | Phaser.Cameras.Scene2D.Camera
    ): this;

    /**
     * Get camera for a layer.
     * @param layer - Layer name or object.
     * @returns Camera or null.
     */
    getCamera(
        layer: string | Phaser.GameObjects.GameObject
    ): Phaser.Cameras.Scene2D.Camera | null;

    /**
     * Set scroll factor for a layer.
     * @param layer - Layer name or object.
     * @param scrollFactorX - Scroll factor x.
     * @param scrollFactorY - Scroll factor y.
     * @returns This instance.
     */
    setScrollFactor(
        layer: string | Phaser.GameObjects.GameObject,
        scrollFactorX: number, scrollFactorY?: number
    ): this;

}
