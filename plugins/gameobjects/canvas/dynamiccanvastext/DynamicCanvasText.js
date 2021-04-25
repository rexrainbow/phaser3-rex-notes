import Canvas from '../canvas/Canvas.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class DynamicCanvasText extends Canvas {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
        }
        super(scene, x, y, width, height);

        this.type = 'rexDynamicCanvasText';
    }

    updateTexture() {
        this.clear();
        super.updateTexture();
        return this;
    }
}

export default DynamicCanvasText;