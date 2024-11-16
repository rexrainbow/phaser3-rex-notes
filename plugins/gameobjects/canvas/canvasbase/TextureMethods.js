import CopyCanvasToTexture from '../../../utils/texture/CopyCanvasToTexture.js';

export default {
    updateTexture(callback, scope) {
        var canvas = this.canvas;
        var context = this.context;

        if (callback) {
            var scale = this.resolution;
            if (scale !== 1) {
                this.context.save();
                this.context.scale(scale, scale);
            }

            if (scope) {
                callback.call(scope, canvas, context);
            } else {
                callback(canvas, context);
            }

            if (scale !== 1) {
                this.context.restore();
            }
        }

        var newWidth = canvas.width,
            newHeight = canvas.height;
        if ((newWidth !== this.frame.width) || (newHeight !== this.frame.height)) {
            this.frame.setSize(newWidth, newHeight);
            this.frame.source.updateSize(newWidth, newHeight);
            this.frame.updateUVs();
        }
        if (this.renderer && this.renderer.gl) {
            this.frame.source.glTexture = this.renderer.canvasToTexture(canvas, this.frame.source.glTexture, true);
            if (typeof WEBGL_DEBUG) {
                this.frame.glTexture.spectorMetadata = { textureKey: 'Canvas Game Object' };
            }
        }

        this.dirty = false;

        var input = this.input;
        if (input && !input.customHitArea) {
            input.hitArea.width = this.width;
            input.hitArea.height = this.height;
        }
        return this;
    },

    generateTexture(key, x, y, width, height) {
        var srcCanvas = this.canvas;
        if (width === undefined) {
            width = srcCanvas.width;
        } else {
            width *= this.resolution;
        }
        if (height === undefined) {
            height = srcCanvas.height;
        } else {
            height *= this.resolution;
        }

        CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);

        return this;
    },

    loadTexture(key, frame) {
        var textureFrame = this.scene.sys.textures.getFrame(key, frame);
        if (!textureFrame) {
            return this;
        }

        if ((this.width !== textureFrame.cutWidth) || (this.height !== textureFrame.cutHeight)) {
            this.setSize(textureFrame.cutWidth, textureFrame.cutHeight);
        } else {
            this.clear();
        }

        this.drawFrame(key, frame);
        this.dirty = true;
        return this;
    }

}