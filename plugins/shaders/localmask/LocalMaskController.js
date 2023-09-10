import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import LocalMaskPreFxPipeline from './LocalMaskPreFxPipeline.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const PreFXName = 'RexLocalMaskFx';
var ControllerKey = 'rexLocalMask';

class LocalMaskController extends ComponentBase {
    constructor(parent, config) {
        super(parent, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;

        var scene = this.scene;
        var pipelines = scene.sys.renderer.pipelines;
        var pipeline = pipelines.get(PreFXName);
        if (!pipeline) {
            ControllerKey = GetValue(config, 'controllerKey', ControllerKey);
            LocalMaskPreFxPipeline.setControllerKey(ControllerKey);
            pipeline = pipelines.add(PreFXName, new LocalMaskPreFxPipeline(scene.game));
        }
        this.pipelineInstance = pipeline;

        this.textures = scene.sys.textures;

        this.parent[ControllerKey] = this;

        this.setMaskTexture(GetValue(config, 'key'), GetValue(config, 'frame'));
        this.setEnable(GetValue(config, 'enable', true));
    }

    shutdown(fromScene) {
        this.pipelineInstance = undefined;
        this.textures = undefined;
        this.maskFrame = undefined;
        this.maskGLTexture = undefined;

        super.shutdown(fromScene);
    }

    get controllerKey() {
        return ControllerKey;
    }

    get enable() {
        return this._enable;
    }

    set enable(value) {
        if (value === this._enable) {
            return;
        }

        this._enable = value;
        var gameObject = this.parent;
        var currentPipeline = gameObject.pipeline;
        if (value) { // Enable
            if (currentPipeline !== this.pipelineInstance) {
                gameObject.setPipeline(this.pipelineInstance);
            }
        } else { // Reset to default
            if (currentPipeline === this.pipelineInstance) {
                gameObject.resetPipeline();
            }
        }

    }

    setEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.enable = enable;
        return this;
    }

    setMaskTexture(key, frame) {
        this.maskKey = key;
        this.maskFrameName = frame;
        this.maskFrame = this.textures.getFrame(key, frame);
        this.maskGLTexture = this.maskFrame.glTexture;
        return this;
    }
}

export default LocalMaskController;