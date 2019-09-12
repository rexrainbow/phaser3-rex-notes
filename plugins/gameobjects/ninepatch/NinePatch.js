import SetTexture from './SetTexture.js';
import UpdateTexture from './UpdateTexture.js';

const RenderTexture = Phaser.GameObjects.RenderTexture;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class NinePatch extends RenderTexture {
    constructor(scene, x, y, width, height, key, columns, rows) {
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
            key = GetValue(config, 'key', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        } else if (IsPlainObject(width)) {
            var config = width;
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
            key = GetValue(config, 'key', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        } else if (IsPlainObject(key)) {
            var config = key;
            key = GetValue(config, 'key', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        }

        super(scene, x, y, width, height);
        this.columns = {};
        this.rows = {};
        this.redraw = false;
        this._tileSprite = undefined;
        this._image = undefined;

        this.setTexture(key, columns, rows);
        this.setOrigin(0.5, 0.5);
    }

    preDestroy() {
        if (this._tileSprite) {
            this._tileSprite.destroy();
            this._tileSprite = undefined;
        }
        if (this._image) {
            this._image.destroy();
            this._image = undefined;
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

const EXTENDMODE = {
    scale: 0,
    repeat: 1,
}

var methods = {
    setTexture: SetTexture,
    updateTexture: UpdateTexture,
}
Object.assign(
    NinePatch.prototype,
    methods,
);

export default NinePatch;