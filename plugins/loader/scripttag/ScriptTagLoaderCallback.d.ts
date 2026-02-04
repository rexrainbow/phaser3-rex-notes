export default ScriptTagLoaderCallback;

declare namespace ScriptTagLoaderCallback {
    /**
     * Callback used to verify whether the loaded script is available.
     */
    type AvailableTestCallbackType = () => boolean;

    /**
     * Configuration object for loading a script tag.
     */
    interface IConfig {
        /**
         * Script URL to load.
         */
        url: string
        /**
         * Optional callback to test script availability.
         */
        availableTest?: AvailableTestCallbackType
    }
}

/**
 * Queue a script-tag loading task.
 *
 * @param this - Loader plugin instance that owns this callback.
 * @param url - Script URL to load.
 * @param availableTest - Optional callback to verify load availability.
 * @returns Loader plugin instance for chaining.
 */
declare function ScriptTagLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    url: string,
    availableTest?: ScriptTagLoaderCallback.AvailableTestCallbackType
): Phaser.Loader.LoaderPlugin;

/**
 * Queue a script-tag loading task by configuration object.
 *
 * @param this - Loader plugin instance that owns this callback.
 * @param config - Script loading configuration.
 * @returns Loader plugin instance for chaining.
 */
declare function ScriptTagLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    config: ScriptTagLoaderCallback.IConfig
): Phaser.Loader.LoaderPlugin;
