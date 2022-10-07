import Image from '../image/Image.js';
import CreateInternalRenderTexture from '../../../../utils/rendertexture/CreateInternalRenderTexture.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class RenderTexture extends Image {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 32);
            height = GetValue(config, 'height', 32);
        }

        // render-texture -> perspective-image
        var rt = CreateInternalRenderTexture(scene, x, y, width, height);

        super(scene, x, y, rt.texture.key, null, config);
        this.type = 'rexShatterRenderTexture';
        this.rt = rt;
    }

    destroy(fromScene) {
        super.destroy(fromScene);

        this.rt.destroy();
        this.rt = null;
    }
}

export default RenderTexture;