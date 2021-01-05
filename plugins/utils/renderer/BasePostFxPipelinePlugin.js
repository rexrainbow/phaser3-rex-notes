const SpliceOne = Phaser.Utils.Array.SpliceOne;

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
        if (config === undefined) {
            config = {};
        }

        gameObject.setPostPipeline(this.PostFxPipelineClass);
        var pipeline = gameObject.postPipelines[gameObject.postPipelines.length - 1];
        pipeline.resetFromJSON(config);

        if (config.name) {
            pipeline.name = config.name;
        }

        return pipeline;
    }

    remove(gameObject, name) {
        if (name === undefined) {
            var result = [];
            var pipelines = gameObject.postPipelines;
            for (var i = (pipelines.length - 1); i >= 0; i--) {
                var instance = pipelines[i];
                if (instance instanceof this.PostFxPipelineClass) {
                    instance.destroy();
                    SpliceOne(pipelines, i);
                }
            }
            return result;
        } else {
            var pipelines = gameObject.postPipelines;
            for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
                var instance = pipelines[i];
                if ((instance instanceof this.PostFxPipelineClass) && (instance.name === name)) {
                    instance.destroy();
                    SpliceOne(pipelines, i);
                }
            }
        }
    }

    get(gameObject, name) {
        if (name === undefined) {
            var result = [];
            var pipelines = gameObject.postPipelines;
            for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
                var instance = pipelines[i];
                if (instance instanceof this.PostFxPipelineClass) {
                    result.push(instance)
                }
            }
            return result;
        } else {
            var pipelines = gameObject.postPipelines;
            for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
                var instance = pipelines[i];
                if ((instance instanceof this.PostFxPipelineClass) && (instance.name === name)) {
                    return instance;
                }
            }
        }
    }
}

export default BasePostFxPipelinePlugin;