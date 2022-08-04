class BaseSpriteFxPipelinePlugin extends Phaser.Plugins.BasePlugin {
    setSpriteFxPipelineClass(
        SpriteFxPipelineClass,
        ControllerKey,
        ControllerClass
    ) {
        this.pipeline = this.game.renderer.pipelines.add(ControllerKey, new SpriteFxPipelineClass(this.game));
        this.controllerKey = ControllerKey;
        this.controllerClass = ControllerClass;

        // Override pipeline's onDrawSprite method
        this.pipeline.onDrawSprite = function (gameObject) {
            gameObject[ControllerKey].onDrawSprite();
        }
        return this;
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        gameObject.setPipeline(this.pipeline);
        if (gameObject[this.controllerKey]) {
            gameObject[this.controllerKey].resetFromJSON(config);
        } else {
            gameObject[this.controllerKey] = new this.controllerClass(this.pipeline, gameObject, config);
        }
        return this;
    }

    get(gameObject) {
        return gameObject[this.controllerKey];
    }

    remove(gameObject) {
        gameObject.pipeline = gameObject.defaultPipeline;
        return this;
    }
}

export default BaseSpriteFxPipelinePlugin;