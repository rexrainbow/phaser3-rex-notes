import Resize from '../utils/Resize.js';
import SetPrpoerties from '../utils/SetProperties.js';
import RouteEvents from '../utils/RouteEvents.js';

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
        SetPrpoerties(InputElementProperties, config, inputElement);
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

        // Apply events
        RouteEvents(this, inputElement, InputElementEvents);
    }

    get files() {
        return this.node.children[0].files;
    }
}

var methods = {
    resize: Resize
}

Object.assign(
    FileChooser.prototype,
    methods
);

const InputElementProperties = {
    id: ['id', undefined],
    accept: ['accept', undefined],
    multiple: ['multiple', undefined]
};

const InputElementEvents = {
    change: 'onchange'
};

export default FileChooser;