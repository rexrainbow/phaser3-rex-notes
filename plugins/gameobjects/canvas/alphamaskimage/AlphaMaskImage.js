import Canvas from '../canvas/Canvas.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class AlphaMaskImage extends Canvas {
    constructor(scene, x, y, key, frame, config) {
        super(scene, x, y);

        this.type = 'rexAlphaMaskImage';

        this.setMaskTexture();
        this.setTexture(key, frame, config);
    }

    setMaskTexture(key, frame) {
        this._maskKey = key;
        this._maskFrame = frame;

        var texture = (key) ? this.scene.sys.textures.get(key) : null;
        this.maskFrame = (texture) ? texture.get(frame) : null;
        return this;
    }

    setTexture(key, frame, config) {
        if (typeof (frame) === 'object') {
            config = frame;
            frame = undefined;
        }

        var maskKey, maskFrame, backgroundColor;
        if (typeof (config) === 'string') {
            maskKey = config;
            maskFrame = undefined;
            backgroundColor = undefined;
        } else {
            maskKey = GetValue(config, 'mask');
            maskFrame = GetValue(config, 'maskFrame');
            backgroundColor = GetValue(config, 'backgroundColor');
        }

        if (maskKey) {
            this.setMaskTexture(maskKey, maskFrame);
        }

        this._textureKey = key;
        this._frameName = frame;

        var maskTextureFrame = this.maskFrame;
        if (maskTextureFrame === null) {
            this.loadTexture(key, frame);
            this.dirty = true;
            return this;
        }

        var hasBackgroundColor = (backgroundColor != null);
        this.loadTexture(key, frame);

        // Draw mask
        var canvas = this.canvas,
            ctx = this.context;
        var width = canvas.width,
            height = canvas.height;

        ctx.save();
        ctx.globalCompositeOperation = 'destination-atop';

        ctx.drawImage(maskTextureFrame.source.image,
            maskTextureFrame.cutX, maskTextureFrame.cutY, maskTextureFrame.cutWidth, maskTextureFrame.cutHeight,
            0, 0, width, height);

        ctx.restore();

        if (hasBackgroundColor) {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }


        this.dirty = true;
        return this;
    }

    resize(width, height) {
        // Don't draw content again.
        this.setDisplaySize(width, height);
        return this;
    }
}

export default AlphaMaskImage;