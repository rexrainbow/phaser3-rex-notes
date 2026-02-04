export default StartLoadingAnimationScene;

declare namespace StartLoadingAnimationScene {
    /**
     * Callback invoked when loading completes.
     */
    type OnLoadingCompleteCallback = (
        /**
         * Call this function to finish and close the loading animation scene.
         */
        finishLoading: Function,
        /**
         * Active loading animation scene.
         */
        animationScene: Phaser.Scene
    ) => void;

    /**
     * Callback invoked when loading progress updates.
     */
    type OnLoadingProgressCallback = (
        /**
         * Current loading progress in the range of 0 to 1.
         */
        progress: number,
        /**
         * Active loading animation scene.
         */
        animationScene: Phaser.Scene
    ) => void;

    /**
     * Configuration object for starting a loading animation scene.
     */
    interface IConfig {
        /**
         * Main scene that owns the loading process.
         */
        mainSceen: Phaser.Scene,
        /**
         * Scene key or scene instance used as loading animation.
         */
        animationScene: string | Phaser.Scene,
        /**
         * Optional callback fired when loading completes.
         */
        onLoadingComplete?: OnLoadingCompleteCallback,
        /**
         * Optional callback fired on loading progress updates.
         */
        OnLoadingProgress?: OnLoadingProgressCallback
    }
}

/**
 * Start a loading animation scene for the target scene loading flow.
 *
 * @param scene - Main scene that starts loading.
 * @param animationSceneKey - Scene key or scene instance used for animation.
 * @param data - Optional data passed to the animation scene.
 * @param onLoadingComplete - Optional callback fired when loading completes.
 * @param OnLoadingProgress - Optional callback fired on loading progress updates.
 * @returns No return value.
 */
declare function StartLoadingAnimationScene(
    scene: Phaser.Scene,
    animationSceneKey: string | Phaser.Scene,
    data?: Object,
    onLoadingComplete?: StartLoadingAnimationScene.OnLoadingCompleteCallback,
    OnLoadingProgress?: StartLoadingAnimationScene.OnLoadingProgressCallback
): void;

/**
 * Start a loading animation scene without passing scene init data.
 *
 * @param scene - Main scene that starts loading.
 * @param animationSceneKey - Scene key or scene instance used for animation.
 * @param onLoadingComplete - Optional callback fired when loading completes.
 * @param OnLoadingProgress - Optional callback fired on loading progress updates.
 * @returns No return value.
 */
declare function StartLoadingAnimationScene(
    scene: Phaser.Scene,
    animationSceneKey: string | Phaser.Scene,
    onLoadingComplete?: StartLoadingAnimationScene.OnLoadingCompleteCallback,
    OnLoadingProgress?: StartLoadingAnimationScene.OnLoadingProgressCallback
): void;

/**
 * Start a loading animation scene by configuration object.
 *
 * @param config - Loading animation scene configuration.
 * @returns No return value.
 */
declare function StartLoadingAnimationScene(
    config?: StartLoadingAnimationScene.IConfig
): void;
