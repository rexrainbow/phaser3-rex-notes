export default AwaitComlinkCallback;

declare function AwaitComlinkCallback(
    this: Phaser.Loader.LoaderPlugin,
    workerFilePath: string,
    payload: unknown,
    onAfterWorker?: (payload: unknown) => unknown,
    onBeforeWorker?: (payload: unknown) => unknown,
): Phaser.Loader.LoaderPlugin;

declare function AwaitComlinkCallback(
    this: Phaser.Loader.LoaderPlugin,
    config: {
        comlink?: string,

        onBeforeWorker?: (payload: unknown) => unknown,
        onBeforeWorkerScope?: unknown,

        worker: string,
        payload?: unknown,

        onAfterWorker?: (payload: unknown) => unknown,
        onAfterWorkerScope?: unknown,

    }
): Phaser.Loader.LoaderPlugin;