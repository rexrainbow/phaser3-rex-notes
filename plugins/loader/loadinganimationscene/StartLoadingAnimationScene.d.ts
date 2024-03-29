export default StartLoadingAnimationScene;

declare namespace StartLoadingAnimationScene {
    type OnLoadingCompleteCallback = (
        finishLoading: Function,
        animationScene: Phaser.Scene
    ) => void;

    type OnLoadingProgressCallback = (
        progress: number,
        animationScene: Phaser.Scene
    ) => void;
}

declare function StartLoadingAnimationScene(
    scene: Phaser.Scene,
    animationSceneKey: string | Phaser.Scene,
    data?: Object,
    onLoadingComplete?: StartLoadingAnimationScene.OnLoadingCompleteCallback,
    OnLoadingProgress?: StartLoadingAnimationScene.OnLoadingProgressCallback
): void;

declare function StartLoadingAnimationScene(
    scene: Phaser.Scene,
    animationSceneKey: string | Phaser.Scene,
    onLoadingComplete?: StartLoadingAnimationScene.OnLoadingCompleteCallback,
    OnLoadingProgress?: StartLoadingAnimationScene.OnLoadingProgressCallback
): void;

declare function StartLoadingAnimationScene(
    config?: {
        mainSceen: Phaser.Scene,
        animationScene: string | Phaser.Scene,
        onLoadingComplete?: StartLoadingAnimationScene.OnLoadingCompleteCallback,
        OnLoadingProgress?: StartLoadingAnimationScene.OnLoadingProgressCallback
    }
): void;