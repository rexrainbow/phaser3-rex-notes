import Image from '../image/Image.js';
import CreateDynamicTexture from '../../../../utils/rendertexture/CreateDynamicTexture.js';
import Snapshot from '../../../../utils/rendertexture/Snapshot.js';
import InstallRTSetSizeHook from '../../mesh2dwrapper/utils/InstallRTSetSizeHook.js';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class RenderTexture extends Image {
    constructor(scene, x, y, width, height, config) {
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
        this.type = 'rexQuadRenderTexture';
        this.rt = this.texture;

        var self = this;
        InstallRTSetSizeHook(this.rt, function(){
            self.setSizeToFrame();
        })
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);

        this.rt.destroy();
        this.rt = null;
    }

    setSizeToFrame(frame) {
        super.setSizeToFrame(frame);

        this.updateDisplayOrigin();

        var vertexObjects = this.vertexObjects;

        for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            this.updateVertexObjectFrame(vertexObjects[i]);
        }

        return this;
    }

    snapshot(gameObjects, config) {
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
