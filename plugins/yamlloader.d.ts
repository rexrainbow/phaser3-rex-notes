import LoaderCallback from './loader/yamlloader/YAMLLoaderCallback';

export default LoaderCallback;

declare module 'phaser' {
    namespace Loader {
        interface LoaderPlugin {
            rexYAML: typeof LoaderCallback,
        }
    }
}