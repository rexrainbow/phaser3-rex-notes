import Base from '../../utils/spritefxcontrol/Base.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class HslAdjustSpriteFxPipelineControl extends Base {
    resetFromJSON(o) {
        this.setHueRotate(GetValue(o, 'hueRotate', 0));
        this.setSatAdjust(GetValue(o, 'satAdjust', 1));
        this.setLumAdjust(GetValue(o, 'lumAdjust', 0.5));
        return this;
    }

    onDrawSprite() {
        var pipeline = this.pipeline;
        pipeline.hueRotate = this.hueRotate;
        pipeline.satAdjust = this.satAdjust;
        pipeline.lumAdjust = this.lumAdjust;
    }

    // hueRotate
    setHueRotate(value) {
        this.hueRotate = value; // 0: rotate 0 degrees, 0.5: rotate 180 degrees, 1: rotate 360 degrees
        return this;
    }

    // satAdjust
    setSatAdjust(value) {
        this.satAdjust = value;  // 0: gray, 1: original color, > 1: 
        return this;
    }

    // lumAdjust
    setLumAdjust(value) {
        this.lumAdjust = value;  // 0: dark, 0.5: original color, 1: white
        return this;
    }
}

export default HslAdjustSpriteFxPipelineControl;