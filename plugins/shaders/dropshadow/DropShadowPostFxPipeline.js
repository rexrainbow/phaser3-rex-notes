import FragSrc from './dropshadow-postfxfrag.js';
import GetAnother from '../utils/GetAnother.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

class DropShadowPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexDropShadowPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.rotation = 0;
        this.distance = 0;
        this._shadowColor = new Color();
        this.alpha = 0.5;
        this.shadowOnly = false;
    }

    resetFromJSON(o) {
        var rotation = GetValue(o, 'rotation', undefined);
        if (rotation === undefined) {
            this.setAngle(GetValue(o, 'angle', 45));
        } else {
            this.setRotation(rotation);
        }

        this.setDistance(GetValue(o, 'distance', 5));

        this.setShadowColor(GetValue(o, 'shadowColor', 0xffffff));
        this.setAlpha(GetValue(o, 'alpha', 0.5));

        this.setShadowOnly(GetValue(o, 'shadowOnly', false));

        return this;
    }

    onPreRender() {
    }

    onDraw(renderTarget) {
        this.copyFrame(renderTarget, this.fullFrame1);
        var sourceFrame = this.fullFrame1;
        var targetFrame = GetAnother(sourceFrame, this.fullFrame1, this.fullFrame2);

        // Draw shadow
        // Set uniforms
        var offsetX = (this.distance / this.renderer.width) * Math.cos(this.rotation);
        var offsetY = (this.distance / this.renderer.height) * Math.sin(this.rotation)
        this.set2f('offset', offsetX, offsetY);
        this.set3f('color', this._shadowColor.redGL, this._shadowColor.greenGL, this._shadowColor.blueGL);
        this.set1f('alpha', this.alpha);
        // Bind and draw
        this.bindAndDraw(sourceFrame, targetFrame);
        sourceFrame = targetFrame;
        targetFrame = GetAnother(sourceFrame, this.fullFrame1, this.fullFrame2);

        // TODO: kawase-blur

        // Add renderTarget to result
        if (!this.shadowOnly) {
            this.copyFrame(renderTarget, sourceFrame, 1, false);
        }

        this.copyToGame(sourceFrame);
    }

    // rotation
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

    // distance
    setDistance(value) {
        this.distance = value;
        return this;
    }

    // shadow color
    get shadowColor() {
        return this._shadowColor;
    }

    set shadowColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._shadowColor.setFromRGB(value);
    }

    setShadowColor(value) {
        this.shadowColor = value;
        return this;
    }

    // alpha
    setAlpha(value) {
        this.alpha = value;
        return this;
    }

    // shadowOnly
    setShadowOnly(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.shadowOnly = enable;
        return this;
    }
}

export default DropShadowPostFxPipeline;