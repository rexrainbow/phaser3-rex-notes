import frag from './outline-frag.js';
import GetGLTexture from '../../utils/system/GetGLTexture.js';
import Shadow from '../../utils/actions/Shadow.js';

const Shader = Parse.GameObjects.Shader;
const baseShader = new Phaser.Display.BaseShader('outline', frag);

class Outline extends Shader {
    constructor(target, config) {
        super(target.scene, baseShader, target.x, target.y, target.width, target.height);

        this.setSampler2DBuffer('iChannel0', GetGLTexture(target), target.width, target.height);
        this.target = target;
    }

    renderWebGL(renderer, src, interpolationPercentage, camera, parentMatrix) {
        Shadow(this.target, this);
        super.renderWebGL(renderer, src, interpolationPercentage, camera, parentMatrix);
    }

    renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix) {
        Shadow(this.target, this);
        super.renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix);
    }
}

export default Outline;