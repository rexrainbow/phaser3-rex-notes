import frag from './outline-frag.js';
import GetGLTexture from '../../utils/system/GetGLTexture.js';

const Shader = Phaser.GameObjects.Shader;
const RenderTexture = Phaser.GameObjects.RenderTexture;
const Image = Phaser.GameObjects.Image;
const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const baseShader = new Phaser.Display.BaseShader('outline', frag);

class Outline extends Shader {
    constructor(target, config) {
        if (IsPlainObject(target)) {
            target = GetValue(config, 'target');
        }
        var scene = target.scene;
        super(scene, baseShader, target.x, target.y, target.width, target.height);

        this
            .setSampler2DBuffer('iChannel0', GetGLTexture(target), target.width, target.height, 0)
        this.target = target;
    }
}

export default Outline;