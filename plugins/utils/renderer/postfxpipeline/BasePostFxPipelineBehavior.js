import ComponentBase from '../../componentbase/ComponentBase.js';

const RemoveIte = Phaser.Utils.Array.Remove;

class PostFxPipelineControllerBase extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;
        // this.scene

        if (config !== false) {
            this.getPipeline(config);
        }
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;

        }

        this.freePipeline();

        super.shutdown(fromScene);
    }

    getPipeline(config) {
        if (!this.pipeline) {
            var pipeline = this.createPipeline(this.scene.game);
            var gameObject = this.parent;
            var postPipelines = gameObject.postPipelines;
            pipeline.gameObject = gameObject;
            postPipelines.push(pipeline);
            gameObject.hasPostPipeline = (postPipelines.length > 0);

            this.pipeline = pipeline;
        }
        if (config) {
            this.pipeline.resetFromJSON(config);
        }
        return this.pipeline;
    }

    freePipeline() {
        if (!this.pipeline) {
            return this;
        }

        var gameObject = this.parent;
        var postPipelines = gameObject.postPipelines;
        RemoveIte(postPipelines, this.pipeline);
        gameObject.hasPostPipeline = (postPipelines.length > 0);

        this.pipeline.destroy();
        this.pipeline = undefined;
        return this;
    }

    // Override
    createPipeline(game) {

    }
}

export default PostFxPipelineControllerBase;