import GOManager from '../../gameobject/gomanager/GOManager';

export default SpriteManager;

declare namespace SpriteManager {

    /**
     * Callback to create a game object.
     *
     * @param scene - Scene instance.
     * @param textureKey - Texture key.
     * @param frameName - Frame name.
     * @returns Created game object.
     */
    type CreateCallbackType = (
        scene: Phaser.Scene,
        textureKey: string,
        frameName: string | number
    ) => Phaser.GameObjects.GameObject;

    /**
     * Configuration options for creating a SpriteManager.
     */
    interface IConfig extends GOManager.IConfig {
        /**
         * Built-in or custom create callback.
         */
        createCallback?: 'sprite' | 'image' | CreateCallbackType,
    }
}

/**
 * Manager for sprite and image game objects.
 */
declare class SpriteManager extends GOManager {
    /**
     * Create a SpriteManager.
     *
     * @param scene - Scene instance.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: SpriteManager.IConfig
    );

    /**
     * Add a managed sprite or image.
     *
     * @param name - Managed object name.
     * @param textureKey - Texture key.
     * @param frameName - Frame name.
     * @returns This SpriteManager instance.
     */
    add(
        name: string,
        textureKey: string,
        frameName?: string | number
    ): this;

    /**
     * Set create-game-object callback.
     *
     * @param callback - Built-in or custom callback.
     * @returns This SpriteManager instance.
     */
    setCreateGameObjectCallback(
        callback?: 'sprite' | 'image' | SpriteManager.CreateCallbackType
    ): this;

    /**
     * Play animation on a managed object.
     *
     * @param name - Managed object name.
     * @param key - Animation key.
     * @returns This SpriteManager instance.
     */
    playAnimation(
        name: string,
        key: string
    ): this;

    /**
     * Stop animation on a managed object.
     *
     * @param name - Managed object name.
     * @returns This SpriteManager instance.
     */
    stopAnimation(name: string): this;

    /**
     * Chain animation(s) on a managed object.
     *
     * @param name - Managed object name.
     * @param keys - Animation key(s) or play config.
     * @returns This SpriteManager instance.
     */
    chainAnimation(
        name: string,
        keys: string | string[] | Phaser.Types.Animations.PlayAnimationConfig | Phaser.Types.Animations.PlayAnimationConfig[]
    ): this;

    /**
     * Pause animation on a managed object.
     *
     * @param name - Managed object name.
     * @returns This SpriteManager instance.
     */
    pauseAnimation(name: string): this;

    /**
     * Set texture on a managed object.
     *
     * @param name - Managed object name.
     * @param textureKey - Texture key.
     * @param frameName - Frame name.
     * @returns This SpriteManager instance.
     */
    setTexture(
        name: string,
        textureKey: string,
        frameName: string | number
    ): this;
}
