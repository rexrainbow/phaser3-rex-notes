import CanvasInputBase from '../../../canvasinput/CanvasInput.js';

var CreateCanvasInput = function (scene, config, styles, gameObject) {
    if (!gameObject) {
        gameObject = new CanvasInput(scene, styles);
        scene.add.existing(gameObject);
    }

    if (config) {
    }

    return gameObject;
}

class CanvasInput extends CanvasInputBase {
    constructor(scene, styles) {
        super(scene, styles);
        this.setVAlign(1); // Force vAlign to 1/'center'
    }

    resize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        super.resize(width, height);

        // Wrap characters again since vAlign is 'center'
        this.runWordWrap();

        return this;
    }
}

export default CreateCanvasInput;