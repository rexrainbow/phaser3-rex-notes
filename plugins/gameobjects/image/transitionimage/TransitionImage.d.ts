import ContainerLite from '../../container/containerlite/ContainerLite';

export default TransitionImage;

declare namespace TransitionImage {

    /**
     * Direction for the transition.
     */
    type TransitionDirectionType = 0 | 1 | 'out' | 'in';

    /**
     * Transition callback signature.
     *
     * @param parent - The TransitionImage instance.
     * @param currentImage - The current image.
     * @param nextImage - The next image.
     * @param t - Progress value from 0 to 1.
     */
    type TransitionCallbackType = (
        parent: TransitionImage,
        currentImage: Phaser.GameObjects.Image,
        nextImage: Phaser.GameObjects.Image,
        t: number
    ) => void;

    /**
     * Base configuration for a transition.
     */
    interface ITransitConfigBase {
        /**
         * Texture key for the next image.
         */
        texture?: string,
        /**
         * Frame key for the next image.
         */
        frame?: string,

        /**
         * Transition direction.
         */
        dir?: TransitionDirectionType,

        /**
         * Callback fired when transition starts.
         */
        onStart?: TransitionCallbackType,
        /**
         * Scope for onStart callback.
         */
        onStartScope?: unknown,

        /**
         * Callback fired on transition progress.
         */
        onProgress?: TransitionCallbackType,
        /**
         * Scope for onProgress callback.
         */
        onProgressScope?: unknown,

        /**
         * Callback fired when transition completes.
         */
        onComplete?: TransitionCallbackType,
        /**
         * Scope for onComplete callback.
         */
        onCompleteScope?: unknown,

        /**
         * Duration in milliseconds.
         */
        duration?: number,
        /**
         * Easing name.
         */
        ease?: string,

        /**
         * Mask configuration for the transition.
         */
        mask?: boolean | Phaser.GameObjects.GameObject,
    }

    /**
     * Transition configuration used for transit calls.
     */
    interface ITransitConfig {
        /**
         * Transition mode name or list of names.
         */
        mode?: string | string[],
    }

    /**
     * Configuration options for creating a TransitionImage.
     */
    interface IConfig extends ITransitConfigBase {
        /**
         * X position.
         */
        x?: number,
        /**
         * Y position.
         */
        y?: number,
        /**
         * Width of the container.
         */
        width?: number,
        /**
         * Height of the container.
         */
        height?: number,
        /**
         * Scaling mode for images.
         */
        scaleMode?: 0 | 1 | 'fit' | 'FIT' | 2 | 'envelop' | 'ENVELOP',
    }
}

/**
 * Container that transitions between images.
 */
declare class TransitionImage extends ContainerLite {
    /**
     * Create a TransitionImage with texture and frame.
     *
     * @param scene - The Phaser.Scene that owns this TransitionImage.
     * @param x - X position.
     * @param y - Y position.
     * @param texture - Texture key.
     * @param frame - Frame key.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        texture?: string,
        frame?: string,
        config?: TransitionImage.IConfig
    );

    /**
     * Create a TransitionImage with position and config.
     *
     * @param scene - The Phaser.Scene that owns this TransitionImage.
     * @param x - X position.
     * @param y - Y position.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        config?: TransitionImage.IConfig
    );

    /**
     * Create a TransitionImage with config only.
     *
     * @param scene - The Phaser.Scene that owns this TransitionImage.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: TransitionImage.IConfig
    );

    /**
     * Current texture.
     */
    texture: Phaser.Textures.Texture;
    /**
     * Current frame.
     */
    frame: Phaser.Textures.Frame;

    /**
     * Set the transition direction.
     *
     * @param dir - The transition direction.
     * @returns This TransitionImage instance.
     */
    setTransitionDirection(
        dir: TransitionImage.TransitionDirectionType
    ): this;

    /**
     * Set the transition start callback.
     *
     * @param callback - The callback function.
     * @param scope - Callback scope.
     * @returns This TransitionImage instance.
     */
    setTransitionStartCallback(
        callback: TransitionImage.TransitionCallbackType,
        scope?: object
    ): this;

    /**
     * Set the transition progress callback.
     *
     * @param callback - The callback function.
     * @param scope - Callback scope.
     * @returns This TransitionImage instance.
     */
    setTransitionProgressCallback(
        callback: TransitionImage.TransitionCallbackType,
        scope?: object
    ): this;

    /**
     * Set the transition complete callback.
     *
     * @param callback - The callback function.
     * @param scope - Callback scope.
     * @returns This TransitionImage instance.
     */
    setTransitionCompleteCallback(
        callback: TransitionImage.TransitionCallbackType,
        scope?: object
    ): this;

    /**
     * Set transition duration.
     *
     * @param duration - Duration in milliseconds.
     * @returns This TransitionImage instance.
     */
    setDuration(duration: number): this;

    /**
     * Set transition easing.
     *
     * @param ease - The easing name.
     * @returns This TransitionImage instance.
     */
    setDuration(ease: string): this;

    /**
     * Enable or disable the mask.
     *
     * @param enable - Whether to enable the mask.
     * @returns This TransitionImage instance.
     */
    setMaskEnable(enable?: boolean): this;

    /**
     * Start a transition with texture and mode.
     *
     * @param texture - Texture key.
     * @param frame - Frame key.
     * @param mode - Transition mode name or list.
     * @returns This TransitionImage instance.
     */
    transit(
        texture: string,
        frame?: string,
        mode?: string | string[]
    ): this;

    /**
     * Start a transition with configuration.
     *
     * @param config - Transition configuration.
     * @returns This TransitionImage instance.
     */
    transit(
        config: TransitionImage.ITransitConfig
    ): this;

    /**
     * Current transition mode name.
     */
    readonly currentTransitionMode: string;

    /**
     * Add a transition mode by name.
     *
     * @param name - The mode name.
     * @param config - Transition configuration.
     * @returns This TransitionImage instance.
     */
    addTransitionMode(
        name: string,
        config: TransitionImage.ITransitConfig
    ): this;

    /**
     * Add a transition mode using configuration.
     *
     * @param config - Transition configuration.
     * @returns This TransitionImage instance.
     */
    addTransitionMode(
        config: TransitionImage.ITransitConfig
    ): this;

    /**
     * Pause the transition.
     *
     * @returns This TransitionImage instance.
     */
    pause(): this;
    /**
     * Resume the transition.
     *
     * @returns This TransitionImage instance.
     */
    resume(): this;
    /**
     * Stop the transition.
     *
     * @returns This TransitionImage instance.
     */
    stop(): this;

    /**
     * Set horizontal flip.
     *
     * @param value - True to flip horizontally.
     * @returns This TransitionImage instance.
     */
    setFlipX(value: boolean): this;
    /**
     * Set vertical flip.
     *
     * @param value - True to flip vertically.
     * @returns This TransitionImage instance.
     */
    setFlipY(value: boolean): this;
    /**
     * Toggle horizontal flip.
     *
     * @returns This TransitionImage instance.
     */
    toggleFlipX(): this;
    /**
     * Toggle vertical flip.
     *
     * @returns This TransitionImage instance.
     */
    toggleFlipY(): this;
    /**
     * Set both horizontal and vertical flip.
     *
     * @param x - True to flip horizontally.
     * @param y - True to flip vertically.
     * @returns This TransitionImage instance.
     */
    setFlip(x: boolean, y: boolean): this;
    /**
     * Whether the image is flipped horizontally.
     */
    flipX: boolean;
    /**
     * Whether the image is flipped vertically.
     */
    flipY: boolean;

    /**
     * Set tint color.
     *
     * @param value - The tint color value.
     * @returns This TransitionImage instance.
     */
    setTint(value: number): this;
    /**
     * Current tint color.
     */
    tint: number;
}
