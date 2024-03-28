export default GetProgress;

declare function GetProgress(
    loader: Phaser.Loader.LoaderPlugin | Phaser.Scene,
    ignoreTaskCount?: number
): number;