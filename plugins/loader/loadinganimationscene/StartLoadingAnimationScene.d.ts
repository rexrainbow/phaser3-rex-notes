export default StartLoadingAnimationScene;

declare namespace StartLoadingAnimationScene {
    type OnLoadingCompleteCallback = (
        finishLoading: Function,
        animationScene: Phaser.Scene
    ) => void
}

declare function StartLoadingAnimationScene(
    scene: Phaser.Scene,
    animationSceneKey: string,
    data?: Object,
    onLoadingComplete?: StartLoadingAnimationScene.OnLoadingCompleteCallback
): void;

declare function StartLoadingAnimationScene(
    scene: Phaser.Scene,
    animationSceneKey: string,
    onLoadingComplete?: StartLoadingAnimationScene.OnLoadingCompleteCallback
): void;