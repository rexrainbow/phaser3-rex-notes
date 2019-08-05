import frag from './outline-frag.js';
import GetGLTexture from '../../utils/system/GetGLTexture.js';
import Sync from './Sync.js';

const Shader = Phaser.GameObjects.Shader;
const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const baseShader = new Phaser.Display.BaseShader('outline', frag);

class Outline extends Shader {
    constructor(target, config) {
        if (IsPlainObject(target)) {
            target = GetValue(config, 'target');
        }
        debugger
        super(target.scene, baseShader, target.x, target.y, target.width, target.height);

        this.setSampler2DBuffer('iChannel0', GetGLTexture(target), target.width, target.height, 0);
        this.target = target;
    }

    renderWebGL(renderer, src, interpolationPercentage, camera, parentMatrix) {
        Sync(this.target, this);
        super.renderWebGL(renderer, src, interpolationPercentage, camera, parentMatrix);
    }

    renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix) {
        Sync(this.target, this);
        super.renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix);
    }
}

export default Outline;