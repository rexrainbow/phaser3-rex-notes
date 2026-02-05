export default ImageURILoaderCallback;

/**
 * Queue an image from a URI into the Phaser loader.
 *
 * @param this - Loader plugin instance that owns this callback.
 * @param key - Unique key of the image asset.
 * @param uri - Source image URI.
 * @param frameConfig - Optional frame parsing configuration.
 * @returns Loader plugin instance for chaining.
 */
declare function ImageURILoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    key: string,
    uri: string,
    frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig
): Phaser.Loader.LoaderPlugin;
