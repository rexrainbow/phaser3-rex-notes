import Image from '../image/Image';
import CreateDynamicTexture from '../../../../utils/rendertexture/CreateDynamicTexture';
import Snapshot from '../../../../utils/rendertexture/Snapshot';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class RenderTexture extends Image {
    height: any;
    width: any;

    gridWidth: any;
    ignoreDestroy: any;
    resetVertices: any;
    rt: any;
    scene: any;
    texture: any;
    type: any;
    updateDisplayOrigin: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 32);
            height = GetValue(config, 'height', 32);
        }

        // Dynamic-texture -> quad-image
        var texture = CreateDynamicTexture(scene, width, height);

        super(scene, x, y, texture, null, config);
        this.type = 'rexPerspectiveRenderTexture';
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

    setSizeToFrame(frame?: any) {
        var width = this.width;
        var height = this.height;

        super.setSizeToFrame(frame);

        this.updateDisplayOrigin();

        if ((this.width !== width) || (this.height !== height)) {
            if (this.gridWidth !== undefined) {
                this.resetVertices();
            }
        }

        return this;
    }

    snapshot(gameObjects?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.gameObjects = gameObjects;
        config.renderTexture = this.rt;

        Snapshot(config);

        this.setSizeToFrame();

        return this;
    }
}

export default RenderTexture;