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
    animationSceneKey: string,
    data?: Object,
    onLoadingComplete?: StartLoadingAnimationScene.OnLoadingCompleteCallback,
    OnLoadingProgress?: StartLoadingAnimationScene.OnLoadingProgressCallback
): void;

declare function StartLoadingAnimationScene(
    scene: Phaser.Scene,
    animationSceneKey: string,
    onLoadingComplete?: StartLoadingAnimationScene.OnLoadingCompleteCallback,
    OnLoadingProgress?: StartLoadingAnimationScene.OnLoadingProgressCallback
): void;