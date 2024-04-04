import LoaderCallback from './loader/awaitloader/AwaitLoaderCallback';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace Loader {
        interface LoaderPlugin {
            rexAwait: typeof LoaderCallback,
        }
    }
}