import FragSrc from './swirl-postfxfrag.js';
import DegToRad from '../../utils/math/DegToRad.js';
import RadToDeg from '../../utils/math/RadToDeg.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class SwirlPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexSwirlPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this._centerX = 0; // position wo resolution
        this._centerY = 0; // position wo resolution
        this._radius = 0;
        this._rotation = 0;
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

    onPreRender() {
        this.set1f('radius', this._radius);
        this.set1f('angle', this._rotation);

        var texWidth = this.renderer.width,
            textHeight = this.renderer.height;
        this.set2f('center', this._centerX, (textHeight - this._centerY));
        this.set2f('texSize', texWidth, textHeight);
    }

    // radius
    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
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
    }

    get centerY() {
        return this._centerY;
    }

    set centerY(y) {
        this._centerY = y;
    }

    setCenter(x, y) {
        if (x === undefined) {
            x = this.renderer.width / 2;
            y = this.renderer.height / 2;
        }
        this._centerX = x;
        this._centerY = y;
        return this;
    }
}

export default SwirlPostFxPipeline;