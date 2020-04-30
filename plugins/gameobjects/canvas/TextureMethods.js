export default {
    updateTexture(callback, scope) {
        if (callback) {
            if (scope) {
                callback.call(scope, this.canvas, this.context);
            } else {
                callback(this.canvas, this.context);
            }
        }

        if ((this.canvas.width !== this.frame.width) || (this.canvas.height !== this.frame.height)) {
            this.frame.setSize(this.canvas.width, this.canvas.height);
        }
        if (this.renderer.gl) {
            this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, true);
            this.frame.glTexture = this.frame.source.glTexture;
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
        var sys = this.scene.sys;
        var renderer = sys.game.renderer;
        var texture;

        if (x === undefined) {
            x = 0;
        }

        if (y === undefined) {
            y = 0;
        }

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


        if (sys.textures.exists(key)) {
            texture = sys.textures.get(key);
        } else {
            texture = sys.textures.createCanvas(key, width, height);
        }

        var destCanvas = texture.getSourceImage();
        if (destCanvas.width !== width) {
            destCanvas.width = width;
        }
        if (destCanvas.height !== height) {
            destCanvas.height = height;
        }

        var destCtx = destCanvas.getContext('2d');
        destCtx.clearRect(0, 0, width, height);
        destCtx.drawImage(srcCanvas, x, y, width, height);
        if (renderer.gl && texture) {
            renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
        }

        return this;
    },

    loadTexture(key, frame) {
        var textureFrame = this.scene.textures.getFrame(key, frame);
        if (!textureFrame) {
            return this;
        }

        if ((this.width !== textureFrame.cutWidth) || (this.height !== textureFrame.cutHeight)) {
            this.resize(textureFrame.cutWidth, textureFrame.cutHeight);
        } else {
            this.clear();
        }
        this.context.drawImage(textureFrame.source.image,
            textureFrame.cutX, textureFrame.cutY, textureFrame.cutWidth, textureFrame.cutHeight,
            0, 0, this.canvas.width, this.canvas.height);
        this.dirty = true;
        return this;
    }

}