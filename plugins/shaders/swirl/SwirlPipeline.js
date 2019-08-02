import frag from './swirl-frag.js';
import DegToRad from '../../utils/math/DegToRad.js';
import RadToDeg from '../../utils/math/RadToDeg.js';

const TextureTintPipeline = Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class SwirlPipeline extends TextureTintPipeline {
    constructor(scene, key, config) {
        var game = scene.game;
        super({
            game: game,
            renderer: game.renderer,
            fragShader: frag // GLSL shader
        });
        this._width = 0; // width wo resolution
        this._height = 0; // height wo resolution
        this._centerX = 0; // position wo resolution
        this._centerY = 0; // position wo resolution
        this._radius = 0;
        this._rotation = 0;

        game.renderer.addPipeline(key, this);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.radius = GetValue(o, 'radius', 0);
        var rotation = GetValue(o, 'rotation', undefined);
        if (rotation === undefined) {
            this.setAngle(GetValue(o, 'angle', 0));
        } else {
            this.setRotation(rotation);
        }
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        return this;
    }

    // radius
    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
        this.setFloat1('radius', value);
    }

    setRadius(value) {
        this.radius = value;
        return this;
    }

    // rotation
    get rotation() {
        return this._rotation;
    }

    set rotation(value) {
        this._rotation = value;
        this.setFloat1('angle', value);
    }

    setRotation(value) {
        this.rotation = value;
        return this;
    }

    get angle() {
        return RadToDeg(this.rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(value) {
        this.angle = value;
        return this;
    }

    // center
    get centerX() {
        return this._centerX;
    }

    set centerX(x) {
        this._centerX = x;
        this._setCenter();
    }

    get centerY() {
        return this._centerY;
    }

    set centerY(y) {
        this._centerY = y;
        this._setCenter();
    }

    setCenter(x, y) {
        if (x === undefined) {
            x = this._width / 2;
            y = this._height / 2;
        }
        this._centerX = x;
        this._centerY = y;
        this._setCenter();
        return this;
    }

    _setCenter() {
        this.setFloat2('center', this._centerX, this._centerY);
    }

    // size
    resize(width, height, resolution) {
        this._width = width;
        this._height = height;
        super.resize(width, height, resolution);
        this.setFloat2('texSize', width, height);
        return this;
    }
}

export default SwirlPipeline;