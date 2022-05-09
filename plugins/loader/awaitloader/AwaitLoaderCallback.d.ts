export default AwaitLoaderCallback;

declare namespace AwaitLoaderCallback {
    type RunTaskCallbackType = (
        successCallback: Function,
        failureCallback: Function
    ) => void;
}

declare function AwaitLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    runTaskCallback: AwaitLoaderCallback.RunTaskCallbackType,
    scope?: object
): Phaser.Loader.LoaderPlugin;

declare function AwaitLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    key: string,
    config: {
        runTaskCallback: AwaitLoaderCallback.RunTaskCallbackType,
        scope?: object
    }
): Phaser.Loader.LoaderPlugin;