const GetValue = Phaser.Utils.Objects.GetValue;

class ImageManager {
    constructor(textureManager) {
        this.textureManager = textureManager;
        this.images = {};
    }

    add(key, config) {
        if (typeof (key) === 'string') {
            this._add(key, config);
        } else if (Array.isArray(key)) {
            var data = key;
            for (var i = 0, cnt = data.length; i < cnt; i++) {
                this._add(data[i]);
            }
        } else {
            var data = key;
            for (var key in data) {
                this._add(key, data[key]);
            }
        }
        return this;
    }

    _add(key, config) {
        if (config === undefined) {
            config = {
                key: key
            }
        }

        var textureKey = config.key, frameKey = config.frame;
        var width = config.width, height = config.height;

        if ((width === undefined) || (height === undefined)) {
            var frame = this.textureManager.getFrame(textureKey, frameKey);
            var frameWidth = (frame) ? frame.cutWidth : 0;
            var frameHeight = (frame) ? frame.cutHeight : 0;
            if ((width === undefined) && (height === undefined)) {
                width = frameWidth;
                height = frameHeight;
            } else if (width === undefined) {
                width = frameWidth * (height / frameHeight);
            } else if (height === undefined) {
                height = frameHeight * (width / frameWidth);
            }
        }

        this.images[key] = {
            key: textureKey,
            frame: frameKey,
            width: width,
            height: height,
            y: GetValue(config, 'y', 0),
            left: GetValue(config, 'left', 0),
            right: GetValue(config, 'right', 0)
        }
    }

    remove(key) {
        if (this.images.hasOwnProperty(key)) {
            delete this.images[key];
        }
        return this;
    }

    get(key) {
        if (!this.images.hasOwnProperty(key)) {
            if (this.textureManager.exists(key)) {
                this.add(key);
            }
        }
        return this.images[key];
    }

    getOuterWidth(key) {
        var data = this.get(key);
        return (data) ? (data.width + data.left + data.right) : 0;
    }

    getFrame(key) {
        var data = this.get(key);
        return (data) ? this.textureManager.getFrame(data.key, data.frame) : undefined;
    }

    hasTexture(key) {
        return !!this.getFrame(key);
    }
}
export default ImageManager;