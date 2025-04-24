import LoaderCallback from './loader/awaitcomlink/AwaitComlinkCallback';
export default LoaderCallback;

declare module 'phaser' {
    namespace Loader {
        interface LoaderPlugin {
            rexAwaitComlink: typeof LoaderCallback,
        }
    }
}