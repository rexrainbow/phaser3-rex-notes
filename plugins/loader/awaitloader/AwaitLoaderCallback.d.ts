export default AwaitLoaderCallback;

declare namespace AwaitLoaderCallback {
    /**
     * Callback used to run an async loader task.
     */
    type RunTaskCallbackType = (
        /**
         * Call to mark the task as successful.
         */
        successCallback: Function,
        /**
         * Call to mark the task as failed.
         */
        failureCallback: Function
    ) => Promise<void> | void;

    /**
     * Configuration object of an await-loader task.
     */
    interface IConfig {
        /**
         * Task callback invoked by the loader.
         */
        callback: RunTaskCallbackType,
        /**
         * Optional callback execution scope.
         */
        scope?: object
    }
}

/**
 * Queue an await-loader task into the Phaser loader.
 *
 * @param this - Loader plugin instance that owns this callback.
 * @param callback - Task callback that resolves or rejects loader completion.
 * @param scope - Optional callback execution scope.
 * @returns Loader plugin instance for chaining.
 */
declare function AwaitLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    callback: AwaitLoaderCallback.RunTaskCallbackType,
    scope?: object
): Phaser.Loader.LoaderPlugin;

/**
 * Queue a named await-loader task into the Phaser loader.
 *
 * @param this - Loader plugin instance that owns this callback.
 * @param key - Unique key of the loader file entry.
 * @param config - Task configuration options.
 * @returns Loader plugin instance for chaining.
 */
declare function AwaitLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    key: string,
    config: AwaitLoaderCallback.IConfig
): Phaser.Loader.LoaderPlugin;
