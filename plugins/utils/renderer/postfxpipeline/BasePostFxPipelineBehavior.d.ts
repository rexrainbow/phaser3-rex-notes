export default BasePostFxPipelineBehavior;

declare namespace BasePostFxPipelineBehavior {
}

declare class BasePostFxPipelineBehavior {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {}
    );

    getPipeline(
        config?: {}
    ): Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;

    freePipeline(): this;
}