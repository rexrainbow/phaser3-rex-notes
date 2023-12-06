import Canvas from '../canvasbase/Canvas.js';
import CreateFillPattern from './CreateFillPattern.js';
import DrawContent from './DrawContent.js';

class RepeatImage extends Canvas {
    constructor(scene, x, y, width, height, textureKey, frameKey) {
        var displayTexture = scene.sys.textures.get(textureKey);
        var displayFrame = displayTexture.get(frameKey);

        if (displayFrame.source.compressionAlgorithm) {
            console.warn('RepeatImage cannot use compressed texture');
            displayTexture = scene.sys.textures.get('__MISSING');
            displayFrame = displayTexture.get();
        }

        if (displayTexture.type === 'DynamicTexture') {
            console.warn('RepeatImage cannot use Dynamic Texture');
            displayTexture = scene.sys.textures.get('__MISSING');
            displayFrame = displayTexture.get();
        }

        if (!width || !height) {
            width = displayFrame.width;
            height = displayFrame.height;
        }
        else {
            width = Math.floor(width);
            height = Math.floor(height);
        }

        super(scene, x, y, width, height);
        this.type = 'rexRepeatImage';

        this._tilePositionX = 0;
        this._tilePositionY = 0;
        this._tileScaleX = 1;
        this._tileScaleY = 1;
        this.fillPattern = null;

        this.setTexture(textureKey, frameKey);

    }

    setTexture(key, frame) {
        if ((this._textureKey === key) && (this._frameName === frame)) {
            return this;
        }

        this.dirty = true;
        this._textureKey = key;
        this._frameName = frame;

        var textureFrame = this.scene.sys.textures.getFrame(key, frame);
        if (!textureFrame) {
            this.fillPattern = null;
            return this;
        }

        this.fillPattern = CreateFillPattern.call(this, textureFrame);

        return this;
    }

    setFrame(frame) {
        this.setTexture(this._textureKey, frame);
        return this;
    }

    get tilePositionX() {
        return this._tilePositionX;
    }

    set tilePositionX(value) {
        if (this._tilePositionX === value) {
            return;
        }
        this.dirty = true;
        this._tilePositionX = value;
    }

    get tilePositionY() {
        return this._tilePositionY;
    }

    set tilePositionY(value) {
        if (this._tilePositionY === value) {
            return;
        }
        this.dirty = true;
        this._tilePositionY = value;
    }

    setTilePosition(x, y) {
        this.tilePositionX = x;
        this.tilePositionY = y;

        return this;
    }

    get tileScaleX() {
        return this._tileScaleX;
    }

    set tileScaleX(value) {
        if (this._tileScaleX === value) {
            return;
        }
        this.dirty = true;
        this._tileScaleX = value;
    }

    get tileScaleY() {
        return this._tileScaleY;
    }

    set tileScaleY(value) {
        if (this._tileScaleY === value) {
            return;
        }
        this.dirty = true;
        this._tileScaleY = value;
    }

    setTileScale(x, y) {
        if (y === undefined) {
            y = x;
        }

        this.tileScaleX = x;
        this.tileScaleY = y;

        return this;
    }

    updateTexture() {
        this.clear();
        DrawContent.call(this);
        super.updateTexture();
        return this;
    }

    preDestroy() {
        this.fillPattern = null;
        super.preDestroy();
    }
}

export default RepeatImage;