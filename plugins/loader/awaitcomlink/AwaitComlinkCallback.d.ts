export default AwaitComlinkCallback;

declare function AwaitComlinkCallback(
    this: Phaser.Loader.LoaderPlugin,
    config: {
        comlink?: string,

        workerFilePath?: string,
        workerCode?: string,
        data?: unknown,
        terminateWorker?: boolean,

        onBegin?: (data: unknown, comlinkWrapperObject: any, worker: Worker) => unknown,
        onBeforeWorker?: (data: unknown) => unknown,
        onAfterWorker?: (data: unknown) => unknown,
        onEnd?: (data: unknown, comlinkWrapperObject: any, worker: Worker) => unknown,

    }
): Phaser.Loader.LoaderPlugin;