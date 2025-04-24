import LoaderCallback from './loader/awaitcomlink/AwaitComlinkCallback';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace Loader {
        interface LoaderPlugin {
            rexAwaitComlink: typeof LoaderCallback,
        }
    }
}