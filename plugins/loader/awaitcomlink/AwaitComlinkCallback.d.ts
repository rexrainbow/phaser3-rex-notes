export default AwaitComlinkCallback;

declare function AwaitComlinkCallback(
    this: Phaser.Loader.LoaderPlugin,
    config: {
        comlink?: string,

        worker?: string,
        data?: unknown,

        onBegin?: (data: unknown) => unknown,
        onBeforeWorker?: (data: unknown) => unknown,
        onAfterWorker?: (data: unknown) => unknown,
        onEnd?: (data: unknown) => unknown,

    }
): Phaser.Loader.LoaderPlugin;