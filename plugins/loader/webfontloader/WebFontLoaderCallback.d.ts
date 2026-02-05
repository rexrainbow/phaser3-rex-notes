import WebFont from 'webfontloader';

export default WebFontLoaderCallback;

/**
 * Queue a webfont loading task into the Phaser loader.
 *
 * @param this - Loader plugin instance that owns this callback.
 * @param config - WebFontLoader configuration object.
 * @returns Loader plugin instance for chaining.
 */
declare function WebFontLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    config: WebFont.Config
): Phaser.Loader.LoaderPlugin;
