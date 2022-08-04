import GetGame from '../../system/GetGame.js';

const RemoveIte = Phaser.Utils.Array.Remove;

var PostFxPipelineControllerBase = function (PostFxPipelineClass) {
    return class Base extends PostFxPipelineClass {
        constructor(gameObject, config) {
            super(GetGame(gameObject));
            this.gameObject = gameObject;

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            if (o === undefined) {
                o = {};
            }
            super.resetFromJSON(o);
            this.setEnable(o.enable);
            return this;
        }

        get enable() {
            return this._enable;
        }

        set enable(value) {
            value = !!value;
            if (this._enable === value) {
                return;
            }
            this._enable = value;

            var gameObject = this.gameObject;
            var postPipelines = gameObject.postPipelines;
            if (value) {
                postPipelines.push(this);
            } else {
                RemoveIte(postPipelines, this);
            }

            gameObject.hasPostPipeline = (postPipelines.length > 0);
        }

        setEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            this.enable = enable;
            return this;
        }
    }
}

export default PostFxPipelineControllerBase;