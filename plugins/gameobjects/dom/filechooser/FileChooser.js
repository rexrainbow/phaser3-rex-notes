import Resize from '../utils/Resize.js';

const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class FileChooser extends DOMElement {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
        }

        // Create a hidden file input
        var inputElement = document.createElement('input');
        inputElement.type = 'file';
        var inputStyle = inputElement.style;
        inputStyle.width = '0px';
        inputStyle.height = '0px';

        // Create a label parent
        var labelElement = document.createElement('label');
        labelElement.appendChild(inputElement);

        var style = GetValue(config, 'style', undefined);
        super(scene, x, y, labelElement, style);
        this.type = 'rexFileChooser';
        
        this.resize(width, height);
    }

    resize(width, height) {
        if (this.scene.scale.autoRound) {
            width = Math.floor(width);
            height = Math.floor(height);
        }
        var style = this.node.style;
        style.width = width + 'px';
        style.height = height + 'px';
        this.updateSize();
        return this;
    }
}

var methods = {
    resize: Resize
}

Object.assign(
    FileChooser.prototype,
    methods
);

export default FileChooser;