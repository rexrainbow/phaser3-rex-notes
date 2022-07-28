import Base from '../../utils/spritefxcontrol/Base.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class InverseSpriteFxPipelineControl extends Base {
    resetFromJSON(o) {
        this.setIntensity(GetValue(o, 'intensity', 1));
        return this;
    }

    onDrawSprite() {
        this.pipeline.intensity = this.intensity;
    }

    // intensity
    setIntensity(value) {
        this.intensity = value;
        return this;
    }
}

export default InverseSpriteFxPipelineControl;