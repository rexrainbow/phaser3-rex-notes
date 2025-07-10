export default LoadCompletePromise;

declare function LoadCompletePromise(
    scene: Phaser.Scene | Function,
    config: Object
): Promise<{
    key: string,
    type: string,
    data: any
}>;