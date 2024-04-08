import FragSrc from './alphatint-frag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class AlphaTintPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexAlphaTintPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.tint = 0xffffff;
        this.tintFill = false;
    }

    resetFromJSON(o) {
        this.setAlpha(GetValue(o, 'alpha', 1));

        this.setTint(GetValue(o, 'tint', 0xffffff));
        this.tintFill = GetValue(o, 'tintFill', false);

        return this;
    }

    onPreRender() {
        this.set1f('tintMode', (this.tintFill) ? 1 : 0);
        this.set4f('tint', this._tintR, this._tintG, this._tintB, this.alpha);
    }

    setAlpha(value) {
        this.alpha = Clamp(value, 0, 1);
        return this;
    }

    setTint(tint) {
        this.tint = tint;
        this.tintFill = false;

        this._tintR = Clamp(((tint >> 16) & 0xff) / 255.0, 0, 1);
        this._tintG = Clamp(((tint >> 8) & 0xff) / 255.0, 0, 1);
        this._tintB = Clamp(((tint >> 0) & 0xff) / 255.0, 0, 1);
        return this;
    }

    clearTint() {
        this.setTint(0xffffff);
        return this;
    }

    setTintFill(value) {
        this.tintFill = value;
        return this;
    }

}

export default AlphaTintPostFxPipeline;