import AddPostFxPipeline from './AddPostFxPipeline.js';

class BasePostFxPipelinePlugin extends Phaser.Plugins.BasePlugin {
    setPostPipelineClass(PostFxPipelineClass, postFxPipelineName) {
        this.PostFxPipelineClass = PostFxPipelineClass;
        this.postFxPipelineName = postFxPipelineName;
        return this;
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        this.game.renderer.pipelines.addPostPipeline(this.postFxPipelineName, this.PostFxPipelineClass);
    }

    add(gameObject, config) {
        var pipeline = this.get(gameObject);
        pipeline.resetFromJSON(config);
        return pipeline;
    }

    remove(gameObject) {
        gameObject.removePostPipeline(this.PostFxPipelineClass);
    }

    get(gameObject) {
        return AddPostFxPipeline(this.PostFxPipelineClass, gameObject);
    }
}

export default BasePostFxPipelinePlugin;