
import LoaderCallback from './loader/scripttag/ScriptTagLoaderCallback';
export default LoaderCallback;

declare module 'phaser' {
    namespace Loader {
        interface LoaderPlugin {
            rexScriptTag: typeof LoaderCallback,
        }
    }
}
