import FragSrc from './swirl-frag.js';
import FragCodeReplacer from '../utils/FragCodeReplacer';
import DegToRad from '../../utils/math/DegToRad.js';
import RadToDeg from '../../utils/math/RadToDeg.js';

const MultiPipeline = Phaser.Renderer.WebGL.Pipelines.MultiPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class SwirlPipeline extends MultiPipeline {
    constructor(scene, key, config) {
        var game = scene.game;
        var frag = FragCodeReplacer(FragSrc, game.renderer.maxTextures);
        super({
            game: game,
            fragShader: frag, // GLSL shader
            name: 'Swirl',
            uniforms: ['radius', 'angle', 'center', 'texSize']
        });
        this._width = 0; // width wo resolution
        this._height = 0; // height wo resolution
        this._centerX = 0; // position wo resolution
        this._centerY = 0; // position wo resolution
        this._radius = 0;
        this._rotation = 0;

        game.renderer.pipelines.add(key, this);
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
        this.renderer.pipelines.set(this);
        this.set1f('radius', value);
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
        this.renderer.pipelines.set(this);
        this.set1f('angle', value);
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
        this.renderer.pipelines.set(this);
        this.set2f('center', this._centerX, this._centerY);
    }

    // size
    resize(width, height, resolution) {
        this._width = width;
        this._height = height;
        super.resize(width, height, resolution);
        this.renderer.pipelines.set(this);
        this.set2f('texSize', width, height);
        return this;
    }
}

export default SwirlPipeline;