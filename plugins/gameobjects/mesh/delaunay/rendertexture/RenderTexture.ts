import Image from '../image/Image';
import CreateDynamicTexture from '../../../../utils/rendertexture/CreateDynamicTexture';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class RenderTexture extends Image {
    ignoreDestroy: any;
    rt: any;
    scene: any;
    texture: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 32);
            height = GetValue(config, 'height', 32);
        }

        // dynamic-texture -> quad-image
        var texture = CreateDynamicTexture(scene, width, height);

        super(scene, x, y, texture, null, config);
        this.type = 'rexDelaunayRenderTexture';
        this.rt = this.texture;
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);

        this.rt.destroy();
        this.rt = null;
    }
}

export default RenderTexture;