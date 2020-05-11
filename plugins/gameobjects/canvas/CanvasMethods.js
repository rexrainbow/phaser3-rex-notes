const Color = Phaser.Display.Color;

export default {
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.dirty = true;
        return this;
    },

    fill(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.dirty = true;
        return this;
    },

    loadFromURL(url, callback) {
        var self = this;
        var img = new Image();
        img.onload = function () {
            if ((self.width !== img.width) || (self.height !== img.height)) {
                self.resize(img.width, img.height);
            } else {
                self.clear();
            }
            self.context.drawImage(img, 0, 0);
            self.updateTexture();

            if (callback) {
                callback();
            }

            img.onload = null;
            img.src = '';
            img.remove();
        }
        img.src = url;
        return this;
    },

    loadFromURLPromise(url) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.loadFromURL(url, resolve);
        });
    },

    getDataURL(type, encoderOptions) {
        return this.canvas.toDataURL(type, encoderOptions);
    },

    getPixel(x, y, out) {
        if (out === undefined) {
            out = new Color();
        }
        var rgb = this.context.getImageData(x, y, 1, 1);
        out.setTo(rgb.data[0], rgb.data[1], rgb.data[2], rgb.data[3])
        return out;
    },

    setPixel(x, y, r, g, b, a) {
        if (typeof (r) !== 'number') {
            var color = r;
            r = color.red;
            g = color.green;
            b = color.blue;
            a = color.alpha;
        }

        if (a === undefined) {
            a = ((r !== 0) || (g !== 0) || (b !== 0)) ? 255 : 0;
        }

        var imgData = this.context.createImageData(1, 1);
        imgData.data[0] = r;
        imgData.data[1] = g;
        imgData.data[2] = b;
        imgData.data[3] = a;
        this.context.putImageData(imgData, x, y);
        this.dirty = true;
        return this;
    }
}