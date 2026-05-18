import LoaderCallback from './loader/scripttag/ScriptTagLoaderCallback';


export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace Loader {
        interface LoaderPlugin {
            rexScriptTag: typeof LoaderCallback,
        }
    }
}