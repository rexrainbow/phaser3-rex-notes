export default AwaitComlinkCallback;

declare function AwaitComlinkCallback(
    this: Phaser.Loader.LoaderPlugin,
    config: {
        comlink?: string,

        workerFilePath?: string,
        workerCode?: string,
        data?: unknown,
        terminateWorker?: boolean,

        onBegin?: (data: unknown) => unknown,
        onBeforeWorker?: (data: unknown) => unknown,
        onAfterWorker?: (data: unknown) => unknown,
        onEnd?: (data: unknown) => unknown,

    }
): Phaser.Loader.LoaderPlugin;