import LoaderCallback from './loader/webfontloader/WebFontLoaderCallback.js';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace Loader {
        interface LoaderPlugin {
            rexWebFont: typeof LoaderCallback,
        }
    }
}