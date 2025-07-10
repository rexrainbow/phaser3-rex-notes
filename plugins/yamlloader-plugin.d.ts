import LoaderCallback from './loader/yamlloader/YAMLLoaderCallback';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace Loader {
        interface LoaderPlugin {
            rexYAML: typeof LoaderCallback,
        }
    }
}