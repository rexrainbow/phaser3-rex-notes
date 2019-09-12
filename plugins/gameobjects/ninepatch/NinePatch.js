import SetTexture from './SetTexture.js';
import ExtendModeMethods from './ExtendModeMethods.js';
import UpdateTexture from './UpdateTexture.js';

const RenderTexture = Phaser.GameObjects.RenderTexture;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class NinePatch extends RenderTexture {
    constructor(scene, x, y, width, height, key, columns, rows, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
            key = GetValue(config, 'key', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
            key = GetValue(config, 'key', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        } else if (IsPlainObject(key)) {
            config = key;
            key = GetValue(config, 'key', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        }

        super(scene, x, y, width, height);
        this.columns = {};
        this.rows = {};
        this.extendMode = {};
        this.redraw = false;
        this._image = undefined;
        this._tileSprite = undefined;

        this.setTexture(key, columns, rows);
        this.setOrigin(0.5, 0.5);
        this.setExtendMode(GetValue(config, 'extendMode', 0))
    }

    preDestroy() {
        if (this._image) {
            this._image.destroy();
            this._image = undefined;
        }
        if (this._tileSprite) {
            this._tileSprite.destroy();
            this._tileSprite = undefined;
        }
        super.preDestroy();
    }

    get minWidth() {
        return this.columns.minWidth;
    }

    get minHeight() {
        return this.rows.minHeight;
    }

    resize(width, height) {
        this.redraw = true;
        super.resize(width, height);
        return this;
    }

    renderWebGL(renderer, src, interpolationPercentage, camera, parentMatrix) {
        this.updateTexture();
        super.renderWebGL(renderer, src, interpolationPercentage, camera, parentMatrix);
    }

    renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix) {
        this.updateTexture();
        super.renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix);
    }
}

var methods = {
    setTexture: SetTexture,
    updateTexture: UpdateTexture,
}

Object.assign(
    NinePatch.prototype,
    methods,
    ExtendModeMethods
);

export default NinePatch;