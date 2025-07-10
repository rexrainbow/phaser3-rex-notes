export default YAMLLoaderCallback;

declare function YAMLLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    key: string,
    url: string,
    dataKey?: string,
    xhrSettings?: Phaser.Types.Loader.XHRSettingsObject
): Phaser.Loader.LoaderPlugin;
