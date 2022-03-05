export default LoadingProgress;

declare namespace LoadingProgress {
    interface IConfig {
        transitIn?: (
            gameObject: Phaser.GameObjects.GameObject
        ) => Promise<any>

        progress?: (
            gameObject: Phaser.GameObjects.GameObject,
            progress: number,
        ) => void

        transitionOut?: (
            gameObject: Phaser.GameObjects.GameObject
        ) => Promise<any>
    }
}

declare function LoadingProgress(
    gameObject: Phaser.GameObjects.GameObject,
    config?: LoadingProgress.IConfig
): void;
